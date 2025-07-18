import { Employee } from "./employee.entity";
import { Tag } from "../tag/tag.entity";
import { getRepositories } from "../../repositories"
import { AppError } from "../../utils/errors/AppError";

export const updateEmployeeByUUID = async (uuidParam: string, employeeData: Partial<Employee>) => {
  const {employee} = await getRepositories();

  try {
    return await employee.createQueryBuilder()
    .update(Employee)
    .set(employeeData)
    .where("uuid = :uuid", { uuid: uuidParam })
    .execute();
  }
  catch (err: unknown) {
    throw err;
  }
}

export const insertEmployee = async (employeeData: Partial<Employee>, accountId: number) => {
  const { employee: employeeRepo } = await getRepositories();
  const entityData: Partial<Employee> = employeeRepo.create({
    accountId: accountId,
    ...employeeData
  });

  try {
    const result = await employeeRepo.save(entityData);
    return result;
  }
  catch (err: unknown) {
    throw err;
  }
}



export const findEmployeeByUUID = async (uuid: string) : Promise<Employee|null> => {
  const {employee} = await getRepositories();
  try {
    return await employee.findOneBy({uuid: uuid});
  }
  catch (err: unknown) {
    throw new AppError('Failed to find employee by UUID', 500, true, err);
  }
}

export const updateEmployeeTags = async (employeeId: number, tags: Tag[]) => {}
