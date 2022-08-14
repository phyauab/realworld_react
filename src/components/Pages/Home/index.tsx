import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Article } from "../../../models/article/Article";
import { RootState } from "../../../state/RootState";
import { ArticlePreview } from "../../Article/ArticlePreview";
import articleService from "../../../services/article";
import tagService from "../../../services/tag";
import { setGlobalFeeds, setTags } from "./index.slice";
import { store } from "../../../state/store";
import { TagResponse } from "../../../models/tag/tag";
import { AxiosResponse } from "axios";

export function HomePage() {
  const globalFeeds = useSelector((state: RootState) => state.home.globalFeeds);
  const tags = useSelector((state: RootState) => state.home.tags);
  const isLogin = useSelector((state: RootState) => state.app.isLogin);

  useEffect(() => {
    loadGlobalFeeds();
    loadTags();
  }, []);

  return (
    <div className="home-page">
      {!isLogin && <Banner />}

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a className="nav-link disabled" href="">
                    Your Feed
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="">
                    Global Feed
                  </a>
                </li>
              </ul>
            </div>

            {globalFeeds &&
              globalFeeds?.articles.map((article: Article, index: number) => (
                <ArticlePreview key={index} article={article} index={index} />
              ))}
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <div className="tag-list">
                {tags &&
                  tags.map((tag: string) => (
                    <a href="" className="tag-pill tag-default">
                      {tag}
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function loadGlobalFeeds() {
  articleService
    .listArticles(10, 0)
    .then((e) => store.dispatch(setGlobalFeeds(e.data)))
    .catch((e) => console.log(e));
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
