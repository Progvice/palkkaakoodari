
import { Request, Response, NextFunction } from "express";
import { Team } from "./team.entity";
import { getRepositories } from "../../repositories";
import { AuthenticatedRequest, AuthObject } from "../../types";
import { getAccountId } from "../../utils/jwt";

export const createTeams = async (req: Request, res: Response, next: NextFunction) => {
  const formData: Partial<Team> = req.body;
  const areq = req as AuthenticatedRequest;
  const accountId = areq.account.id;
  formData.accountId = accountId;
  const { team: teamRepo } = await getRepositories();
  const entityData: Partial<Team> = teamRepo.create(formData);
  const result = await teamRepo.createQueryBuilder()
    .insert()
    .into(Team)
    .values(entityData)
    .returning("*")
    .execute();
  res
    .status(201) // Created
    .json(result.generatedMaps[0])
    ;
};

export const deleteTeams = async (req: Request, res: Response, next: NextFunction) => {
  const teamId = req.params.id;
  const areq = req as AuthenticatedRequest;
  const accountId = areq.account.id;
  const { team } = await getRepositories();
  await team.createQueryBuilder()
    .delete()
    .from(Team)
    .where("id = :teamId", { teamId: teamId })
    .execute();
  res
    .status(200)
    .json({ message: "DELETED" })
    ;
};

export const modifyTeams = async (req: Request, res: Response) => {
  const teamId = req.params.id;
  const formData: Partial<Team> = req.body;
  const areq = req as AuthenticatedRequest;
  const accountId = areq.account.id;
  const { team } = await getRepositories();
  await team.createQueryBuilder()
    .update(Team)
    .set(formData)
    .where("uuid = :teamId", { teamId: teamId })
    .execute();
  res
    .status(200)
    .json({ message: "MODIFIED" })
    ;
};

export const getTeams = async (req: Request, res: Response) => {

  const auth = res.locals?.auth as AuthObject;
  const accountId = getAccountId(auth.token, process.env.JWT_ACCESS_SECRET);

  if (typeof accountId === "boolean") {
    res.status(401).json({status: false, msg: "invalidtoken"});
    return;
  }

  const { team } = await getRepositories();

   if (!req.query?.q && typeof req.query?.q !== "string") {
      const teams: Partial<Team>[] =
        await team.createQueryBuilder("t")
          .where("t.accountId = :accountId", { accountId: accountId })
          .getMany();
      res
        .status(200)
        .json(teams);
      return;
    }

    const teams: Partial<Team[]> = await team.createQueryBuilder("s")
      .where("s.accountId = :accountId", {accountId: accountId})
      .andWhere("s.name ILIKE :name", {name: `%${req.query.q}%`})
      .getMany()

    res.status(200).json(teams);
};

export const getTeamsById = async (req: Request, res: Response) => {

  const auth = res.locals?.auth as AuthObject;
  const accountId = getAccountId(auth.token, process.env.JWT_ACCESS_SECRET);

  if (typeof accountId === "boolean") {
    res.status(401).json({status: false, msg: "invalidtoken"});
    return;
  }

  const teamId = req.params.id;
  const { team } = await getRepositories();
  const teamById: Team =
    await team.createQueryBuilder("t")
      .where("t.id = :teamId", { teamId: teamId })
      .andWhere("t.accountId = :accountId", {accountId: accountId})
      .getOne();

  console.log(teamById);
  res
    .status(200)
    .json([teamById]);
};
