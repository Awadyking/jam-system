import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next"; 
import i18n from "../i18next"; 
export default function Home() {
  const {t , i18n} : {t : TFunction<"translation" , undefined> , i18n : any} = useTranslation()


  return (
    <>
    {t("f")}
    </>
  )
}


