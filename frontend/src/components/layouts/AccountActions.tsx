import { cloneElement } from "react";
import Sidepanel from "./Sidepanel";
import { useLang } from "../../context/lang.context";
import { ReactElement, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import type { InputProps } from "../general/Input";
import type { ButtonProps } from "../general/Button";
import { twMerge } from "tailwind-merge";


type AccountActionProps = {
  children?: ReactNode,
  searchBar?: ReactElement<InputProps>,
  customButton?: ReactElement<ButtonProps>,
  title?: string
};

const AccountActions : React.FC<AccountActionProps> = (props) => {
  const {children, searchBar, customButton, title} = props;
  const {t} = useLang();
  const location = useLocation();
  const clearLocation = location.pathname.replace(/\//g, "");

  console.log(title);

  const searchBarFinal = searchBar ? cloneElement(searchBar, {
    className: {
      div: twMerge("w-full max-w-[455px]", searchBar?.props?.className?.div ?? ""),
      input: twMerge("w-full h-[38px]", searchBar?.props?.className?.input ?? "")
    },
    onChange: (e) => searchBar.props.onChange(e)
  }) : null;

  const customBtnFinal = customButton ? cloneElement(customButton, {
    className: twMerge("w-full max-w-[200px] ml-auto", customButton?.props?.className) ?? ""
  }) : null;

  return (
    <>
      <div className="flex flex-row w-full justify-between mb-3 h-[40px]">
        <div className="w-[270px] flex items-center">
          <h2 className="h2 text-theme-blue flex items-center">{t("controlpanel")}</h2>
        </div>
        <div className="w-[calc(100%-305px)] flex flex-row items-center relative">
          <h2 className="h2 text-theme-blue pr-4">{title ? title : t(clearLocation)}</h2>
          {searchBarFinal}
          {customBtnFinal}
        </div>
      </div>
      <div className="flex flex-row w-full justify-between">
        <Sidepanel/>
        <div className="w-[calc(100%-305px)] min-h-[calc(100vh-170px)] pb-3 relative">
          {children ? children : null}
        </div>
      </div>
    </>
  )
}

export default AccountActions;
