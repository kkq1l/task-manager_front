export default interface INews {
  news_id?: string;
  user_id?: string;
  title?: string;
  description?: string;
  visible?: boolean;
  notification?: boolean;
  org_id: string;
}
