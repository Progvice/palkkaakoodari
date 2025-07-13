import { useLang } from "../../context/lang.context";


const FourOFour = () => {

  const {t} = useLang();

  return <h1 className="text-5xl text-theme-blue text-center border-b w-fit h-fit pb-4 border-theme-blue self-center mx-auto">404 - {t("pagenotfound")}</h1>
}

export default FourOFour;
