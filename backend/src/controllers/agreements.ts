
import { Request, Response, NextFunction } from "express";
import { Agreement } from "../entity/Agreement";
import { getRepositories } from "../repositories";

export const createAgreements = async (req: Request, res: Response, next: NextFunction) => {
  const formData: Partial<Agreement> = req.body;
  const { agreement: agreementRepo } = await getRepositories();
  const entityData: Partial<Agreement> = agreementRepo.create(formData);
  await agreementRepo.createQueryBuilder()
    .insert()
    .into(Agreement)
    .values(entityData)
    .execute();
};

export const deleteAgreements = async (req: Request, res: Response, next: NextFunction) => {
  const formData: Partial<Agreement> = req.body;
  const { agreement } = await getRepositories();
  await agreement.createQueryBuilder()
    .delete()
    .from(Agreement)
    .where("id = :id", { id: formData.id })
    .execute();
};

export const modifyAgreements = async (req: Request, res: Response) => {
  const formData: Partial<Agreement> = req.body;
  const { agreement } = await getRepositories();
  await agreement.createQueryBuilder()
    .update(Agreement)
    .set(formData)
    .where("id = :id", { id: formData.id })
    .execute();
};

export const getAgreements = async (req: Request, res: Response) => {
  const clientData: Partial<Agreement> = req.body;
  const { agreement } = await getRepositories();
  const accountId = clientData.id;
  // Get agreements of an account
  const agreements: Agreement[] =
    await agreement.createQueryBuilder("s")
      .where("s.accountId = :accountId", { accountId: accountId })
      .getMany();
  return agreements;
};

export const getAgreementsById = async (req: Request, res: Response) => {
  const clientData: Partial<Agreement> = req.body;
  const { agreement } = await getRepositories();
  const agreementId: number = clientData.id;
  // Get agreements of an account
  const agreementById: Agreement =
    await agreement.createQueryBuilder()
      .where("id = :agreementId", { agreementId: agreementId })
      .getOne();
  return agreementById;
};
