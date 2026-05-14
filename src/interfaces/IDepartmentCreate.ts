import type IDepartment from "./IDepartment";

export default interface IDepartmentCreate extends IDepartment {
  name: string;
  department_type: string;
}
