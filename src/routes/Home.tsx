import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next"; 
import type { ValueType } from "../redux/reducers/Main_reducer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
  const {t} : {t : TFunction<"translation" , undefined> , i18n : any} = useTranslation()
  const {token}  : {token : string | undefined} = useSelector((state : {Main : ValueType}) => state.Main)


  return (
    <>
    <img src="/img/intro.png" className="w-56 h-fit "/>
    <p className="text-xl lg:text-2xl font-bold text-black dark:text-white mt-2">{t("welcome")}</p>
    <p className="text-xl lg:text-2xl font-bold text-black dark:text-white mt-2 text-center ">{t("welcome_msg")}</p>
    {
      token == "" ? <div className="flex w-7/12 lg:w-3/12 mt-4 justify-between">
        <Link to="/login">
      <button className="btn bg-[#FF9393] border-[#FF9393] rounded-4xl w-28">
        <img src="/img/login_btn.svg" className="w-6 h-6"/>
        {t("login_btn")}</button>
        </Link>
       <Link to="/register"> 
  <button className="btn btn-outline btn-error rounded-4xl w-28">
     {t("register_btn")}
     </button>
     </Link>

      </div> : <Link to="/dashboard">
      <button className="btn btn-error rounded-4xl w-28 mt-4">{t("dashboard_btn")}</button>
      </Link>
    }
    </>
  )
}


