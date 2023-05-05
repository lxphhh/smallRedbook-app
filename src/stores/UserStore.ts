import {action, flow, observable} from 'mobx';
import {request} from '../utils/request';
import {save, remove} from '../utils/Storage';
import Loading from '../components/widget/Loading';

class UserStore {
  @observable userInfo: any = {};

  requestLogin = flow(function* (
    this: UserStore,
    phone: string,
    pwd: string,
    callback: (success: boolean) => void,
  ) {
    Loading.show();
    try {
      const params = {
        name: phone,
        pwd: pwd,
      };
      const {data} = yield request('login', params);
      if (data) {
        this.userInfo = data;
        save('userInfo', JSON.stringify(data));
        callback?.(true);
      } else {
        this.userInfo = null;
        remove('userInfo');
        callback?.(false);
      }
    } catch (error) {
      console.log(error);
      this.userInfo = null;
      remove('userInfo');
      callback?.(false);
    } finally {
      Loading.hide();
    }
  });

  @action
  setUserInfo = (info: any) => {
    this.userInfo = info;
  };
}

export default new UserStore();
