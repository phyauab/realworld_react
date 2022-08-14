import { useSelector } from "react-redux";
import { Article } from "../../models/article/Article";
import { RootState } from "../../state/RootState";
import { store } from "../../state/store";
import { ArticlePreview } from "./ArticlePreview";
import articleService from "../../services/article";
import { setFeeds, setFeedToggle, setTag } from "../Pages/Home/index.slice";
import { useEffect } from "react";

export function ArticleListViewr() {
  const isLogin = useSelector((state: RootState) => state.app.isLogin);
  const feeds = useSelector((state: RootState) => state.home.feeds);
  const feedToggle = useSelector((state: RootState) => state.home.feedToggle);
  const tag = useSelector((state: RootState) => state.home.tag);

  useEffect(() => {
    if (feedToggle === "yourFeed" && isLogin) {
      loadFeeds();
    } else {
      loadArticles(tag);
    }
  }, [feedToggle, tag]);

  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          {isLogin && (
            <li className="nav-item">
              <a
                href="#"
                className={`nav-link ${
                  feedToggle === "yourFeed" ? "active" : ""
                }`}
                onClick={() => changeFeedToggle("yourFeed")}
              >
                Your Feed
              </a>
            </li>
          )}
          <li className="nav-item">
            <a
              href="#"
              className={`nav-link ${
                feedToggle === "globalFeed" ? "active" : ""
              }`}
              onClick={() => changeFeedToggle("globalFeed")}
            >
              Global Feed
            </a>
          </li>
          {tag && (
            <li className="nav-item">
              <a
                href="#"
                className={`nav-link ${feedToggle === "tag" ? "active" : ""}`}
              >
                {`# ${tag}`}
              </a>
            </li>
          )}
        </ul>
      </div>

      {feeds &&
        feeds?.articles.map((article: Article, index: number) => (
          <ArticlePreview key={index} article={article} index={index} />
        ))}
    </div>
  );
}

function loadFeeds() {
  articleService
    .feedArticles()
    .then((e) => store.dispatch(setFeeds(e.data)))
    .catch((e) => console.log(e));
}

function loadArticles(tag?: string) {
  articleService
    .listArticles(10, 0, tag)
    .then((e) => store.dispatch(setFeeds(e.data)))
    .catch((e) => console.log(e));
}

function changeFeedToggle(feed: string) {
  store.dispatch(setTag(undefined));
  store.dispatch(setFeedToggle(feed));
}
