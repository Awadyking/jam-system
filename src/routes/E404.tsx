import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next"; 

export default function E404() {

  const {t} : {t : TFunction<"translation" , undefined>} = useTranslation()

    return (
        <>
        <img src="/img/404.png" className="w-56 h-fit "/>
        <p className="text-3xl font-bold text-black dark:text-white mt-2">404 | {t("not_found")}</p>
        <p className="text-2xl font-bold text-black text-center dark:text-white mt-3 lg:w-6/12 w-10/12 ">{t("not_found_msg")}</p>

        </>
    )
}