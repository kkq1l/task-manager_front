import { useContext, useState } from "react";
import { Context } from "../main";

const Auth = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { store } = useContext(Context);
  return (
    <div>
      <input
        type="text"
        placeholder="Логин"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <br />
      <input
        type="password"
        placeholder="Пароль"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <br />
      <input
        type="button"
        value="Войти"
        onClick={() => store.login(email!, password!)}
      />
      <br />
    </div>
  );
};

export default Auth;
