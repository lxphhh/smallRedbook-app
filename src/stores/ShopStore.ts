import {action, observable} from 'mobx';
import {request} from '../utils/request';
import Loading from '../components/widget/Loading';

const SIZE = 10;

class ShopStore {
  page: number = 1;

  // 用于UI展示的数据,变化会引起UI渲染
  @observable goodsList: GoodsSimple[] = [];

  // 是否正在请求数据
  @observable refreshing: boolean = false;

  // 频道数据
  @observable categoryList: GoodsCategory[] = [];

  @action
  resetPage = () => {
    this.page = 1;
  };

  @action
  requestGoodsList = async () => {
    // 如果是正在请求数据，直接返回
    if (this.refreshing) {
      return;
    }
    Loading.show();
    try {
      // 正在请求数据，防止重复请求
      this.refreshing = true;
      const params = {
        page: this.page,
        size: SIZE,
      };
      const {data} = await request('goodsList', params);
      // 先判断data是否存在，再判断data的长度,代表数据已经取完了
      if (data?.length) {
        // 如果是第一页，直接赋值
        if (this.page === 1) {
          this.goodsList = data;
          // 如果不是第一页，需要拼接
        } else {
          this.goodsList = [...this.goodsList, ...data];
        }
        this.page = this.page + 1;
      } else {
        // 如果没有值,判断是否为第一页
        if (this.page === 1) {
          this.goodsList = [];
        } else {
          // 已经加载完了，没有更多数据
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.refreshing = false;
      Loading.hide();
    }
  };

  @action
  requestTopTenCategory = async () => {
    try {
      // 正在请求数据，防止重复请求
      const {data} = await request('top10Category', {});
      this.categoryList = data;
    } catch (error) {
      console.log(error);
    }
  };

  // getCategoryList = async () => {
  //   const cacheListStr = await load('categoryList');
  //   if (cacheListStr) {
  //     const cacheList = JSON.parse(cacheListStr);
  //     // 如果缓存有的话，就用缓存的
  //     if (cacheList.length) {
  //       this.categoryList = cacheList;
  //     } else {
  //       this.categoryList = DEFAULT_CATEGORY_LIST;
  //     }
  //   } else {
  //     this.categoryList = DEFAULT_CATEGORY_LIST;
  //   }
  // };
}

export default ShopStore;
