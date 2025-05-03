import { useState } from "react";
import Carousel from "../components/Carousel";
import type { CarouselImg } from "../components/Carousel";
import ProgressSteps from "../components/ProgressSteps";
import { useLang } from "../context/lang.context";
import type { StepProps } from "../components/ProgressSteps";
import Button from "../components/general/Button";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const HomePage = () => {

  const {t} = useLang();
  const location = useLocation();

  const [role, setRole] = useState<"seller"|"buyer">("seller");

  const images : CarouselImg[] = [{
    url: "/computer.jpg",
    description: "Image - Person using computer"
  }, {
    url: "/computer.jpg",
    description: "Image - Person using computer"
  }];

  const progressData : Record<string, StepProps[]> = {
    seller: [
      {title: t("register"), description: "asd"},
      {title: t("addEmployee"), description: "asd"},
      {title: t("describeBusiness"), description: "asd"},
      {title: t("startSelling"), description: "asdasd"}
    ],
    buyer: [
      {title: t("register"), description: "asd"}
    ]
  }

  const activeBtnStyles = "bg-theme-blue text-white";

  return (
    <>
      <Carousel
        images={images}
        title={t("title")}
        description={t("frontpageDesc")}
        className="top-[-30px]"
      />
      <h1 className="h1 text-center">{t("startUsingNow")}</h1>

      <div className="flex flex-row gap-4 items-center justify-center pt-8">
        <Button className={"w-[150px] " + (role === "seller" ? activeBtnStyles : '')} variant="blueBorder" type={"button"} onClick={() => setRole("seller")}>{t("seller")}</Button>
        <Button className={"w-[150px] " + (role === "buyer" ? activeBtnStyles : '')} variant="blueBorder" type={"button"} onClick={() => setRole("buyer")}>{t("buyer")}</Button>
      </div>

      {role === "seller" ? (<ProgressSteps steps={progressData["seller"]}/>) : null}
      {role === "buyer" ? (<ProgressSteps steps={progressData["buyer"]}/>) : null}
    </>
  )
}

export default HomePage;
