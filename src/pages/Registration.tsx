import { useContext, useState } from "react";
import { Context } from "../main";

const Registration = () => {
  const [email, setEmail] = useState<string>();
  const [inviteCode, setCode] = useState<string>();
  const [password, setPassword] = useState<string>();

  const { store } = useContext(Context);

  const registration = async () => {
    if (!email) {
      alert("Вы не заполнили почту");
      return;
    }

    if (!password) {
      alert("Придумайте пароль!");
      return;
    }

    if (password) {
      let pwdLenght = password.length;
      if (pwdLenght < 8) alert("Ваш пароль слишком короткий");
    }

    store.registration(email!, password!, inviteCode!);
  };
  return (
    <div>
      <h1>Регистрация</h1>
      <input
        type="text"
        placeholder="Логин"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <br />
      <input
        type="text"
        placeholder="Код приглашения"
        onChange={(e) => setCode(e.target.value)}
        value={inviteCode}
      />
      <br />
      <input
        type="password"
        placeholder="Пароль"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <br />
      Пароль должен содержать:
      <ul>
        <li>от 8 символов</li>
        <li>заглавные буквы (A-Z)</li>
        <li>строчные буквы (a-z)</li>
        <li>цифры (0–9)</li>
      </ul>
      <input type="button" value="Создать аккаунт" onClick={registration} />
      <br />
    </div>
  );
};

export default Registration;
