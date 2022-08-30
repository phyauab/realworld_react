import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { DEFAULT_USER_IMAGE } from "../../common/Constant";
import { Profile } from "../../models/profile/Profile";
import { RootState } from "../../state/RootState";
import { FollowButton } from "../Button/FollowButton";
import { setIsFollowing, setProfile } from "../Pages/Profile/index.slice";

interface Props {
  profile: Profile;
}

export function UserInfo({ profile }: Props) {
  const { username } = useParams();
  const isFollowing = useSelector(
    (state: RootState) => state.profile.isFollowing
  );
  const user = useSelector((state: RootState) => state.app.user);

  return (
    <div className="user-info">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <img
              src={profile.image || DEFAULT_USER_IMAGE}
              className="user-img"
            />
            <h4>{profile.username}</h4>
            <p>{profile.bio}</p>

            {username === user?.username ? (
              <Link
                className="btn btn-sm btn-outline-secondary action-btn"
                to="/settings"
              >
                <i className="ion-gear-a"></i> Edit Profile Settings
              </Link>
            ) : (
              <FollowButton
                following={profile.following}
                isLoading={isFollowing}
                setIsLoading={setIsFollowing}
                setProfile={setProfile}
                username={profile.username}
                isActionBtn={true}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
