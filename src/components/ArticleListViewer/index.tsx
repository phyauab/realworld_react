import { useSelector } from "react-redux";
import { Article } from "../../models/article/Article";
import { RootState } from "../../state/RootState";
import { store } from "../../state/store";
import { ArticlePreview } from "../Article/ArticlePreview";
import React, { Fragment, useEffect } from "react";
import { ArticleTab } from "../../models/common/ArticleTab";
import { getArticles, resetState } from "./index.slice";
import { ArticleListParam } from "../../models/article/ArticleListParam";
import { useParams } from "react-router-dom";

interface Props {
  tabs: ArticleTab[];
  setTab: Function;
  toggleClassName: string;
}

export function ArticleListViewr({ tabs, setTab, toggleClassName }: Props) {
  const { username } = useParams();
  const isLogin = useSelector((state: RootState) => state.app.isLogin);
  const articles = useSelector(
    (state: RootState) => state.articleListViewer.articles.articles
  );

  function changeTab(e: React.FormEvent, index: number, tab: ArticleTab) {
    e.preventDefault();
    store.dispatch(setTab(index));
    const params: ArticleListParam = {
      limit: 10,
      offset: 0,
      tag: tab.mode === "tag" ? tab.title : undefined,
      author: tab.mode === "author" ? username : undefined,
      favorited: tab.mode === "favorited" ? username : undefined,
    };
    if (tab.isSelected) {
      return;
    }
    store.dispatch(
      getArticles({
        params: params,
        mode: tab.mode,
      })
    );
  }

  function init() {
    if (tabs.length > 0) {
      store.dispatch(setTab(0));
      store.dispatch(
        getArticles({ params: { limit: 10, offset: 0 }, mode: tabs[0].mode })
      );
    }
  }

  useEffect(() => {
    store.dispatch(resetState());
    init();
  }, []);

  return (
    <Fragment>
      <div className={toggleClassName}>
        <ul className="nav nav-pills outline-active">
          {tabs.map((tab: ArticleTab, index: number) => {
            if (tab.loginRequired && !isLogin)
              return <Fragment key={index}></Fragment>;
            if (!tab.isAlwaysShow && !tab.isSelected)
              return <Fragment key={index}></Fragment>;
            return (
              <li className="nav-item" key={index}>
                <a
                  href="#"
                  className={`nav-link ${tab.isSelected && "active"}`}
                  onClick={(e) => changeTab(e, index, tab)}
                >
                  {tab.isAlwaysShow ? tab.title : "# " + tab.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      {articles.length === 0 && (
        <div className="article-preview">No articles are here... yet.</div>
      )}
      {articles.map((article: Article, index: number) => (
        <ArticlePreview key={index} article={article} index={index} />
      ))}
    </Fragment>
  );
}
