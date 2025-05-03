import type { Tag } from "../types";

type TagType = {
  tag: Tag,
  text: string,
  onClick: (tag: Tag[]) => void
  type?: 'add'|'remove'
}

const iconStyles = "w-[12px] h-[12px] rounded-full text-xs bg-white flex items-center justify-center text-theme-blue font-bold";

const PickableTag : React.FC<TagType> = (props) => {
  const {text, onClick, tag, type} = props;
  return <div className="bg-theme-blue text-white p-1 rounded flex m-1 hover:cursor-pointer items-center" onClick={() => {
    onClick([tag]);
  }}>
    {text}&nbsp;
    {type === 'add' ? <div className={iconStyles}>+</div> : null }
    {type === 'remove' ? <div className={iconStyles}>-</div> : null}
  </div>
}

export default PickableTag;
