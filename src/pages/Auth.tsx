import { useContext, useState } from "react";
import { Context } from "../main";

const Auth = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { store } = useContext(Context);
  return (
    <div>
      {" "}
      <div className="max-w-xl w-full mx-auto bg-[#424769] rounded-xl overflow-hidden">
        <div className="max-w-md mx-auto pt-12 px-5 text-center">
          <input
            type="text"
            placeholder="Логин"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#676f9d] text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-[#676f9d]/70 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            value={email}
          />
          <br />
          <input
            type="password"
            placeholder="Пароль"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#676f9d] text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-[#676f9d]/70 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            value={password}
          />
          <br />
        </div>{" "}
        <div className="pt-5 pb-6 px-6 text-right bg-[#424769] -mb-2">
          <input
            type="button"
            value="Войти"
            className="inline-block w-full sm:w-auto py-3 px-5 mb-2 text-center font-semibold leading-6 text-white bg-[#f9b17a] hover:bg-[#f9b17a]/80 rounded-lg transition duration-200"
            onClick={() => store.login(email!, password!)}
          />
          <br />
        </div>
      </div>
    </div>
  );
};

export default Auth;
