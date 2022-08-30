import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../state/RootState";
import { store } from "../../../state/store";
import { setIsLoading, setProfile, setTab, resetState } from "./index.slice";
import profileService from "../../../services/profile";
import { AxiosResponse } from "axios";
import { ProfileResponse } from "../../../models/profile/ProfileResponse";
import { UserInfo } from "../../Profile/UserInfo";
import { ArticleListViewr } from "../../ArticleListViewer";

export function ProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const isLoading = useSelector((state: RootState) => state.profile.isLoading);
  const profile = useSelector((state: RootState) => state.profile.profile);
  const tabs = useSelector((state: RootState) => state.profile.tabs);

  function getProfile(username: string) {
    store.dispatch(setIsLoading(true));
    profileService
      .getProfile(username)
      .then((res: AxiosResponse<ProfileResponse>) =>
        store.dispatch(setProfile(res.data.profile))
      )
      .catch((e) => console.log(e));
    store.dispatch(setIsLoading(false));
  }

  function init() {
    store.dispatch(setIsLoading(true));
    store.dispatch(resetState());
    if (username) {
      getProfile(username);
    } else {
      navigate("/");
    }
  }

  useEffect(() => {
    init();
  }, []);

  if (isLoading || !profile) {
    return <></>;
  }

  return (
    <div className="profile-page">
      <UserInfo profile={profile} />

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <ArticleListViewr
              tabs={tabs}
              setTab={setTab}
              toggleClassName="articles-toggle"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
