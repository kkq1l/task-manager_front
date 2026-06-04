import { HiLockClosed } from "react-icons/hi2";

const Forbidden = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <HiLockClosed className="h-14 w-12 text-white mr-2" />
      Что-то пошло не так. <br />У вас нет доступа
    </div>
  );
};

export default Forbidden;
