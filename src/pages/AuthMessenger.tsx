import { useContext, useEffect, useState } from "react";
import AuthService from "../services/auth/AuthService";
import { Context } from "../main";

const AuthMessenger = () => {
  const { store } = useContext(Context);
  const [inviteCode, setInviteCode] = useState<string>("");
  const registUser = async () => {
    const body: any = {
      invite: inviteCode,
      data: store.tgData,
    };
    const response = await AuthService.tgSignUp(body);

    console.log(response);
  };

  const auth = async () => {
    store.loginWithTg();
  };

  useEffect(() => {
    if (!store.isAuth) {
      auth();
    }
  }, [store.isAuth]);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-xl w-full mx-auto bg-gray-900 rounded-xl overflow-hidden">
        <div className="max-w-md mx-auto pt-12 pb-2 px-5 text-center">
          <h2 className="text-center text-white">AuthMessenger</h2>
          <input
            placeholder="Код приглашения"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            className="w-full bg-[#676f9d] text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-[#676f9d] focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
          />
          <br />
          <p className="text-white">
            Данный код приглашения можно получить у заведуюшего отделения
          </p>
        </div>
        <div className="pt-5 pb-6 px-6 text-right bg-gray-800 -mb-2">
          <button
            onClick={() => registUser()}
            className="inline-block w-full sm:w-auto py-3 px-5 mb-2 text-center font-semibold leading-6 text-blue-50 bg-[#f9b17a] hover:bg-[#f9b17a]/70 rounded-lg transition duration-200"
          >
            Авторизоваться
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthMessenger;
