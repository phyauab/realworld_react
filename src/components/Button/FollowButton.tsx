import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../state/RootState";
import { store } from "../../state/store";
import profileService from "../../services/profile";

interface Props {
  isLoading: boolean;
  following: boolean;
  username: string;
  setIsLoading: Function;
  setProfile: Function;
}

export function FollowButton({
  isLoading,
  following,
  username,
  setIsLoading,
  setProfile,
}: Props) {
  const navigate = useNavigate();
  const isLogin = useSelector((state: RootState) => state.app.isLogin);

  async function click() {
    if (!isLogin) {
      return navigate("/login");
    }
    store.dispatch(setIsLoading(true));
    try {
      const res = following
        ? await profileService.unfollowUser(username)
        : await profileService.followUser(username);
      store.dispatch(setProfile(res.data.profile));
    } catch (e) {
      console.log(e);
    }
    store.dispatch(setIsLoading(false));
  }

  return (
    <button
      className={`btn btn-sm ${
        following ? "btn-secondary" : "btn-outline-secondary"
      }`}
      disabled={isLoading}
      onClick={click}
    >
      <i className="ion-plus-round"></i>
      &nbsp; {following ? "Unfollow" : "Follow"} {username}
    </button>
  );
}
