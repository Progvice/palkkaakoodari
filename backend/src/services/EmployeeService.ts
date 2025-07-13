import { Employee, employeeModifiable, employeeRequiredFields } from "../entity/Employee";
import { updateEmployeeByUUID, insertEmployee, findEmployeeByUUID } from "../repositories/employees";
import { AppError } from "../utils/errors/AppError";
import { filterFields, requiredFields } from "../utils/fields";

class EmployeeService {
  async modifyEmployee(uuidParam: string, employeeData: Partial<Employee>, accountId: number) {

    const fetchedEmployee = await findEmployeeByUUID(uuidParam);

    if (!fetchedEmployee) {
      throw new AppError('notfound', 404);
    }

    if (fetchedEmployee.accountId !== accountId) {
      throw new AppError('unauthorized', 401);
    }

    try {
      return await updateEmployeeByUUID(uuidParam, employeeData);
    }
    catch (err: unknown) {
      throw err;
    }
  }

  async insertEmployee(employeeData: Partial<Employee>, accountId: number) {

    const fieldCheck = requiredFields<Employee>(employeeData, employeeRequiredFields);

    if (!fieldCheck.status) {
      throw new AppError('Employee missing fields', 400, true, fieldCheck.missingFields);
    }

    const employee : Partial<Employee> =
      filterFields<Partial<Employee>>(employeeData, employeeModifiable);

    try {
      return await insertEmployee(employee, accountId);
    } catch(err: unknown) {
      throw new AppError('Employee insert failed', 500, true)
    }
  }
}

export default EmployeeService;
