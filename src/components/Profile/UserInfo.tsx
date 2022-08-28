import { useSelector } from "react-redux";
import { DEFAULT_USER_IMAGE } from "../../common/Constant";
import { Profile } from "../../models/profile/Profile";
import { RootState } from "../../state/RootState";
import { FollowButton } from "../Button/FollowButton";
import { setIsFollowing, setProfile } from "../Pages/Profile/index.slice";

interface Props {
  profile: Profile;
}

export function UserInfo({ profile }: Props) {
  const isFollowing = useSelector(
    (state: RootState) => state.profile.isFollowing
  );

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

            <FollowButton
              following={profile.following}
              isLoading={isFollowing}
              setIsLoading={setIsFollowing}
              setProfile={setProfile}
              username={profile.username}
              isActionBtn={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
