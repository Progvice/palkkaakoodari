import Link from "../general/Link";
import { useAuth } from "../../context/auth.context";
import { useLang } from "../../context/lang.context";

const liStyles = "flex items-center border-b-[4px] border-transparent text-sm hover:border-theme-blue";

const Navbar = () => {

  const auth = useAuth();
  const {t} = useLang();

  return (
    <header className="fixed h-[80px] w-full bg-grey top-0 left-0 z-[10]">
      <nav className="w-full max-w-7xl h-[80px] mx-auto flex justify-between">
        <div className="flex flex-row items-center">
          <h1 className="text-2xl"><Link variant="nostyle" to={'/'}>Palkkaakoodari.fi</Link></h1>
          <ul className="flex flex-row ml-4 min-h-[80px]">
            <li className={liStyles}><Link variant="menu" to={'/'}>{t("browse")}</Link></li>
            <li className={liStyles}><Link variant="menu" to={'/aboutus'}>{t("aboutus")}</Link></li>
          </ul>
        </div>
        <div className="flex flex-row items-center">
          {
            auth?.account
              ? (
                <>
                  <Link variant="blueBox" to={'/profile'}>{t("profile")}</Link>
                </>
              )
              : (
                <>
                  <ul className="flex flex-row ml-4 min-h-[80px] mr-4">
                    <li className={liStyles}><Link variant="menu" to={'/login'}>{t("login")}</Link></li>
                  </ul>
                  <Link variant="blueBox" to={'/register'}>{t("joinnow")}</Link>
                </>
              )
          }
        </div>
      </nav>
    </header>
  )
}

export default Navbar;
