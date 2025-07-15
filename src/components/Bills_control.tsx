import type { TFunction } from "i18next"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import type { ValueType } from "../redux/reducers/Main_reducer"
import useFetcher from "../hooks/useFetcher"
import { SET_dialog } from "../redux/Types"
import i18n from "../i18next"
import { useEffect, useState } from "react"

export default function Bills_control({selected_Wallet , bill_id} : {selected_Wallet : string , bill_id : string}){

type Bill = {
    bill_id : number,
    procces_id : number,
    user_name : string,
    full_image_name : string

}


  const {t} : {t : TFunction<"translation" , undefined> , i18n : any} = useTranslation()
  const dis = useDispatch()
  const {token ,  URL , Theme}  : {token : string , URL : string , Theme : string} = useSelector((state : {Main : ValueType}) => state.Main)
  const [procces_id , SET_proccess_id] : [string  , any] = useState("default")
    const [img , SET_img] : [any | null , any] = useState(null)
    const [bills , SET_bills] : [[Bill] | null, any] = useState([{
    bill_id: 0,
    procces_id : 0,
    user_name: "",
    full_image_name: ""
  }])
const [selected_Bill , SET_selected_Bill] : [string , any] = useState("default")


    const [arr , SET_arr] : [[{
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

useEffect(()=>{
  if(selected_Wallet == "default"){return}
  useFetcher("GET" , URL + "/wallet/get-my-procceses?w_id=" + selected_Wallet , {} , {headers : {token : token}} , dis , (res : any) => {SET_arr(res)} , t)
} , [selected_Wallet])


useEffect(()=>{
  if(selected_Wallet == "default"){return}
useFetcher("GET" , URL + "/wallet/get-all-bills?w_id=" + selected_Wallet ,{} , {headers : {token :token}} , dis , (res : any)=>{SET_bills(res) ;console.log(res)} , t)

} , [selected_Wallet])

return(<>
          <dialog id="my_modal_6" className="modal modal-middle p-3" data-theme={Theme} dir={i18n.dir()}>
                    <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                         <h3 className="font-bold text-lg text-black dark:text-white">{t("enter_bill_data")}</h3>
                        <div className="w-full flex flex-col items-center" >
            <fieldset className="fieldset w-full mt-3">
                    <legend className="fieldset-legend">{t("proccess_id")}</legend>
                       <select value={procces_id}   className="select select-accent mt-1 text-black dark:text-white" onChange={(e) => {SET_proccess_id(e.target.value)}}>
               <option
                disabled
                value="default"
                className="text-black dark:text-white"
              >
                {t("select_proccess")}
              </option>
                           {arr.map((i , index)=>{
                            if(i.iscancelled != 1){
                                return <option value={i.procces_id} key={index}>{i.title} - {i.procces_id}</option>
                            }
                              })}
                    </select>

            </fieldset>
            <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">{t("bill_image")}</legend>
                    <input type="file" className="file-input" accept="image/*" data-theme={Theme} value={img != null ? img[0].filename : "" } onChange={(e) => {SET_img(e.target.files)}} />
      </fieldset>
            </div>
                        <div className="modal-action">
                            <button className="btn btn-lg btn-success" onClick={()=>{

                               const form = new FormData();
                              form.append('bill', img[0]);
                                    const modal = document.getElementById("my_modal_6")
                                    if(modal){(modal as HTMLDialogElement).close()}
                                    useFetcher("POST" , URL + `/wallet/upload-bill?w_id=${selected_Wallet}&procces_id=${procces_id}` , 
                                    form ,
                                     {headers : {token : token}} ,dis , (x)=>{
                                          dis(SET_dialog({isOpen : true , isSuccess : true , isFailed : false , body : t(`msg_${x.msg_code}`) , title : t("success"), func : () => {window.location.reload()}}))
                                     } , t)
                            }}>{t("save")}</button>
                        </div>
                     </div>
                </dialog>






           <dialog id="my_modal_7" className="modal modal-middle p-3" data-theme={Theme} dir={i18n.dir()}>
                    <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                         <h3 className="font-bold text-lg text-black dark:text-white">{t("del_bill")}</h3>
                        <div className="w-full flex flex-col items-center" >
            <fieldset className="fieldset w-full mt-3">
                    <legend className="fieldset-legend">{t("bill_id")}</legend>
            <select value={selected_Bill} className="select select-accent mt-1 text-black dark:text-white" onChange={(e) => {SET_selected_Bill(e.target.value)}}>
            <option
                disabled
                value="default"
                className="text-black dark:text-white"
              >
                {t("select_proccess")}
              </option>
                           {bills != null && bills.map((i , index)=>{
                            
                                return <option value={i.bill_id} key={index}>{i.bill_id}</option>
                            
                              })}
                    </select>
            </fieldset>
            </div>
                        <div className="modal-action">
                            <button className="btn btn-lg btn-error" onClick={()=>{
                                    const modal = document.getElementById("my_modal_4")
                                    if(modal){(modal as HTMLDialogElement).close()}
                                    useFetcher("DELETE" , URL + `/wallet/delete-bill?w_id=${selected_Wallet}&bill_id=${selected_Bill}` , 
                                    {} ,
                                     {headers : {token : token}} ,dis , (x)=>{
                                          dis(SET_dialog({isOpen : true , isSuccess : true , isFailed : false , body : t(`msg_${x.msg_code}`) , title : t("success"), func : () => {window.location.reload()}}))
                                     } , t)
                            }}>{t("confirm")}</button>
                        </div>
                     </div>
                </dialog>


  <dialog id="my_modal_8" className="modal modal-middle p-3" data-theme={Theme} dir={i18n.dir()}>
                    <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2 h-10 text-black dark:text-white" >✕</button>
                            </form>
                        <div className="w-full flex flex-col items-center h-72 overflow-y-scroll" >
                          <img src={URL + "/wallet/get-bill-image?w_id=" + selected_Wallet + "&bill_id=" + bill_id + "&token=" + token} className={"w-11/12 h-fit"}/>
            </div>
</div>
                </dialog>
                </>)



}