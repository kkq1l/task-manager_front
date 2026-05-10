import { useContext } from "react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";

const Profile = () => {
  const { store } = useContext(Context);
  return (
    <div>
      Profile {store.isAuth}
      <br />
      <input type="button" value="Выйти" onClick={() => store.logout()} />
    </div>
  );
};

export default observer(Profile);
