import { Tag } from "./tag.entity"
import { getRepositories } from "../../repositories";

export const modifyTagByID = async (tagId: number, uTag: Tag) => {
    const {id, ...updatedTag} = uTag;
    const {tag} = await getRepositories();

    return await tag.createQueryBuilder()
      .update(Tag)
      .set(updatedTag)
      .where("id = :id", { id: tagId })
      .execute();
}

export const removeTagByID = async (id: number) => {
  const {tag} = await getRepositories();
  return await tag.delete(id);
}

export const createTag = async (newTagDetails: Omit<Tag, 'id'>) : Promise<Tag> => {
  const {tag} = await getRepositories();
  const newTag = new Tag(newTagDetails);
  return await tag.save(newTag);
}

export const findTagByName = async (name: string) => {
  const {tag} = await getRepositories();

  return await tag.createQueryBuilder()
    .select()
    .from(Tag, "tag")
    .where("tag.name = :name", {name: name})
    .execute();
}

export const searchTags = async (searchVal: string) => {
  const {tag} = await getRepositories();

  return await tag.createQueryBuilder()
    .select()
    .from(Tag, "tag")
    .where("tag.name ILIKE :name", {name: searchVal})
    .execute();
}

export const findTagByID = async (id: number) => {
  const {tag} = await getRepositories();
  return await tag.findOneBy({id: id});
}
