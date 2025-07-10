import { Link } from "react-router-dom"
import Ball from "../components/Ball"
import { useTranslation } from "react-i18next"
import type { TFunction } from "i18next"
import type { ValueType } from "../redux/reducers/Main_reducer"
import { useSelector } from "react-redux"
import i18n from "../i18next"


export default function Home() {

  const {t} : {t : TFunction<"translation" , undefined>} = useTranslation()
  const {USER}  : { USER : any} = useSelector((state : {Main : ValueType}) => state.Main)

const Balls = [
    {
        title : t("my_profile") ,
        img : "/img/profile.png" ,
        to: "/profile"
    } ,
    {
      title : t("settings") ,
      img : "/img/settings.png" ,
      to : "/settings"
    } ,
    {
      title : t("wallets_management") ,
      img : "/img/wallets.png" ,
      to : "/wallets"
    } ,
        {
      title : t("payment_management") ,
      img : "/img/buy.png" ,
      to : "/payments"
    } ,
    {
      title : t("bills_management") ,
      img : "/img/bills.png" ,
      to : "/bills"
    } ,

    {
      title : t("banks_cards") , 
      img : "/img/cards.png" ,
      to : "/cards"
    } , 
    {
      title : t("depts_management") ,
      img : "/img/depts.png" ,
      to : "/depts"
    } ,
    {
      title : t("notes_management") ,
      img : "/img/notes.png" ,
      to : "/notes"
    } ,
    {
      title : t("about") , 
      img : "/img/about.svg" ,
      to : "/about"
    }
]





  return (<>
  <div className="w-10/12 text-xl font-bold text-black dark:text-white mt-8" dir={i18n.dir()}>{t("hello")}{USER != "" ? " " + USER.name : ""} !</div>
  <div className="w-10/12 flex flex-wrap justify-evenly mt-1" dir={i18n.dir()}>
  {Balls.map((i : {title : string , img : string , to : string} , index : number)=>{
    return <Link to={i.to}>
        <Ball key={index} title={i.title} img={i.img}/>
    </Link>
})
    }
  </div>
 </> )
}