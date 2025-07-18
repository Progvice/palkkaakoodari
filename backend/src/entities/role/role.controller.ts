
import { Request, Response, NextFunction } from "express";
import { Role } from "./role.entity";
import { getRepositories } from "../../repositories";

export const createRoles = async (req: Request, res: Response, next: NextFunction) => {
  const formData: Partial<Role> = req.body;
  const { role: roleRepo } = await getRepositories();
  const entityData: Partial<Role> = roleRepo.create(formData);
  await roleRepo.createQueryBuilder()
    .insert()
    .into(Role)
    .values(entityData)
    .execute();
};

export const deleteRoles = async (req: Request, res: Response, next: NextFunction) => {
  const formData: Partial<Role> = req.body;
  const { role } = await getRepositories();
  await role.createQueryBuilder()
    .delete()
    .from(Role)
    .where("id = :id", { id: formData.id })
    .execute();
};

export const modifyRoles = async (req: Request, res: Response) => {
  const formData: Partial<Role> = req.body;
  const { role } = await getRepositories();
  await role.createQueryBuilder()
    .update(Role)
    .set(formData)
    .where("id = :id", { id: formData.id })
    .execute();
};

export const getRoles = async (req: Request, res: Response) => {
  const clientData: Partial<Role> = req.body;
  const { role } = await getRepositories();
  const accountId = clientData.id;
  // Get roles of an account
  const roles: Role[] =
    await role.createQueryBuilder("r")
      .getMany();
  return roles;
};

export const getRolesById = async (req: Request, res: Response) => {
  const clientData: Partial<Role> = req.body;
  const { role } = await getRepositories();
  const roleId: number = clientData.id;
  // Get roles of an account
  const roleById: Role =
    await role.createQueryBuilder()
      .where("id = :roleId", { roleId: roleId })
      .getOne();
  return roleById;
};
