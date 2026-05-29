import React from "react";

const Home = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="min-w-4/5 max-w-4/5">
        <h1 className="w-full text-center">
          Система для управления вашими задачами
        </h1>
        <p>
          QuestManager - это платформа для порядка задач для вашей организации.
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li className="!list-item !list-disc">Создавайте отделения;</li>
          <li className="!list-item !list-disc">
            Указывайте отделения, которые будут принимать задачи от ваших
            сотрудников других отделений;
          </li>
          <li className="!list-item !list-disc">
            Создавайте категории обращений;
          </li>
          <li className="!list-item !list-disc">Принимайте заявки</li>
        </ol>

        <p className="text-center mt-12">Подавай обращения</p>
        <div className="w-full flex justify-center my-6">
          <img
            src="public\create_task.jpg"
            alt="Создавай задачи"
            className="w-150 rounded-lg"
          />
        </div>

        <div className="w-full flex items-center gap-3">
          <img
            src="public\orel-gray.svg"
            alt="Создавай задачи"
            className="w-7 rounded-lg"
          />
          <p className="flex-1 ml-2 mt-1 text-xs">
            Пока, что не в едином реестре российского ПО
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
