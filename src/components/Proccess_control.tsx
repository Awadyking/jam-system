import type { TFunction } from "i18next"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import type { ValueType } from "../redux/reducers/Main_reducer"
import useFetcher from "../hooks/useFetcher"
import { SET_dialog } from "../redux/Types"
import { useNavigate } from "react-router-dom"
import i18n from "../i18next"
import { useState } from "react"

export default function Proccess_control({selected_Wallet } : {selected_Wallet : string}){


  const {t} : {t : TFunction<"translation" , undefined> , i18n : any} = useTranslation()
  const dis = useDispatch()
  const nav = useNavigate()
  const {token ,  URL , Theme}  : {token : string , URL : string , Theme : string} = useSelector((state : {Main : ValueType}) => state.Main)
  const [amount , SET_amount] : [string  , any] = useState("")
  const [title , SET_title] : [string  , any] = useState("")
  const [type , SET_type] : [string  , any] = useState("Adding")
  const [category , SET_category] : [string  , any] = useState("candy")
  const [t_category , SET_t_category] : [string  , any] = useState("")
  const [selected_cancel_wallet , SET_selected_cancel_wallet] : [string  , any] = useState("default")
  const [cancel_arr , SET_cancel_arr] : [[{
    procces_id: number,
    user_name: string,
    amount: number,
    type: string,
    title: string,
    category: string,
    date: number,
    iscancelled : number 
  }] , any] = useState([{
    procces_id: 0,
    user_name: "",
    amount: 0,
    type: "Adding",
    title: "string",
    category: "string",
    date: 0,
    iscancelled: 0
  }])



if(selected_Wallet != "default"){
return <> 
<div className="flex w-7/12 flex-wrap mt-6 mb-10 justify-evenly" dir={i18n.dir()}>
<button className="btn btn-dash btn-primary" onClick={()=>{
const modal = document.getElementById("my_modal_3")
    if(modal){
        (modal as HTMLDialogElement).showModal()
    }
}}> + {t("new_proccess")}</button>
<button className="btn btn-dash btn-error"
 onClick={()=>{

useFetcher("GET" , URL + "/wallet/get-my-procceses?w_id=" + selected_Wallet , {} , {headers : {token : token}} , dis , (res : any) => {

   SET_cancel_arr(res)
const modal = document.getElementById("my_modal_4")
    if(modal){
        (modal as HTMLDialogElement).showModal()
    }

} , t)

 }}> × {t("cancel_proccess")}</button>
</div>    

           <dialog id="my_modal_3" className="modal modal-middle p-3" data-theme={Theme} dir={i18n.dir()}>
                    <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                         <h3 className="font-bold text-lg text-black dark:text-white">{t("enter_proccess_data")}</h3>
                        <div className="w-full flex flex-col items-center" >
<fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">{t("proccess_title")}</legend>
                    <input type="text" placeholder="xxxxxxxxx" className="input outline-none text-black mt-2 dark:text-white" value={title}  onChange={(e) => {SET_title(e.target.value)}}/>
            </fieldset>

            <fieldset className="fieldset w-full mt-3">
                    <legend className="fieldset-legend">{t("proccess_type")}</legend>
                       <select value={type} className="select select-accent mt-1 text-black dark:text-white" onChange={(e) => {SET_type(e.target.value)}}>
                            <option value="Adding">{t("adding")}</option>
                            <option value="Discount">{t("discount")}</option>
                    </select>
            </fieldset>
            <fieldset className="fieldset w-full mt-3">
                    <legend className="fieldset-legend">{t("category")}</legend>
                       <select value={category}  className="select select-accent mt-1 text-black dark:text-white" onChange={(e) => {SET_category(e.target.value)}}>
                           {["candy" , "food" , "repairs" , "projects" ,
                             "subscriptions" , "bills" , "donations" , "gifts" ,
                              "salaries" , "development" , "equipment" , "transportation" , "other"].map((i , index)=>{
                                return <option value={i} key={index}>{t(`category_${i}`)}</option>
                              })}
                    </select>
                    {category == "other" && <input type="text" placeholder="xxxxxxxxx" className="input outline-none text-black mt-3 dark:text-white" value={t_category} onChange={(e) => {SET_t_category(e.target.value)}}/>}
            </fieldset>


<fieldset className="fieldset w-full mt-3">
                    <legend className="fieldset-legend">{t("amount")}</legend>
                    <input type="number" placeholder="xxxxxxxxx" className="input outline-none text-black mt-1 dark:text-white" value={amount} onChange={(e) => {SET_amount(e.target.value)}}/>
            </fieldset>
            </div>
                        <div className="modal-action">
                            <button className="btn btn-lg btn-success" onClick={()=>{
                                    const modal = document.getElementById("my_modal_3")
                                    if(modal){(modal as HTMLDialogElement).close()}
                                    useFetcher("POST" , URL + "/wallet/create-payment-procces" , 
                                    {
                                        amount : Number(amount) ,
                                        title : title ,
                                        type : type , 
                                        category : category == "other" ? t_category : category ,
                                        w_id : selected_Wallet
                                    } ,
                                     {headers : {token : token}} ,dis , (x)=>{
                                          dis(SET_dialog({isOpen : true , isSuccess : true , isFailed : false , body : t(`msg_${x.msg_code}`) , title : t("success"), func : () => {window.location.reload()}}))
                                     } , t)
                            }}>{t("save")}</button>
                        </div>
                     </div>
                </dialog>
           <dialog id="my_modal_4" className="modal modal-middle p-3" data-theme={Theme} dir={i18n.dir()}>
                    <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                         <h3 className="font-bold text-lg text-black dark:text-white">{t("cancel_proccess")}</h3>
                        <div className="w-full flex flex-col items-center" >
            <fieldset className="fieldset w-full mt-3">
                    <legend className="fieldset-legend">{t("proccess_title")}</legend>
                       <select value={selected_cancel_wallet}  className="select select-accent mt-1 text-black dark:text-white" onChange={(e) => {SET_selected_cancel_wallet(e.target.value)}}>
            <option
                disabled
                value="default"
                className="text-black dark:text-white"
              >
                {t("select_proccess")}
              </option>
                           {cancel_arr.map((i , index)=>{
                            if(i.iscancelled != 1){
                                return <option value={i.procces_id} key={index}>{i.title} - {i.procces_id}</option>
                            }
                              })}
                    </select>
            </fieldset>
            </div>
                        <div className="modal-action">
                            <button className="btn btn-lg btn-error" onClick={()=>{
                                    const modal = document.getElementById("my_modal_4")
                                    if(modal){(modal as HTMLDialogElement).close()}
                                    useFetcher("PUT" , URL + "/wallet/cancel-procces?procces_id=" + selected_cancel_wallet , 
                                    {} ,
                                     {headers : {token : token}} ,dis , (x)=>{
                                          dis(SET_dialog({isOpen : true , isSuccess : true , isFailed : false , body : t(`msg_${x.msg_code}`) , title : t("success"), func : () => {window.location.reload()}}))
                                     } , t)
                            }}>{t("confirm")}</button>
                        </div>
                     </div>
                </dialog>


                </>

}else{
    return <></>
}



}