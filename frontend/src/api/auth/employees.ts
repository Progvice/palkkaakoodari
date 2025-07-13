import { Employee } from "../../types";
import api from "../api";
import {authPaths as paths} from "../routes";
import { Response } from "../api";

export const addEmployee = async (employee: Employee) : Response<Employee> =>
  await api.post(paths.employees, employee).then((res) => res.data);

export const modifyEmployee = async (employee: Employee) : Promise<Employee|null> => {
  const res = await api.put<Employee>(paths.employees + "/" + employee.uuid, employee);
  return res?.data ? res.data : null;
}

export const deleteEmployee = async (employee: Employee) =>
  await api.delete(paths.employees + "/" + employee.uuid);

export const getEmployees = async () : Promise<Employee[]> => {
  const res = await api.get<Employee[]>(paths.employees);
  return res?.data ? res.data : [];
}

export const getEmployee = async (employeeId: string) : Promise<Employee[]> => {
  const res = await api.get<Employee>(paths.employees + "/" + employeeId);
  return res?.data ? [res.data] :  [];
}

export const searchEmpoyees = async (q: string) : Promise<Employee[]> => {
  const res = await api.get<Employee[]>(paths.employees, {params: {q: q}});
  return res.data ? res.data : [];
}
