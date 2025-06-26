import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import type { ValueType } from "../redux/reducers/Main_reducer";
import { useEffect, useState } from "react";
import useFetcher from "../hooks/useFetcher";
import Field from "../components/Field";
import i18n from "../i18next";

export default function Profile(){

const {t} : {t : TFunction<"translation" , undefined>} = useTranslation()
const {token ,URL , Theme}  : { token : string , URL : string , Theme : string} = useSelector((state : {Main : ValueType}) => state.Main)
const [user , SET_user] : [{id : string , username : string , user_email : string , user_age : number , name : string , isBanned : 0 | 1 , join_date : string} , any] = 
useState({
  id: '',
  username: '',
  user_email: '',
  user_age: 0,
  name: '',
  isBanned: 0,
  join_date: '',
})
const [history , SET_history] : [[{ip_address : string , user_agent : string , date : string , time : string , port : number}] , any] = 
useState([{ip_address : "" , user_agent : "" , date : "" , time : "" , port : 0}])
const dis = useDispatch()

useEffect(()=>{
    useFetcher("GET" , URL + "/users/get-user-info" ,{} , {headers : {token :token}} , dis , (res : any)=>{
        SET_user(res)
        useFetcher("GET" , URL + "/users/get-user-login-history" ,{} , {headers : {token :token}} , dis , (s : {data : any})=>{SET_history(s.data)} , t)
    } , t)

},[])
 
 const Fields = [
        {
            label : t("name") , 
            place : "" , 
            value : user.name , 
            type : "text" , 
            bcolor : "#47de7e" ,
            focus : false,
            disabled : true , 
            setValue : () => {}
        } ,
                {
            label : t("username") , 
            place : "" , 
            value : user.username , 
            type : "text" , 
            bcolor : "#47de7e" ,
            focus : false,
            disabled : true , 
            setValue : () => {}
        } ,
        {
            label : t("email") , 
            place : "" , 
            value : user.user_email , 
            type : "text" , 
            bcolor : "#47de7e" ,
            focus : false,
            disabled : true , 
            setValue : () => {}
        } ,
        {
            label : t("age") , 
            place : "" , 
            value : String(user.user_age) , 
            type : "text" , 
            bcolor : "#47de7e" ,
            focus : false,
            disabled : true , 
            setValue : () => {}
        } ,
        {
            label : t("join_date") , 
            place : "" , 
            value : user.join_date , 
            type : "text" , 
            bcolor : "#47de7e" ,
            focus : false,
            disabled : true , 
            setValue : () => {}
        }

]

return (<>
        <div className="flex items-center justify-evenly mt-12 lg:w-5/12  w-11/12">
            <img src="/img/proikjh" className="w-44 h-44 rounded-full"/>
            <p className="text-3xl font-bold text-gray-700 dark:text-white ">@{user.username}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 justify-center mt-12 lg:w-6/12 w-11/12" dir={i18n.dir()}>
{Fields.map((i , index)=>{return <Field
                    label={i.label} 
                    place={i.place} 
                    value={i.value}
                    setValue={i.setValue}
                    type={i.type} 
                    bcolor={i.bcolor}
                    focus={i.focus}
                    disabled={i.disabled}
                    key={index}
                    />})}
        </div>

<div tabIndex={0} className="collapse collapse-arrow bg-base-100 border-gray-800 border-2 w-10/12 hidden lg:grid mt-6 z-0" data-theme={Theme} dir={i18n.dir()}>
  <div className="collapse-title font-semibold">{t("login_history")}</div>
  <div className="collapse-content">
   <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
  <table className="table" data-theme={Theme}>
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>{t("ip")}</th>
        <th>{t("port")}</th>
        <th>{t("user_agent")}</th>
        <th>{t("date")}</th>
        <th>{t("time")}</th>
      </tr>
    </thead>
    <tbody>
      {history.map((i : {ip_address : string , user_agent : string , date : string , time : string , port : number} , index : number)=>(
    <tr>
        <th>{index + 1}</th>
        <td>{i.ip_address}</td>
        <td>{i.port}</td>
        <td>{i.user_agent}</td>
        <td>{i.date}</td> 
        <td>{i.time}</td>
      </tr>  
      ))}

    </tbody>
  </table>
</div>
  </div>
</div>
<button className="btn btn-dash btn-error mt-7 mb-14 w-36 h-10" onClick={() =>{localStorage.clear() ; window.location.reload()}}>{t("logout")}</button>
    </>);
}