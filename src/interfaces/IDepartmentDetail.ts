import type IDepartmentCreate from "./IDepartmentCreate";

export default interface IDepartmentDetail extends IDepartmentCreate {
  name: string;
  department_type: string;
}
