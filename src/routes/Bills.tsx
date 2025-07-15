import type { TFunction } from "i18next"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import type { ValueType } from "../redux/reducers/Main_reducer"
import i18n from "../i18next"
import { useEffect, useState } from "react"
import useFetcher from "../hooks/useFetcher"
import Bills_control from "../components/Bills_control"

export default function Bills() {


type Bill = {
    bill_id : number,
    procces_id : number,
    user_name : string,
    full_image_name : string

}


    
      const {t} : {t : TFunction<"translation" , undefined> , i18n : any} = useTranslation()
      const dis = useDispatch()
      const {token ,  URL , Theme}  : {token : string , URL : string , Theme : string} = useSelector((state : {Main : ValueType}) => state.Main)
      const [selected_Wallet , SET_selected_Wallet] : [string , any] = useState("default")
      const [selected_img , SET_selected_img] : [string , any] = useState("")
      const [bills , SET_bills] : [[Bill] | null , any] = useState([{
    bill_id: 0,
    procces_id : 0,
    user_name: "",
    full_image_name: ""
  }])
      const [wallets , SET_wallets] : [[{w_id : string , w_name : string , amount : number}] , any] = useState([{
    w_id : "",
    w_name : "",
    amount : 0
  }])


    useEffect(()=>{
        useFetcher("GET" , URL + "/wallet/get-my-wallets" ,{} , {headers : {token :token}} , dis , (res : any)=>{SET_wallets(res)} , t)
    },[])

useEffect(()=>{
  if(selected_Wallet == "default"){return}
useFetcher("GET" , URL + "/wallet/get-all-bills?w_id=" + selected_Wallet ,{} , {headers : {token :token}} , dis , (res : any)=>{SET_bills(res)} , t)

} , [selected_Wallet])


    return (
       <>
           <div className="w-11/12 h-16 border-b-2 dark:border-white border-gray-800 mt-5 flex items-center" dir={i18n.dir()}>
            <div className="flex lg:w-3/12 w-8/12 " data-theme={Theme}>
            <legend className="fieldset-legend">{t("wallet_name")} : </legend>
            <select
              defaultValue={selected_Wallet}
              className="select select-error mr-3 ml-3 w-5/12 text-black dark:text-white"
              onChange={(e) => {
                SET_selected_Wallet(e.target.value);
              }}
            >
              <option
                disabled
                value="default"
                className="text-black dark:text-white"
              >
                {t("select_wallet")}
              </option>
              {wallets.map((i, index) => {
                return (
                  <option
                    className="text-black dark:text-white"
                    key={index}
                    value={i.w_id}
                  >
                    {i.w_name}
                  </option>
                );
              })}
            </select>
          </div>
           <button className="btn btn-outline btn-accent rounded-full"
           disabled={selected_Wallet === "default"}
           onClick={()=>{
const modal = document.getElementById("my_modal_6")
    if(modal){
        (modal as HTMLDialogElement).showModal()
    }
           }}>+ {t("new_bill")}</button>
<button className="btn btn-outline btn-error ml-3 mr-3 rounded-full"
           disabled={selected_Wallet === "default" || bills == null}
           onClick={()=>{
const modal = document.getElementById("my_modal_7")
    if(modal){
        (modal as HTMLDialogElement).showModal()
    }
           }}>× {t("del_bill")}</button>


           </div>
           {selected_Wallet != "default" && bills != null ? <>
              <table className="table text-black dark:text-white border-2 dark:border-white dark:bg-gray-800 mt-7 w-6/12 " >
              <thead className=" text-black dark:text-white text-center font-bold ">
                <tr>
                <th className="w-1/12 border-2 dark:border-white">#</th>
                <th className="w-3/12 border-2 dark:border-white">{t("bill_id")}</th>
                <th className="w-3/12 border-2 dark:border-white">{t("proccess_id")}</th>
                <th className="w-3/12 border-2 dark:border-white">{t("creator_name")}</th>
                <th className="w-2/12 border-2 dark:border-white">{t("bill_image")}</th>
                </tr>
              </thead>
           <tbody>
           {

            bills.map((i , index) => {
              return (
                <tr key={index} className="text-black dark:text-white text-center">
                <th className="w-1/12 border-2 dark:border-white">{index + 1}</th>
                <td className="w-3/12 border-2 dark:border-white">{i.bill_id}</td>
                <td className="w-3/12 border-2 dark:border-white">{i.procces_id}</td>
                <td className="w-3/12 border-2 dark:border-white">{i.user_name}</td>
                <td className="w-2/12 border-2 dark:border-white underline text-sky-700 cursor-pointer border-black" onClick={()=>{
                  SET_selected_img(i.bill_id)
                  const modal = document.getElementById("my_modal_8")
    if(modal){
        (modal as HTMLDialogElement).showModal()
    }
                }}>{t("show_image")}</td>
                </tr>
              )
            })
           }
           </tbody>

            </table>
            </> : <>
            <div className="w-full h-full flex justify-center items-center mt-5">
      <p className="text-black dark:text-white font-bold text-2xl m-0">{t("no_bills")} !</p>
    </div>
            </>
       }    

    <Bills_control selected_Wallet={selected_Wallet} bill_id={selected_img}/>
       
         </>
    )
}