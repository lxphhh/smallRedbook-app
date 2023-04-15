import {observable} from 'mobx';
import {request} from '../utils/request';

const SIZE = 10;

class HomeStore {
  page: number = 1;

  @observable homeList: any[] = [];

  requestHomeList = async () => {
    try {
      const params = {
        page: this.page,
        size: SIZE,
      };
      const {data} = await request('homeList', params);
      if (data) {
        this.page++;
        console.log('data', data);
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export default HomeStore;
