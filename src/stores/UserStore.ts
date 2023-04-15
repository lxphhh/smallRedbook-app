import {action, observable} from 'mobx';
import {request} from '../utils/request';

class UserStore {
  @observable userInfo: any;

  requestLogin = async (
    phone: string,
    pwd: string,
    callback: (success: boolean) => void,
  ) => {
    try {
      const params = {
        name: phone,
        pwd: pwd,
      };
      const {data} = await request('login', params);
      if (data) {
        this.userInfo = data;
        callback?.(true);
      } else {
        this.userInfo = null;
        callback?.(false);
      }
    } catch (error) {
      console.log(error);
      this.userInfo = null;
      callback?.(false);
    }
  };

  @action
  setUserInfo = (info: any) => {
    this.userInfo = info;
  };
}

export default new UserStore();
