import type ITask from "./ITask";
import type { IUser } from "./User";

export default interface IChat {
  chat_id: string;
  text: string;
  type_message: string;
  created_at: string;
  updated_at: string;
  coming_system: string;
  task: ITask;
  author?: IUser;
}
