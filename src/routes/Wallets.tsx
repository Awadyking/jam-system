import { useDispatch, useSelector } from "react-redux"
import type { ValueType } from "../redux/reducers/Main_reducer"
import { Link, useNavigate } from "react-router-dom"
import type { TFunction } from "i18next"
import { useTranslation } from "react-i18next"
import i18n from "../i18next"
import { useEffect, useState } from "react"
import useFetcher from "../hooks/useFetcher"
import { SET_dialog } from "../redux/Types"

export default function Wallets(){

  const {t} : {t : TFunction<"translation" , undefined> , i18n : any} = useTranslation()
  const dis = useDispatch()
  const nav = useNavigate()
  const {token ,  URL , Theme}  : {token : string , URL : string , Theme : string} = useSelector((state : {Main : ValueType}) => state.Main)
  const [wallet_name , SET_wallet_name] : [string , any] = useState("")
  const [wallet_type , SET_wallet_type] : [string , any] = useState("cash")
  const [wallet_bank , SET_wallet_bank] : [string , any] = useState("BM")
  const [wallet_currency , SET_wallet_currency] : [string , any] = useState("EGP")
  const [wallet_target , SET_wallet_target] : [string , any] = useState("0")
  const [wallets , SET_wallets] : [[{w_id : string , w_name : string , amount : number}] , any] = useState([{
    w_id : "",
    w_name : "",
    amount : 0
  }])

  

useEffect(()=>{
    useFetcher("GET" , URL + "/wallet/get-my-wallets" ,{} , {headers : {token :token}} , dis , (res : any)=>{SET_wallets(res)} , t)
},[])

    return <>
    <div className="w-11/12 h-14 border-b-2 dark:border-white border-gray-800 mt-5" dir={i18n.dir()}>
    <button className="btn btn-outline btn-accent rounded-full" onClick={()=>{
    const modal = document.getElementById("my_modal_2")
    if(modal){
        (modal as HTMLDialogElement).showModal()
    }
    }}>+ {t("new_wallet")}</button>
    </div>
    <div className="w-11/12 h-fit mt-5 flex flex-col items-center">
 <div  className="w-10/12 h-14 border-b-2 border-gray-800  flex items-center justify-evenly px-3 " dir={i18n.dir()}>

           <p className="text-lg font-bold text-black dark:text-white">{t("wallet_name")}</p>
           <p className="text-lg font-bold text-black dark:text-white w-7/12 text-center">{t("wallet_id")}</p>
            <p className="text-lg font-bold text-black dark:text-white">{t("amount")}</p>
    </div>

    {wallets.map((wallet , index) => {
        return <div key={index} className="w-10/12 h-14 border-2 mt-5 border-gray-400 flex items-center justify-evenly px-3 rounded-xl" dir={i18n.dir()}>
           <Link to={`/wallet/${wallet.w_id}`}>
           <p className="text-lg font-bold text-teal-600 underline ">{wallet.w_name}</p>
           </Link>
           <p className="text-lg font-bold text-black dark:text-white w-9/12 text-center">{wallet.w_id}</p>
            <p className="text-lg font-bold text-black dark:text-white ">{wallet.amount}</p>
            </div>
            
    })}
    
    
    
    
    
    
    
    
    
    </div>
                <dialog id="my_modal_2" className="modal modal-middle" data-theme={Theme} dir={i18n.dir()}>
                    <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                         <h3 className="font-bold text-lg text-black dark:text-white">{t("enter_wallet_data")}</h3>
                        <div className="w-full flex flex-col  justify-center" >
            <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">{t("wallet_type")}</legend>
                       <select defaultValue={wallet_type} className="select select-accent mt-3 text-black dark:text-white" onChange={(e) => {SET_wallet_type(e.target.value)}}>
                            <option value="cash">{t("cash")}</option>
                            <option value="card">{t("card")}</option>
                    </select>
            </fieldset>
{wallet_type === "card" ? <> <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">{t("bank")}</legend>
                    <select defaultValue={wallet_bank} className="select select-accent mt-3 text-black dark:text-white" onChange={(e) => {SET_wallet_bank(e.target.value)}}>
                            <option value="BM">{t("bm")}</option>
                            <option value="CIB">{t("cib")}</option>
                            <option value="BDC">{t("bdc")}</option>
                            <option value="NBE" >{t("nbe")}</option>
                            <option value="ALEX">{t("alex")}</option>
                            <option value="QNB">{t("qnb")}</option>
                            <option value="SUEZ">{t("suez")}</option>
                            <option value="HDB">{t("hdb")}</option>
                            <option value="EGY_POST">{t("egy_post")}</option>
                            <option value="MASH">{t("mash")}</option>
                            <option value="EG_BANK">{t("eg_bank")}</option>
                            <option value="PAYPAL">{t("paypal")}</option>
                            <option value="PAYONEER">{t("payoneer")}</option>
                            <option value="FAWRY">{t("fawry")}</option>
                    </select>
            </fieldset>
            <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">{t("card_last")}</legend>
                    <input type="text" maxLength={4} minLength={4} placeholder="xxxxxxxxx" className="input outline-none mt-3 text-black dark:text-white" value={wallet_name} onChange={(e) =>{SET_wallet_name(e.target.value)}} />
            </fieldset>
            </> :   <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">{t("wallet_name")}</legend>
                    <input type="text" placeholder="xxxxxxxxx" className="input outline-none text-black mt-3 dark:text-white" value={wallet_name} onChange={(e) => {SET_wallet_name(e.target.value)}}/>
            </fieldset>
            }
            <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">{t("wallet_currency")}</legend>
                       <select defaultValue={wallet_currency} className="select select-accent mt-3 text-black dark:text-white" onChange={(e) => {SET_wallet_currency(e.target.value)}}>
                            <option value="EGP">{t("egp")} - (EGP)</option>
                            <option value="USD">{t("usd")} - (USD)</option>
                            <option value="EUR">{t("eur")} - (EUR)</option>
                            <option value="GBP">{t("gbp")} - (GBP)</option>
                            <option value="SAR">{t("sar")} - (SAR)</option>
                            <option value="AED">{t("aed")} - (AED)</option>
                            <option value="KWD">{t("kwd")} - (KWD)</option>
                            <option value="JPY">{t("jpy")} - (JPY)</option>
                            <option value="QAR">{t("qar")} - (QAR)</option>
                            <option value="BHD">{t("bhd")} - (BHD)</option>
                    </select>
            </fieldset>
<fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">{t("wallet_target")}</legend>
                    <input type="number" placeholder="xxxxxxxxx" className="input outline-none text-black mt-3 dark:text-white" value={wallet_target} onChange={(e) => {SET_wallet_target(e.target.value)}}/>
            </fieldset>
            </div>
                        <div className="modal-action">
                            <button className="btn btn-lg btn-success" onClick={()=>{
                                    const modal = document.getElementById("my_modal_2")
                                    if(modal){(modal as HTMLDialogElement).close()}
                                    useFetcher("POST" , URL + "/wallet/create-new-wallet" , 
                                    {w_name : wallet_type === "card" ? wallet_bank + "-" + wallet_name : wallet_name , type : wallet_type , currency : wallet_currency , target : Number(wallet_target)} ,
                                     {headers : {token : token}} ,dis , (x)=>{
                                          dis(SET_dialog({isOpen : true , isSuccess : true , isFailed : false , body : t(`msg_${x.msg_code}`) , title : t("success"), func : () => {nav("/")}}))
                                     } , t)
                            }}>{t("save")}</button>
                        </div>
                     </div>
                </dialog>
    </>
}