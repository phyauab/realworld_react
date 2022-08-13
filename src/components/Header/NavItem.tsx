import { NavLink } from "react-router-dom";

interface Props {
  title: string;
  link: string;
  icon?: string;
}

export function NavItem({ title, link, icon }: Props) {
  return (
    <li className="nav-item">
      <NavLink className="nav-link" to={link}>
        {icon && <i className="ion-compose"></i>}
        {icon && <>&nbsp;</>}
        {title}
      </NavLink>
    </li>
  );
}
