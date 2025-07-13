import AccountActions from "../components/layouts/AccountActions";
import withAuthCheck from "../components/middleware/AuthCheck";


const Profile = () => {
  return (
    <>
      <AccountActions>
      </AccountActions>
    </>
  )
}

const ProfilePage = () => withAuthCheck(Profile);

export default ProfilePage;
