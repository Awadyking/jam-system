import { useDispatch, useSelector } from "react-redux"
import type { ValueType } from "../redux/reducers/Main_reducer"
import { useTranslation } from "react-i18next"
import type { TFunction } from "i18next"
import i18n from "../i18next"
import { useEffect, useState } from "react"
import useFetcher from "../hooks/useFetcher"
import { SET_dialog } from "../redux/Types"
import { useNavigate } from "react-router-dom"

export default function Settings(){

  const {t} : {t : TFunction<"translation" , undefined> , i18n : any} = useTranslation()
  const dis = useDispatch()
  const nav = useNavigate()
  const {token , Theme , URL }  : {token : string , Theme : string , URL : string } = useSelector((state : {Main : ValueType}) => state.Main)

  const [c_theme , SET_c_theme] = useState(Theme)
  const [lang , SET_lang] = useState(i18n.language) 
  const [cur_pass , SET_cur_pass] = useState("")
  const [new_pass , SET_new_pass] = useState("")
  const [confirm_new_pass , SET_confirm_new_pass] = useState("")
  const [email, SET_email] = useState("");
  const [cur_email , SET_cur_email] = useState("")
  const [age, SET_age] = useState("");
  const [name, SET_name] = useState("");
  const [img , SET_img] : [any | null , any] = useState(null)


useEffect(()=>{
    useFetcher("GET" , URL + "/users/get-user-info" ,{} , {headers : {token :token}} , dis , (res : any)=>{
        SET_name(res.name)
        SET_age(res.user_age)
        SET_email(res.user_email)
        SET_cur_email(res.user_email)
    } , t)

},[])


    return <>
<div className="tabs tabs-lift tabs-xl mt-10 lg:w-9/12" data-theme={Theme} dir={i18n.dir()}>
  <label className="tab">
    <input type="radio" name="my_tabs_4" defaultChecked/>
    {Theme == "light" && <svg width="20px" height="20px" viewBox="0 0 24 24" className="mr-1" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z" fill="#1C274C"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C11.2954 1.25 10.6519 1.44359 9.94858 1.77037C9.26808 2.08656 8.48039 2.55304 7.49457 3.13685L6.74148 3.58283C5.75533 4.16682 4.96771 4.63324 4.36076 5.07944C3.73315 5.54083 3.25177 6.01311 2.90334 6.63212C2.55548 7.25014 2.39841 7.91095 2.32306 8.69506C2.24999 9.45539 2.24999 10.3865 2.25 11.556V12.444C2.24999 13.6135 2.24999 14.5446 2.32306 15.3049C2.39841 16.0891 2.55548 16.7499 2.90334 17.3679C3.25177 17.9869 3.73315 18.4592 4.36076 18.9206C4.96771 19.3668 5.75533 19.8332 6.74148 20.4172L7.4946 20.8632C8.48038 21.447 9.2681 21.9135 9.94858 22.2296C10.6519 22.5564 11.2954 22.75 12 22.75C12.7046 22.75 13.3481 22.5564 14.0514 22.2296C14.7319 21.9134 15.5196 21.447 16.5054 20.8632L17.2585 20.4172C18.2446 19.8332 19.0323 19.3668 19.6392 18.9206C20.2669 18.4592 20.7482 17.9869 21.0967 17.3679C21.4445 16.7499 21.6016 16.0891 21.6769 15.3049C21.75 14.5446 21.75 13.6135 21.75 12.4441V11.556C21.75 10.3866 21.75 9.45538 21.6769 8.69506C21.6016 7.91095 21.4445 7.25014 21.0967 6.63212C20.7482 6.01311 20.2669 5.54083 19.6392 5.07944C19.0323 4.63324 18.2447 4.16683 17.2585 3.58285L16.5054 3.13685C15.5196 2.55303 14.7319 2.08656 14.0514 1.77037C13.3481 1.44359 12.7046 1.25 12 1.25ZM8.22524 4.44744C9.25238 3.83917 9.97606 3.41161 10.5807 3.13069C11.1702 2.85676 11.5907 2.75 12 2.75C12.4093 2.75 12.8298 2.85676 13.4193 3.13069C14.0239 3.41161 14.7476 3.83917 15.7748 4.44744L16.4609 4.85379C17.4879 5.46197 18.2109 5.89115 18.7508 6.288C19.2767 6.67467 19.581 6.99746 19.7895 7.36788C19.9986 7.73929 20.1199 8.1739 20.1838 8.83855C20.2492 9.51884 20.25 10.378 20.25 11.5937V12.4063C20.25 13.622 20.2492 14.4812 20.1838 15.1614C20.1199 15.8261 19.9986 16.2607 19.7895 16.6321C19.581 17.0025 19.2767 17.3253 18.7508 17.712C18.2109 18.1089 17.4879 18.538 16.4609 19.1462L15.7748 19.5526C14.7476 20.1608 14.0239 20.5884 13.4193 20.8693C12.8298 21.1432 12.4093 21.25 12 21.25C11.5907 21.25 11.1702 21.1432 10.5807 20.8693C9.97606 20.5884 9.25238 20.1608 8.22524 19.5526L7.53909 19.1462C6.5121 18.538 5.78906 18.1089 5.24923 17.712C4.72326 17.3253 4.419 17.0025 4.2105 16.6321C4.00145 16.2607 3.88005 15.8261 3.81618 15.1614C3.7508 14.4812 3.75 13.622 3.75 12.4063V11.5937C3.75 10.378 3.7508 9.51884 3.81618 8.83855C3.88005 8.1739 4.00145 7.73929 4.2105 7.36788C4.419 6.99746 4.72326 6.67467 5.24923 6.288C5.78906 5.89115 6.5121 5.46197 7.53909 4.85379L8.22524 4.44744Z" fill="#1C274C"></path> </g></svg> }
    {Theme == "dark" && <svg width="20px" height="20px" viewBox="0 0 24 24" className="mr-1" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z" fill="#ffffff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C11.2954 1.25 10.6519 1.44359 9.94858 1.77037C9.26808 2.08656 8.48039 2.55304 7.49457 3.13685L6.74148 3.58283C5.75533 4.16682 4.96771 4.63324 4.36076 5.07944C3.73315 5.54083 3.25177 6.01311 2.90334 6.63212C2.55548 7.25014 2.39841 7.91095 2.32306 8.69506C2.24999 9.45539 2.24999 10.3865 2.25 11.556V12.444C2.24999 13.6135 2.24999 14.5446 2.32306 15.3049C2.39841 16.0891 2.55548 16.7499 2.90334 17.3679C3.25177 17.9869 3.73315 18.4592 4.36076 18.9206C4.96771 19.3668 5.75533 19.8332 6.74148 20.4172L7.4946 20.8632C8.48038 21.447 9.2681 21.9135 9.94858 22.2296C10.6519 22.5564 11.2954 22.75 12 22.75C12.7046 22.75 13.3481 22.5564 14.0514 22.2296C14.7319 21.9134 15.5196 21.447 16.5054 20.8632L17.2585 20.4172C18.2446 19.8332 19.0323 19.3668 19.6392 18.9206C20.2669 18.4592 20.7482 17.9869 21.0967 17.3679C21.4445 16.7499 21.6016 16.0891 21.6769 15.3049C21.75 14.5446 21.75 13.6135 21.75 12.4441V11.556C21.75 10.3866 21.75 9.45538 21.6769 8.69506C21.6016 7.91095 21.4445 7.25014 21.0967 6.63212C20.7482 6.01311 20.2669 5.54083 19.6392 5.07944C19.0323 4.63324 18.2447 4.16683 17.2585 3.58285L16.5054 3.13685C15.5196 2.55303 14.7319 2.08656 14.0514 1.77037C13.3481 1.44359 12.7046 1.25 12 1.25ZM8.22524 4.44744C9.25238 3.83917 9.97606 3.41161 10.5807 3.13069C11.1702 2.85676 11.5907 2.75 12 2.75C12.4093 2.75 12.8298 2.85676 13.4193 3.13069C14.0239 3.41161 14.7476 3.83917 15.7748 4.44744L16.4609 4.85379C17.4879 5.46197 18.2109 5.89115 18.7508 6.288C19.2767 6.67467 19.581 6.99746 19.7895 7.36788C19.9986 7.73929 20.1199 8.1739 20.1838 8.83855C20.2492 9.51884 20.25 10.378 20.25 11.5937V12.4063C20.25 13.622 20.2492 14.4812 20.1838 15.1614C20.1199 15.8261 19.9986 16.2607 19.7895 16.6321C19.581 17.0025 19.2767 17.3253 18.7508 17.712C18.2109 18.1089 17.4879 18.538 16.4609 19.1462L15.7748 19.5526C14.7476 20.1608 14.0239 20.5884 13.4193 20.8693C12.8298 21.1432 12.4093 21.25 12 21.25C11.5907 21.25 11.1702 21.1432 10.5807 20.8693C9.97606 20.5884 9.25238 20.1608 8.22524 19.5526L7.53909 19.1462C6.5121 18.538 5.78906 18.1089 5.24923 17.712C4.72326 17.3253 4.419 17.0025 4.2105 16.6321C4.00145 16.2607 3.88005 15.8261 3.81618 15.1614C3.7508 14.4812 3.75 13.622 3.75 12.4063V11.5937C3.75 10.378 3.7508 9.51884 3.81618 8.83855C3.88005 8.1739 4.00145 7.73929 4.2105 7.36788C4.419 6.99746 4.72326 6.67467 5.24923 6.288C5.78906 5.89115 6.5121 5.46197 7.53909 4.85379L8.22524 4.44744Z" fill="#ffffff"></path> </g></svg>}
    {t("general")}
  </label>
  <div className="tab-content bg-base-100 border-base-300 p-6">
    <div className="w-full flex flex-col justify-center" >
      <div className="flex w-11/12 items-center">
      <label>{t("theme")} :</label>
    <select defaultValue={c_theme} className="select select-accent mr-7 ml-8" onChange={(e)=>{SET_c_theme(e.target.value)}}>
  <option value="light">{t("light")}</option>
  <option value="dark">{t("dark")}</option>
</select>
</div>
      <div className="flex w-11/12 items-center">
      <label>{t("lang")} :</label>
    <select defaultValue={lang} className="select select-accent mr-12 ml-3 mt-3" onChange={(e)=>{SET_lang(e.target.value)}}>
  <option value="ar">{t("ar")}</option>
  <option value="en">{t("en")}</option>
  <option value="fr">{t("fr")}</option>
  <option value="es">{t("es")}</option>
  <option value="de">{t("de")}</option>
</select>
</div>
<div className="flex w-full justify-center">
<button className="btn btn-info mt-4 w-5/12"
onClick={()=>{
useFetcher("PUT" , URL + "/users/edit-setting" , {lang : lang , theme : c_theme} , {headers : {token : token}} , dis , (x) => {
  dis(SET_dialog({isOpen : true , isSuccess : true , isFailed : false , body : t(`msg_${x.msg_code}`) , title : t("success"), func : () => {
                localStorage.setItem("i18nextLng" , lang)
                localStorage.setItem("theme" , c_theme)
                window.location.reload()           
              }}))
} , t)
}}
>{t("save")}</button>
</div>
</div>
  </div>

  <label className="tab">
    <input type="radio" name="my_tabs_4"  />
  
    {Theme == "light" &&  <svg width="20px" height="20px" className="mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" stroke="#1C274C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg> }
    {Theme == "dark" && <svg width="20px" className="mr-1" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>}
    {t("security")}
  </label>
  <div className="tab-content bg-base-100 border-base-300 p-6">
    <p className="w-full text-2xl text-center dark:text-white text-black">{t("change_pass")}</p>
        <div className="w-full flex flex-col  justify-center" >
                 <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">{t("cur_pass")}</legend>
                    <input type="text" placeholder="xxxxxxxxxxxxx" className="input outline-none" value={cur_pass} onChange={(e) => {SET_cur_pass(e.target.value)}}/>
            </fieldset>
            <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">{t("new_pass")}</legend>
                    <input type="text" placeholder="xxxxxxxxxxxxx" className="input outline-none" value={new_pass} onChange={(e) => {SET_new_pass(e.target.value)}}/>
            </fieldset>
            <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">{t("confirm_new_pass")}</legend>
                    <input type="text" placeholder="xxxxxxxxxxxxx" className="input outline-none" value={confirm_new_pass} onChange={(e) => {SET_confirm_new_pass(e.target.value)}} />
            </fieldset>
<div className="flex w-full justify-center">
<button className="btn btn-info mt-4 w-5/12"
onClick={()=>{
  if(confirm_new_pass != new_pass){
      dis(SET_dialog({isOpen : true , isSuccess : false , isFailed : true , body : t("password_not_match") , title : "" , func : () => {}}))
      return
  }
useFetcher("PUT" , URL + "/users/update-user-password" , {current_password : cur_pass , new_password : new_pass} , {headers : {token : token}} , dis , (x : {msg_code : string}) => {
  dis(SET_dialog({isOpen : true , isSuccess : true , isFailed : false , body : t(`msg_${x.msg_code}`) , title : t("success"), func : () => {nav("/")}}))
} , t)

}}
>{t("save")}</button>
</div>
      </div>
  </div>

  <label className="tab">
    <input type="radio" name="my_tabs_4" />
    {Theme == "light" && <svg width="20px" height="20px" className="mr-1" viewBox="-2 -2 24.00 24.00" version="1.1" xmlns="http://www.w3.org/2000/svg"  fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>profile_round [#1C274C1342]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke-width="0.0002" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -2159.000000)" fill="#1C274C"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M100.562548,2016.99998 L87.4381713,2016.99998 C86.7317804,2016.99998 86.2101535,2016.30298 86.4765813,2015.66198 C87.7127655,2012.69798 90.6169306,2010.99998 93.9998492,2010.99998 C97.3837885,2010.99998 100.287954,2012.69798 101.524138,2015.66198 C101.790566,2016.30298 101.268939,2016.99998 100.562548,2016.99998 M89.9166645,2004.99998 C89.9166645,2002.79398 91.7489936,2000.99998 93.9998492,2000.99998 C96.2517256,2000.99998 98.0830339,2002.79398 98.0830339,2004.99998 C98.0830339,2007.20598 96.2517256,2008.99998 93.9998492,2008.99998 C91.7489936,2008.99998 89.9166645,2007.20598 89.9166645,2004.99998 M103.955674,2016.63598 C103.213556,2013.27698 100.892265,2010.79798 97.837022,2009.67298 C99.4560048,2008.39598 100.400241,2006.33098 100.053171,2004.06998 C99.6509769,2001.44698 97.4235996,1999.34798 94.7348224,1999.04198 C91.0232075,1998.61898 87.8750721,2001.44898 87.8750721,2004.99998 C87.8750721,2006.88998 88.7692896,2008.57398 90.1636971,2009.67298 C87.1074334,2010.79798 84.7871636,2013.27698 84.044024,2016.63598 C83.7745338,2017.85698 84.7789973,2018.99998 86.0539717,2018.99998 L101.945727,2018.99998 C103.221722,2018.99998 104.226185,2017.85698 103.955674,2016.63598" id="profile_round-[#1C274C1342]"> </path> </g> </g> </g> </g></svg>}
    {Theme == "dark" && <svg width="20px" height="20px" className="mr-1" viewBox="-2 -2 24.00 24.00" version="1.1" xmlns="http://www.w3.org/2000/svg"  fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>profile_round [#ffffff1342]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke-width="0.0002" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -2159.000000)" fill="#ffffff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M100.562548,2016.99998 L87.4381713,2016.99998 C86.7317804,2016.99998 86.2101535,2016.30298 86.4765813,2015.66198 C87.7127655,2012.69798 90.6169306,2010.99998 93.9998492,2010.99998 C97.3837885,2010.99998 100.287954,2012.69798 101.524138,2015.66198 C101.790566,2016.30298 101.268939,2016.99998 100.562548,2016.99998 M89.9166645,2004.99998 C89.9166645,2002.79398 91.7489936,2000.99998 93.9998492,2000.99998 C96.2517256,2000.99998 98.0830339,2002.79398 98.0830339,2004.99998 C98.0830339,2007.20598 96.2517256,2008.99998 93.9998492,2008.99998 C91.7489936,2008.99998 89.9166645,2007.20598 89.9166645,2004.99998 M103.955674,2016.63598 C103.213556,2013.27698 100.892265,2010.79798 97.837022,2009.67298 C99.4560048,2008.39598 100.400241,2006.33098 100.053171,2004.06998 C99.6509769,2001.44698 97.4235996,1999.34798 94.7348224,1999.04198 C91.0232075,1998.61898 87.8750721,2001.44898 87.8750721,2004.99998 C87.8750721,2006.88998 88.7692896,2008.57398 90.1636971,2009.67298 C87.1074334,2010.79798 84.7871636,2013.27698 84.044024,2016.63598 C83.7745338,2017.85698 84.7789973,2018.99998 86.0539717,2018.99998 L101.945727,2018.99998 C103.221722,2018.99998 104.226185,2017.85698 103.955674,2016.63598" id="profile_round-[#ffffff1342]"> </path> </g> </g> </g> </g></svg>}
    {t("my_profile")}
  </label>
  <div className="tab-content bg-base-100 border-base-300 p-6">
    <div className="w-full flex flex-col  justify-center" >
         <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">{t("profile_img")} - ({t("optional")})</legend>
                    <input type="file" className="file-input" value={img != null ? img[0].filename : "" } onChange={(e) => {SET_img(e.target.files)}} />
      </fieldset>
                  <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">{t("name")}</legend>
                    <input type="text" placeholder="xxxxxxxxx" className="input outline-none" value={name} onChange={(e) => {SET_name(e.target.value)}}/>
            </fieldset>
            <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">{t("age")}</legend>
                    <input type="number" placeholder="xx" className="input outline-none" value={age} onChange={(e) => {SET_age(e.target.value)}}/>
            </fieldset>
                        <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">{t("email")}</legend>
                    <input type="email" placeholder="xxxxx@xx.com" className="input outline-none" value={email} onChange={(e) => {SET_email(e.target.value)}}/>
            </fieldset>
            <div className="flex w-full justify-center">
<button className="btn btn-info mt-4 w-5/12"
onClick={()=>{
if(img !=  null){
  const form = new FormData();
form.append('new_image', img[0]);
useFetcher("POST" , URL + "/users/change-profile-image" , form , {headers : {token : token}} , dis , (x  : {msg_code : string}) => {
  dis(SET_dialog({isOpen : true , isSuccess : true , isFailed : false , body : t(`msg_${x.msg_code}`) , title : t("success"), func : () => {

if( name === "" || email === "" || age === ""){
  dis(SET_dialog({isOpen : true , isSuccess : false , isFailed : true , body : t("empty") , title : "" , func : () => {}}))
      return
       }
useFetcher("PUT" , URL + "/users/update-user-info" , {email : email == cur_email ? "" : email , name : name , age : Number(age)} , {headers : {token : token}} , dis , (x : {msg_code : string}) => {
  dis(SET_dialog({isOpen : true , isSuccess : true , isFailed : false , body : t(`msg_${x.msg_code}`) , title : t("success"), func : () => {nav("/")}}))
} , t)

  }}))
} , t)
}else{
  if( name === "" || email === "" || age === ""){
  dis(SET_dialog({isOpen : true , isSuccess : false , isFailed : true , body : t("empty") , title : "" , func : () => {}}))
      return
       }
useFetcher("PUT" , URL + "/users/update-user-info" , {email : email == cur_email ? "" : email , name : name , age : Number(age)} , {headers : {token : token}} , dis , (x : {msg_code : string}) => {
  dis(SET_dialog({isOpen : true , isSuccess : true , isFailed : false , body : t(`msg_${x.msg_code}`) , title : t("success"), func : () => {nav("/")}}))
} , t)
}



}}
>{t("save")}</button>
</div>
    </div>
  </div>
</div>
    </>
}