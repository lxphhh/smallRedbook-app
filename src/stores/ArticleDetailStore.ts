import {observable} from 'mobx';
import {request} from '../utils/request';
import Loading from '../components/widget/Loading';

class ArticleDetailStore {
  // 用于UI展示的数据,变化会引起UI渲染
  @observable articleDetail: Article = {} as Article;

  requestArticleDetail = async (id: number) => {
    Loading.show();
    try {
      const params = {
        id,
      };
      const {data} = await request('articleDetail', params);
      console.log('articleDetail', JSON.stringify(data));
      this.articleDetail = data ?? {};
    } catch (error) {
      console.log(error);
    } finally {
      Loading.hide();
    }
  };
}

export default ArticleDetailStore;
