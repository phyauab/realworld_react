import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../state/RootState";
import { HeaderItem, headerItemList } from "./HeaderConfig";
import { NavItem } from "./NavItem";

export function Header() {
  const isLogin = useSelector((state: RootState) => state.app.isLogin);
  const me = useSelector((state: RootState) => state.app.user);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          {headerItemList
            .filter((headerItem) =>
              isLogin
                ? headerItem.isPrivate === true ||
                  headerItem.isPrivate === undefined
                : headerItem.isPrivate === false ||
                  headerItem.isPrivate === undefined
            )
            .map((headerItem: HeaderItem, index) => (
              <NavItem
                key={index}
                title={headerItem.title}
                link={headerItem.link}
                icon={headerItem.icon}
              />
            ))}
          {me && (
            <NavItem title={me?.username} link={`/profile/${me.username}`} />
          )}
        </ul>
      </div>
    </nav>
  );
}
