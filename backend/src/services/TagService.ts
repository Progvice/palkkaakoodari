import { Tag } from "../entity/Tag";
import { modifyTagByID } from "../repositories/tags";

class TagService {
  async modifyTag(tagId: number, tagData: Tag) {
    return await modifyTagByID(tagId, tagData);
  }
}

export default TagService;
