import type IDepartmentDetail from "./IDepartmentDetail";

export default interface INews {
  news_id?: string;
  user_id?: string;
  title?: string;
  description?: string;
  visible?: boolean;
  notification?: boolean;
  org_id: string;
  dep_author?: IDepartmentDetail;
  created_at?: string;
  shorted?: boolean;
}
