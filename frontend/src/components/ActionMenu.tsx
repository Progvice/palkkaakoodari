import { useState, Fragment } from "react";
import type { ReactNode } from "react";
import Button from "./general/Button";
import Link from "./general/Link";

type ActionType = {
  action: {
    text: string | ReactNode;
    link: string;
  } | {
    text: string;
    run: (...args: unknown[]) => unknown;
  };
}

type ActionMenuProps = {
  text: string,
  actions: ActionType[],
  icon?: ReactNode
}

const ActionSubMenu : React.FC<{actions: ActionType[]}> = (props) => {
  const {actions} = props;

  return (
    <div className="absolute w-[175px] flex flex-col top-[40px] right-0 bg-white border border-theme-grey">
      {
        actions.map(({action}, index) => {
          return (
            <Fragment key={index}>
              {'link' in action ? (
                <Link className="px-3 py-2 border-b border-theme-grey last:border-0 flex flex-row items-center" to={action.link}>{action.text}</Link>
              ) : (
                <Button variant="noStyle" onClick={action.run}>{action.text}</Button>
              )}
            </Fragment>
          )
        })
      }
    </div>
  )

}

const ActionMenu : React.FC<ActionMenuProps> = (props) => {
  const {text, actions, icon} = props;

  const [actionMenuVisible, setActionMenuVisible] = useState<boolean>(false);

  return (
    <div className="relative">
      <Button onClick={() => setActionMenuVisible(!actionMenuVisible)}>{text}&nbsp;&nbsp;{icon ? icon : null}</Button>
      {
        actionMenuVisible ? <ActionSubMenu actions={actions}/> : null
      }
    </div>
  )
}

export default ActionMenu;
