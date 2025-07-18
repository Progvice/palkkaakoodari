import { Tag } from "./tag.entity";
import { modifyTagByID } from "./tag.repository";

class TagService {
  async modifyTag(tagId: number, tagData: Tag) {
    return await modifyTagByID(tagId, tagData);
  }
}

export default TagService;
