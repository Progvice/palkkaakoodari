import { useAuth } from "../../context/auth.context";
import { useLang } from "../../context/lang.context";
import { useMemo } from "react";
import { roleLinks } from "../../constants/rolelinks";

import Link from "../general/Link";



const Menu : React.FC = () => {

  const auth = useAuth();
  const {t} = useLang();

  const role = auth?.account?.role.name;

  const links = useMemo(() => {
    return Object.entries(role && role in roleLinks ? roleLinks[role] : {});
  }, [role]); // Only recompute when role changes

  return (
    <div className="p-3">
      <ul>
        {links ? links.map((link, index) => {
          return (
          <li className="h-12 flex" key={index}>
            <Link className="flex flex-row items-center w-full border-b border-theme-grey" to={link[1].link}>{link[1].icon}&nbsp;&nbsp;{t(link[0])}</Link>
          </li>
          )
        }) : null}
      </ul>
    </div>
  )
}

const Sidepanel = () => {

  const auth = useAuth();
  const role = auth?.account?.role.name;

  return (
    <div className="w-[270px] min-h-[calc(100vh-170px)] h-auto bg-theme-element">
      {role ? (<Menu />) : null}
    </div>
  )
}

export default Sidepanel;
