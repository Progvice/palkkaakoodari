
import { Request, Response, NextFunction } from "express";
import { Employee } from "../entity/Employee";
import { Tag } from "../entity/Tag";
import { getRepositories } from "../repositories";
import { AuthenticatedRequest, AuthObject } from "../types";
import { getAccountId, verifyToken } from "../utils/jwt";
import { getUpdateableFields } from "../utils/updateableFields";

export const createEmployees = async (req: Request, res: Response, next: NextFunction) => {
  const formData: Partial<Employee> = req.body;


  const { employee: employeeRepo } = await getRepositories();
  const entityData: Partial<Employee> = employeeRepo.create(formData);
  const result = await employeeRepo.createQueryBuilder()
    .insert()
    .into(Employee)
    .values(entityData)
    .returning("*")
    .execute();
  res
    .status(201) // Created
    .json(result.generatedMaps[0])
    ;
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

export const modifyEmployees = async (req: Request, res: Response) => {
  const auth = res.locals?.auth as AuthObject;
  const accountId = getAccountId(auth.token, process.env.JWT_ACCESS_SECRET);

  if (typeof accountId === 'boolean') {
    res.status(401).json({
      status: false,
      message: 'Invalid JWT'
    });
    return;
  }
  const uuid = req.params.uuid;

  const updatedEmployee : Partial<Employee> = getUpdateableFields('employee', req.body);
  const employeeTags : Tag[] | null = req.body?.tags ? req.body.tags : null;

  const { employee } = await getRepositories();

  const currentEmployeeTags = employee.findOne({
    where: {
      uuid: uuid,
      accountId: accountId
    }
  });

  await employee.createQueryBuilder()
    .update(Employee)
    .set(updatedEmployee)
    .where("uuid = :uuid", { uuid: uuid })
    .andWhere("accountId = :accountId", {accountId: accountId})
    .execute();
  res
    .status(200)
    .json({ message: "MODIFIED" });
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
