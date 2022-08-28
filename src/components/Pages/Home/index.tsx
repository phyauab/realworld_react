import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/RootState";
import articleService from "../../../services/article";
import tagService from "../../../services/tag";
import {
  setArticles,
  setSelectedTab,
  setSelectedTag,
  setTags,
} from "./index.slice";
import { store } from "../../../state/store";
import { TagResponse } from "../../../models/tag/tag";
import { AxiosResponse } from "axios";
import { ArticleListViewr } from "../../Article/ArticleListViewer";
import { MultipleArticleResponse } from "../../../models/article/MutipleArticleResponse";
import { ArticleListParam } from "../../../models/article/ArticleListParam";
import { TagList } from "../../Tag/TagList";

export function HomePage() {
  const tabs = useSelector((state: RootState) => state.home.tabs);
  const articles = useSelector(
    (state: RootState) => state.home.articles?.articles
  );
  const tags = useSelector((state: RootState) => state.home.tags);
  const isLogin = useSelector((state: RootState) => state.app.isLogin);

  function setTab(tag: string) {
    store.dispatch(setSelectedTag(tag));
    articleService
      .listArticles(tabs[tabs.length - 1].params)
      .then((res: AxiosResponse<MultipleArticleResponse>) =>
        store.dispatch(setArticles(res.data))
      )
      .then((e) => console.log(e));
  }

  function loadTags() {
    tagService
      .getTags()
      .then((res: AxiosResponse<TagResponse>) =>
        store.dispatch(setTags(res.data.tags))
      )
      .catch();
  }

  function Banner() {
    return (
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    loadTags();
  }, []);

  return (
    <div className="home-page">
      {!isLogin && <Banner />}

      <div className="container page">
        <div className="row">
          <ArticleListViewr
            tabs={tabs}
            articles={articles}
            setSelectedTab={setSelectedTab}
            setArticles={setArticles}
          />

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <TagList tags={tags} setTab={setTab} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
