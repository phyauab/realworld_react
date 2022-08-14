import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Article } from "../../../models/article/Article";
import { RootState } from "../../../state/RootState";
import { ArticlePreview } from "../../Article/ArticlePreview";
import articleService from "../../../services/article";
import { setGlobalFeeds } from "./index.slice";
import { store } from "../../../state/store";

export function HomePage() {
  const globalFeeds = useSelector((state: RootState) => state.home.globalFeeds);

  useEffect(() => {
    loadGlobalFeeds();
  }, []);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

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
                <a href="" className="tag-pill tag-default">
                  programming
                </a>
                <a href="" className="tag-pill tag-default">
                  javascript
                </a>
                <a href="" className="tag-pill tag-default">
                  emberjs
                </a>
                <a href="" className="tag-pill tag-default">
                  angularjs
                </a>
                <a href="" className="tag-pill tag-default">
                  react
                </a>
                <a href="" className="tag-pill tag-default">
                  mean
                </a>
                <a href="" className="tag-pill tag-default">
                  node
                </a>
                <a href="" className="tag-pill tag-default">
                  rails
                </a>
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
