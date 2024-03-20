import { useAuthContext } from "../../../hooks/useAuthContext";
import useUserInformation from "../../../hooks/useUserInformation";

type props = {
  userInfo?: {
    email: string;
    uid: string;
  };
};

export default function UserInformation({ userInfo }: props) {
  const { user } = useAuthContext();
  const { userCreatedAt } = useUserInformation(user.uid);
  return (
    <div className="d-flex flex-column w-100 m-3">
      <label>Id konta</label>
      <div className="userId account-data-container">
        <span className="account-data">{userInfo?.uid || user.uid} </span>
      </div>
      {user.email && (
        <>
          <label>E-mail</label>
          <div className="userEmail account-data-container">
            <span className="account-data">{userInfo?.email || user.email}</span>
          </div>
        </>
      )}
      <label>Data utworzenia konta</label>
      <div className="userId account-data-container">
        <span className="account-data">{userCreatedAt || ""} </span>
      </div>
    </div>
  );
}
