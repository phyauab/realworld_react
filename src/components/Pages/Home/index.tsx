import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/RootState";
import { fetchTags, setSelectedTab, setTag } from "./index.slice";
import { store } from "../../../state/store";
import { ArticleListViewr } from "../../ArticleListViewer";
import { TagList } from "../../Tag/TagList";
import { getArticles } from "../../ArticleListViewer/index.slice";

export function HomePage() {
  const tabs = useSelector((state: RootState) => state.home.tabs);
  const tags = useSelector((state: RootState) => state.home.tags);
  const isLogin = useSelector((state: RootState) => state.app.isLogin);

  function selectTag(tag: string) {
    store.dispatch(setTag(tag));
    store.dispatch(
      getArticles({ mode: "tag", params: { limit: 10, offset: 0, tag: tag } })
    );
  }

  useEffect(() => {
    store.dispatch(fetchTags());
  }, []);

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

  return (
    <div className="home-page">
      {!isLogin && <Banner />}

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <ArticleListViewr
              tabs={tabs}
              setTab={setSelectedTab}
              toggleClassName="feed-toggle"
            />
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <TagList tags={tags} selectTag={selectTag} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
