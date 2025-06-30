import type { TFunction } from "i18next"
import { useTranslation } from "react-i18next"
import i18n from "../i18next"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useFetcher from "../hooks/useFetcher"
import { useDispatch, useSelector } from "react-redux"
import type { ValueType } from "../redux/reducers/Main_reducer"
import { SET_dialog, SET_token_action, SET_USER_action } from "../redux/Types"


export default function Login() {
      const {t} : {t : TFunction<"translation" , undefined>} = useTranslation()
      const dis = useDispatch()
      const nav = useNavigate()
      const {URL}  : {URL : string} = useSelector((state : {Main : ValueType}) => state.Main)
      const [pass_type , SET_Pass_type]  : [string , any] = useState("password")
      const [username , SET_username] : [string , any] = useState("")
      const [password , SET_password] : [string , any] = useState("")
    return (
        <div className="flex flex-col items-center w-full" dir={i18n.dir()}>
            <img src="/img/auth_bg.jpeg" className="w-full h-screen lg:h-fit fixed z-10 top-10 right-0"/>
            <div className="h-fit w-9/12 lg:w-3/12 bg-gray-100/50 rounded-2xl p-3 mt-20 z-20 ">
            <p className="w-full text-center text-xl font-bold text-white">{t("login_title")}</p>
            <p className="w-full text-lg font-sans text-white" >{t("login_jam")}</p>
            <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">{t("username")}</legend>
                    <input type="text" value={username} onChange={(e) => {SET_username(e.target.value)}} placeholder="xxxxxx" className="outline-none border-2 border-white/60 rounded-sm p-2" />
            </fieldset>

            <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">{t("password")}</legend>
                    <input type={pass_type} value={password} onChange={(e) => {SET_password(e.target.value)}} placeholder="xxxxxx" className="outline-none border-2 border-white/60 rounded-sm p-2" />
            </fieldset>
              <label className="label mt-2 px-2">
            <input type="checkbox" className="checkbox w-5 h-5"  onChange={(e) => {if(e.target.checked){SET_Pass_type("text")}else{SET_Pass_type("password")}}} />
               {t("show_password")}
            </label>
            <Link to={"/forget-password"}>
            <p className="w-full text-sm font-sans px-2 font-bold mt-1 text-red-800" >{t("forget_password_ques")}</p>
            </Link>
        <div className="w-full justify-center flex">
            <button className="btn bg-[#790000] border-[#790000] w-9/12 mt-4"
            onClick={() => {
                if(username === "" || password === ""){
                    dis(SET_dialog({isOpen : true , isSuccess : false , isFailed : true , body : t("empty") , title : "" , func : () => {}}))
                    return
                }
                useFetcher( "POST" , URL + "/auth/login" , {username , password} , {} , dis , (value : any) => {
                    dis(SET_USER_action(value.user_info))
                    dis(SET_token_action(value.token))
                      dis(SET_dialog({isOpen : true , isSuccess : true , isFailed : false , body : t(`msg_${value.msg_code}`) , title : t("success"), func : () => {
                        useFetcher("GET" , URL + "/users/get-my-setting" , {} , {headers : {token : value.token}} , dis , (x : any) => {
                            localStorage.setItem("i18nextLng" , x.lang)
                            localStorage.setItem("theme" , x.theme)
                            window.location.href = "/"
                        } , t)


                      }}))
                } , t)
            }}
            >{t("login_btn")}</button>
            </div>
        <Link to={"/register"}>
            <p className="w-full text-sm font-sans text-center px-2 font-bold mt-3 text-red-800" >{t("new_account_ques")}</p>
            </Link>
            </div>
        </div>
    )
}