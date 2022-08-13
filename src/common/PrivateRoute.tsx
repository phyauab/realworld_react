import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../state/RootState";

type PrivateRouteProps = {
  children: JSX.Element;
};

export function PrivateRoute({ children }: PrivateRouteProps) {
  const isLogin = useSelector((state: RootState) => state.app.isLogin);

  if (isLogin) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
