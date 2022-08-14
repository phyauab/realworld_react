import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Article } from "../../../models/article/Article";
import { RootState } from "../../../state/RootState";
import { ArticlePreview } from "../../Article/ArticlePreview";
import articleService from "../../../services/article";
import tagService from "../../../services/tag";
import { setFeeds, setFeedToggle, setTag, setTags } from "./index.slice";
import { store } from "../../../state/store";
import { TagResponse } from "../../../models/tag/tag";
import { AxiosResponse } from "axios";
import { ArticleListViewr } from "../../Article/ArticleListViewer";

export function HomePage() {
  const tags = useSelector((state: RootState) => state.home.tags);
  const isLogin = useSelector((state: RootState) => state.app.isLogin);

  useEffect(() => {
    loadTags();
  }, []);

  return (
    <div className="home-page">
      {!isLogin && <Banner />}

      <div className="container page">
        <div className="row">
          <ArticleListViewr />

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <div className="tag-list">
                {tags &&
                  tags.map((tag: string, index: number) => (
                    <a
                      href="#"
                      key={index}
                      className="tag-pill tag-default"
                      onClick={() => {
                        store.dispatch(setTag(tag));
                        store.dispatch(setFeedToggle("tag"));
                      }}
                    >
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
