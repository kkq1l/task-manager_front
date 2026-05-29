import type ITask from "./ITask";
import type { IUser } from "./User";

export default interface ITaskDetails {
  task_info_id: string;
  task_id: string;
  user_id: string;
  task: ITask;
  user: IUser;
  started_at: string;
  updated_at: string;
  ended_at: string;
  role_on_task: string;
  status: string;
}
