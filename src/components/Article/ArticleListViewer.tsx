import { useSelector } from "react-redux";
import { Article } from "../../models/article/Article";
import { RootState } from "../../state/RootState";
import { store } from "../../state/store";
import { ArticlePreview } from "./ArticlePreview";
import articleService from "../../services/article";
import {
  setArticles,
  setSelectedTab,
  setSelectedTag,
} from "../Pages/Home/index.slice";
import { useEffect } from "react";
import { ArticleTab } from "../../models/common/ArticleTab";
import { AxiosError, AxiosResponse } from "axios";
import { MultipleArticleResponse } from "../../models/article/MutipleArticleResponse";

interface Props {
  articles: Article[];
  tabs: ArticleTab[];
}

export function ArticleListViewr({ articles, tabs }: Props) {
  const isLogin = useSelector((state: RootState) => state.app.isLogin);

  function changeTab(index: number, func: Function, tag?: string) {
    store.dispatch(setSelectedTab(index));
    func(10, 0, tag)
      .then((res: AxiosResponse<MultipleArticleResponse>) =>
        store.dispatch(setArticles(res.data))
      )
      .catch((e: AxiosError) => console.log(e));
  }

  function init() {
    if (tabs.length <= 0) return;

    tabs[0]
      .getArticles(10, 0)
      .then((res: AxiosResponse<MultipleArticleResponse>) =>
        store.dispatch(setArticles(res.data))
      )
      .catch((e: AxiosError) => console.log(e));
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          {tabs.map((tab: ArticleTab, index: number) => {
            if (tab.loginRequired && !isLogin) return <></>;
            if (!tab.isAlwaysShow && !tab.isSelected) return <></>;
            return (
              <li className="nav-item" key={index}>
                <a
                  href="#"
                  className={`nav-link ${tab.isSelected && "active"}`}
                  onClick={() => changeTab(index, tab.getArticles)}
                >
                  {tab.isAlwaysShow ? tab.title : "# " + tab.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {articles &&
        articles.map((article: Article, index: number) => (
          <ArticlePreview key={index} article={article} index={index} />
        ))}
    </div>
  );
}
