
import { Request, Response, NextFunction } from "express";
import { PriceSuggestion } from "../entity/PriceSuggestion";
import { getRepositories } from "../repositories";

export const createPriceSuggestions = async (req: Request, res: Response, next: NextFunction) => {
  const formData: Partial<PriceSuggestion> = req.body;
  const { priceSuggestion: priceSuggestionRepo } = await getRepositories();
  const entityData: Partial<PriceSuggestion> = priceSuggestionRepo.create(formData);
  await priceSuggestionRepo.createQueryBuilder()
    .insert()
    .into(PriceSuggestion)
    .values(entityData)
    .execute();
};

export const deletePriceSuggestions = async (req: Request, res: Response, next: NextFunction) => {
  const formData: Partial<PriceSuggestion> = req.body;
  const { priceSuggestion } = await getRepositories();
  await priceSuggestion.createQueryBuilder()
    .delete()
    .from(PriceSuggestion)
    .where("id = :id", { id: formData.id })
    .execute();
};

export const modifyPriceSuggestions = async (req: Request, res: Response) => {
  const formData: Partial<PriceSuggestion> = req.body;
  const { priceSuggestion } = await getRepositories();
  await priceSuggestion.createQueryBuilder()
    .update(PriceSuggestion)
    .set(formData)
    .where("id = :id", { id: formData.id })
    .execute();
};

export const getPriceSuggestions = async (req: Request, res: Response) => {
  const clientData: Partial<PriceSuggestion> = req.body;
  const { priceSuggestion } = await getRepositories();
  const accountId = clientData.id;
  // Get priceSuggestions of an account
  const priceSuggestions: PriceSuggestion[] =
    await priceSuggestion.createQueryBuilder("s")
      .where("s.accountId = :accountId", { accountId: accountId })
      .getMany();
  return priceSuggestions;
};

export const getPriceSuggestionsById = async (req: Request, res: Response) => {
  const clientData: Partial<PriceSuggestion> = req.body;
  const { priceSuggestion } = await getRepositories();
  const priceSuggestionId: number = clientData.id;
  // Get priceSuggestions of an account
  const priceSuggestionById: PriceSuggestion =
    await priceSuggestion.createQueryBuilder()
      .where("id = :priceSuggestionId", { priceSuggestionId: priceSuggestionId })
      .getOne();
  return priceSuggestionById;
};
