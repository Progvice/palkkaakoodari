import { useEffect, useState } from "react";
import { Tag } from "../types";
import { useLang } from "../context/lang.context";
import Input from "./general/Input";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { searchTags } from "../api/auth/tags";
import Loading from "./general/Loading";
import PickableTag from "./Tag";

type TagPickerType = {
  employeeTags: Tag[],
  setEmployeeTags: (tags: Tag[]) => void
}

const TagPicker: React.FC<TagPickerType> = (props) => {
  const {employeeTags, setEmployeeTags} = props;
  const {t} = useLang();
  const [searchVal, setSearchVal] = useState<string>('');

  const {data, refetch, isLoading} = useQuery({
    queryKey: ['tags'],
    queryFn: async () => await searchTags(searchVal),
    enabled: searchVal.length < 2 ? false : true
  });

  useEffect(() => {
    if (searchVal.length < 2) return;
    if (!data) return;
    refetch();
  }, [searchVal, data, refetch]);

  const tagBoxTextStyle = "self-center text-center w-full text-theme-grey";

  return (
    <div className="flex flex-col flex-wrap w-full">
      <div className="flex flex-row gap-4">
        <div className="flex flex-col w-6/12">
          <p className="text-base my-2">{t('pickedTags')}</p>
          <div className="flex flex-row p-1 flex-wrap justify-start items-start border border-theme-grey w-full min-h-[100px]">
            {employeeTags.length < 1 ? <p className={tagBoxTextStyle}>{t('noSkillsPicked')}</p> : null}
            {employeeTags.length > 0 ? employeeTags.map((tag, index) => {
              return <PickableTag type="remove" tag={tag} key={index} text={tag.name} onClick={() => {
                setEmployeeTags(
                  employeeTags.filter((removableTag) => removableTag.id !== tag.id)
                );
              }}/>
            }) : null}
          </div>
        </div>
        <div className="flex flex-col w-6/12">
          <p className="text-base my-2">{t('searchedTags')}</p>
          <div className="flex flex-row p-1 justify-start items-start flex-wrap border border-theme-grey w-full min-h-[100px]">
            {!data && searchVal.length < 2 ? <p className={tagBoxTextStyle}>{t('noTagsSearched')}</p> : null}
            {isLoading ? <Loading/> : null}
            {data && !isLoading ? data.map((tag, index) => {
              if (employeeTags.find((t) => t.id === tag.id)) return null;
              return <PickableTag type="add" tag={tag} key={index} text={tag.name} onClick={() => {
                setEmployeeTags([
                  ...employeeTags,
                  tag
                ])
              }}/>
            }) : null}
          </div>
        </div>
      </div>
      <Input label={t('searchTags')} field={t('searchTags')} className={{div: 'self-end w-full'}} onChange={debounce(setSearchVal, 500)} />
    </div>
  )
}

export default TagPicker;
