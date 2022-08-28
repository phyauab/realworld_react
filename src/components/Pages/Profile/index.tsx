import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../state/RootState";
import { store } from "../../../state/store";
import { setIsLoading, setProfile } from "../Profile/index.slice";
import { resetState } from "./index.slice";
import profileService from "../../../services/profile";
import { AxiosResponse } from "axios";
import { ProfileResponse } from "../../../models/profile/ProfileResponse";
import { UserInfo } from "../../Profile/UserInfo";

export function ProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const isLoading = useSelector((state: RootState) => state.profile.isLoading);
  const profile = useSelector((state: RootState) => state.profile.profile);

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
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a className="nav-link active" href="">
                    My Articles
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="">
                    Favorited Articles
                  </a>
                </li>
              </ul>
            </div>

            <div className="article-preview">
              <div className="article-meta">
                <a href="">
                  <img src="http://i.imgur.com/Qr71crq.jpg" />
                </a>
                <div className="info">
                  <a href="" className="author">
                    Eric Simons
                  </a>
                  <span className="date">January 20th</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                  <i className="ion-heart"></i> 29
                </button>
              </div>
              <a href="" className="preview-link">
                <h1>How to build webapps that scale</h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
              </a>
            </div>

            <div className="article-preview">
              <div className="article-meta">
                <a href="">
                  <img src="http://i.imgur.com/N4VcUeJ.jpg" />
                </a>
                <div className="info">
                  <a href="" className="author">
                    Albert Pai
                  </a>
                  <span className="date">January 20th</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                  <i className="ion-heart"></i> 32
                </button>
              </div>
              <a href="" className="preview-link">
                <h1>
                  The song you won't ever stop singing. No matter how hard you
                  try.
                </h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
                <ul className="tag-list">
                  <li className="tag-default tag-pill tag-outline">Music</li>
                  <li className="tag-default tag-pill tag-outline">Song</li>
                </ul>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
