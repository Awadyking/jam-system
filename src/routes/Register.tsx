import type { TFunction } from "i18next"
import { useTranslation } from "react-i18next"
import i18n from "../i18next"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useFetcher from "../hooks/useFetcher"
import { useDispatch, useSelector } from "react-redux"
import type { ValueType } from "../redux/reducers/Main_reducer"
import { SET_dialog } from "../redux/Types"


export default function Register() {
      const {t} : {t : TFunction<"translation" , undefined>} = useTranslation()
      const dis = useDispatch()
      const nav = useNavigate()
      const {URL}  : {URL : string} = useSelector((state : {Main : ValueType}) => state.Main)
      const [pass_type , SET_Pass_type]  : [string , any] = useState("password")
      const [username , SET_username] : [string , any] = useState("")
      const [password , SET_password] : [string , any] = useState("")
      const [confirm_password , SET_confirm_password] : [string , any] = useState("")
      const [name , SET_name] : [string , any] = useState("")
      const [email , SET_email] : [string , any] = useState("")
      const [age , SET_age] : [string , any] = useState("")
    return (
        <div className="flex flex-col items-center w-full " dir={i18n.dir()}>
            <img src="/img/auth_bg.jpeg" className="w-full h-screen lg:h-fit fixed z-10 top-10 right-0"/>
            <div className="h-fit w-9/12 lg:w-6/12 flex justify-evenly items-center flex-wrap bg-gray-100/50 rounded-2xl p-3 mt-20 z-20 ">
            <p className="w-full text-center text-xl font-bold text-white">{t("register_title")}</p>
            <fieldset className="fieldset w-full lg:w-5/12">
                    <legend className="fieldset-legend">{t("name")}</legend>
                    <input type="text" value={name} onChange={(e) => {SET_name(e.target.value)}} placeholder="xxxxxx" className="outline-none border-2 border-white/60 rounded-sm p-2" />
            </fieldset>
                        <fieldset className="fieldset w-full lg:w-5/12">
                    <legend className="fieldset-legend">{t("email")}</legend>
                    <input type="text" value={email} onChange={(e) => {SET_email(e.target.value)}} placeholder="xxxxxx@xxx.com" className="outline-none border-2 border-white/60 rounded-sm p-2" />
            </fieldset>
            <fieldset className="fieldset w-full lg:w-5/12">
                    <legend className="fieldset-legend">{t("username")}</legend>
                    <input type="text" value={username} onChange={(e) => {SET_username(e.target.value)}} placeholder="xxxxxx" className="outline-none border-2 border-white/60 rounded-sm p-2" />
            </fieldset>

            <fieldset className="fieldset w-full lg:w-5/12">
                    <legend className="fieldset-legend">{t("age")}</legend>
                    <input type="number" value={age} onChange={(e) => {SET_age(e.target.value)}} placeholder="xx" max={99} min={2} className="outline-none border-2 border-white/60 rounded-sm p-2" />
            </fieldset>
            <fieldset className="fieldset w-full lg:w-5/12">
                    <legend className="fieldset-legend">{t("password")}</legend>
                    <input type={pass_type} value={password} onChange={(e) => {SET_password(e.target.value)}} placeholder="xxxxxx" className="outline-none border-2 border-white/60 rounded-sm p-2" />
            </fieldset>
            <fieldset className="fieldset w-full lg:w-5/12">
                    <legend className="fieldset-legend">{t("confirm_password")}</legend>
                    <input type={pass_type} value={confirm_password} onChange={(e) => {SET_confirm_password(e.target.value)}} placeholder="xxxxxx" className="outline-none border-2 border-white/60 rounded-sm p-2" />
            </fieldset>
            <label className="label mt-2 px-2">
            <input type="checkbox" className="checkbox w-5 h-5"  onChange={(e) => {if(e.target.checked){SET_Pass_type("text")}else{SET_Pass_type("password")}}} />
               {t("show_password")}
            </label>
        <div className=" justify-center flex w-full">
            <button className="btn bg-[#790000] border-[#790000] w-9/12 mt-4"
            onClick={() => {
                if(username === "" || password === "" || confirm_password === "" || name === "" || email === "" || age === ""){
                    dis(SET_dialog({isOpen : true , isSuccess : false , isFailed : true , body : t("empty") , title : "" , func : () => {}}))
                    return
                }
                if(password != confirm_password){
                    dis(SET_dialog({isOpen : true , isSuccess : false , isFailed : true , body : t("password_not_match") , title : "" , func : () => {}}))
                    return
                }
                useFetcher("POST" , URL + "/auth/register" , {username , password , name , email , age : Number(age)} , {} , dis , (value : {msg_code : number}) => {
                     dis(SET_dialog({isOpen : true , isSuccess : true , isFailed : false , body : t(`msg_${value.msg_code}`) , title : t("success"), func : () => {nav("/login")}}))
                } , t)

            }}
            >{t("register_btn")}</button>
            </div>
        <Link to={"/login"}>
            <p className="w-full text-sm font-sans text-center px-2 font-bold mt-3 text-red-800" >{t("have_account_ques")}</p>
            </Link>
            </div>
        </div>
    )
}