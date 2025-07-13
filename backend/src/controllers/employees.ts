
import { Request, Response, NextFunction } from "express";
import { Employee, employeeRequiredFields } from "../entity/Employee";
import { Tag } from "../entity/Tag";
import { getRepositories } from "../repositories";
import { AuthenticatedRequest, AuthObject } from "../types";
import { getAccountId } from "../utils/jwt";
import EmployeeService from "../services/EmployeeService";
import { filterFields } from "../utils/fields";
import { employeeModifiable } from "../entity/Employee";

export const createEmployees = async (req: Request, res: Response, next: NextFunction) => {

  const employeeFields = filterFields(req.body, employeeModifiable);
  const employeeService = new EmployeeService();

  const accountId = res.locals.accountId as number;

  try {
    const result = await employeeService.insertEmployee(employeeFields, accountId);
    res.status(201).json({
      status: true,
      data: result
    });
    return;
  }
  catch (err: unknown) {
    next(err);
  }
};

export const deleteEmployees = async (req: Request, res: Response, next: NextFunction) => {
  const areq = req as AuthenticatedRequest;
  const uuid = req.params.uuid;
  const accountId = areq.account.id;
  // TODO: check permission with account id
  const { employee } = await getRepositories();
  await employee.createQueryBuilder()
    .delete()
    .from(Employee)
    .where("uuid = :uuid", { uuid: uuid })
    .execute();
  res
    .status(200)
    .json({ message: "DELETED" })
    ;
};

export const modifyEmployees = async (req: Request, res: Response, next: NextFunction) => {
  const accountId = res.locals.accountId;
  const uuid = req.params.uuid;

  const employee : Partial<Employee> = filterFields<Employee>(req.body, employeeModifiable);

  const employeeService = new EmployeeService();

  try {
    const employeeUpdate = await employeeService.modifyEmployee(uuid, employee, accountId);
    res.status(200).json({
      status: true,
      message: 'updatesuccess',
      data: employeeUpdate
    });
    return;
  }
  catch(err) {
    next(err);
  }
};

export const getEmployees = async (req: Request, res: Response) => {
  const auth = res.locals?.auth as AuthObject;
  const accountId = getAccountId(auth.token, process.env.JWT_ACCESS_SECRET);

  if (typeof accountId === "boolean") {
    res.status(401).json({status: false, msg: "invalidtoken"});
    return;
  }

  const { employee } = await getRepositories();

  if (!req.query?.q && typeof req.query?.q !== "string") {
    const employees: Partial<Employee>[] =
      await employee.createQueryBuilder("s")
        .where("s.accountId = :accountId", { accountId: accountId })
        .getMany();
    res
      .status(200)
      .json(employees);

    return;
  }

  const querySplit = typeof req.query?.q === "string" ? req.query.q.split(" ") : "";
  const firstName = querySplit[0];
  const lastName = querySplit.length > 1 ? querySplit[1] : "";

  const employees: Partial<Employee[]> = await employee.createQueryBuilder("s")
    .where("s.accountId = :accountId", {accountId: accountId})
    .andWhere("s.firstName ILIKE :firstName", {firstName: `%${firstName}%`})
    .andWhere("s.lastName ILIKE :lastName", {lastName: `%${lastName}%`})
    .getMany()

  res.status(200).json(employees);
};

export const getEmployeesById = async (req: Request, res: Response) => {
  const employeUuid = req.params.uuid;

  const auth = res.locals?.auth as AuthObject;
  const accountId = getAccountId(auth.token, process.env.JWT_ACCESS_SECRET);

  if (typeof accountId === "boolean") {
    res.status(401).json({status: false, msg: "invalidtoken"});
    return;
  }

  const { employee } = await getRepositories();

  const employeeById: Partial<Employee> =
    await employee.createQueryBuilder("e")
      .where("e.uuid = :employeUuid", { employeUuid: employeUuid })
      .andWhere("e.accountId = :accountId", {accountId: accountId})
      .leftJoinAndSelect('e.tags', 'tag')
      .getOne();
  res
    .status(200)
    .json(employeeById);
};
