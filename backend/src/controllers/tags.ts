
import { Request, Response, NextFunction } from "express";
import { Tag } from "../entity/Tag";
import { getRepositories } from "../repositories";
import { AuthenticatedRequest } from "../types";

export const createTags = async (req: Request, res: Response, next: NextFunction) => {
  const formData: Partial<Tag> = req.body;
  const { tag: tagRepo } = await getRepositories();
  const entityData: Partial<Tag> = tagRepo.create(formData);
  const result = await tagRepo.createQueryBuilder()
    .insert()
    .into(Tag)
    .values(entityData)
    .returning("*")
    .execute();
  res
    .status(201) // Created
    .json(result.generatedMaps[0])
    ;
};

export const deleteTags = async (req: Request, res: Response, next: NextFunction) => {
  const tagId = req.params.id;
  const areq = req as AuthenticatedRequest;
  //const accountId = areq.account.id;
  const { tag } = await getRepositories();
  await tag.createQueryBuilder()
    .delete()
    .from(Tag)
    .where("id = :tagId", { tagId: tagId })
    .execute();
  res
    .status(200)
    .json({ message: "DELETED" })
    ;
};

export const modifyTags = async (req: Request, res: Response) => {
  const tagId = req.params.id;
  const formData: Partial<Tag> = req.body;

  const { tag } = await getRepositories();
  await tag.createQueryBuilder()
    .update(Tag)
    .set(formData)
    .where("id = :tagId", { tagId: tagId })
    .execute();
  res
    .status(200)
    .json({ message: "MODIFIED" })
    ;
};

export const getTags = async (req: Request, res: Response) => {
  const { tag } = await getRepositories();

  if (req.query?.q && typeof req.query?.q === "string") {
    const tags: Partial<Tag>[] =
      await tag.createQueryBuilder("t")
        .where("t.name ILIKE :name", { name: `%${req.query.q}%` })
        .getMany();
    res
      .status(200)
      .json(tags);
    return;
  }

  const tags: Tag[] =
    await tag.createQueryBuilder("t")
      .getMany();
  res
    .status(200)
    .json(tags);
};

export const getTagsById = async (req: Request, res: Response) => {
  const tagId = req.params.id;
  const { tag } = await getRepositories();
  const tagById: Tag =
    await tag.createQueryBuilder()
      .where("id = :tagId", { tagId: tagId })
      .getOne();
  res
    .status(200)
    .json(tagById);
};
