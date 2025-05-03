import { Tag } from "../../types";
import api, { parseAxiosError } from "../api";
import { authPaths as paths } from "../routes";

export const addTag = async (tag: Tag) => {
  try {
    const response = await api.post(paths.tags, tag);
    return response.data;
  } catch (error) {
    parseAxiosError(error);
  }
};

export const modifyTag = async (tag: Tag) => {
  try {
    const response = await api.patch(paths.tags + "/" + tag.id, tag);
    return response.data;
  } catch (error) {
    parseAxiosError(error);
  }
};

export const deleteTag = async (tag: Tag) => {
  try {
    const response = await api.delete(paths.tags + "/" + tag.id);
    return response.data;
  } catch (error) {
    parseAxiosError(error);
  }
};


export const getTags = async () => {
  try {
    const response = await api.get(paths.tags);
    return response.data;
  } catch (error) {
    parseAxiosError(error);
  }
};

export const searchTags = async (name: string) : Promise<Tag[]> => {
  const res = await api.get<Tag[]>(`${paths.tags}?q=${name}`);
  return res.data ? res.data : [];
}

export const getTag = async (tagId: number) => {
  try {
    const response = await api.get(paths.tags + "/" + tagId);
    return response.data;
  } catch (error) {
    parseAxiosError(error);
  }
};
