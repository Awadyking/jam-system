import { useEffect, useState } from "react"
import useFetcher from "../hooks/useFetcher"
import { useDispatch, useSelector } from "react-redux"
import type { ValueType } from "../redux/reducers/Main_reducer"
import type { TFunction } from "i18next"
import { useTranslation } from "react-i18next"
import i18n from "../i18next"
import Proccess_Table from "../components/Proccess_Table"
import Proccess_details from "../components/Proccess_details"
import Proccess_control from "../components/Proccess_control"

export default function Payments() {
  const {t} : {t : TFunction<"translation" , undefined> , i18n : any} = useTranslation()
  const dis = useDispatch()
  const {token ,  URL , Theme}  : {token : string , URL : string , Theme : string} = useSelector((state : {Main : ValueType}) => state.Main)
  const [selected_Wallet , SET_selected_Wallet] : [string , any] = useState("default")
  const [selected_Wallet_details , SET_selected_Wallet_details] : [{
  wallet_name: string,
  currency : string,
  amount: number,
  type: string,
  depts: number,
  for: number,
  target: number,
  creation_date : string,
  owner_name: string,
  users_data: [{username: string , amount: number}]
} , any
] = useState({
  wallet_name: "",
  currency : "",
  amount: 0,
  type: "",
  depts: 0,
  for: 0,
  target: 0,
  creation_date :"",
  owner_name: "",
  users_data: [{username: "" , amount: 0}]
})
  const [search , SET_search] : [string , any] = useState("")
  const [date , SET_date] : [string , any] = useState("")
  const [wallets , SET_wallets] : [[{w_id : string , w_name : string , amount : number}] , any] = useState([{
    w_id : "",
    w_name : "",
    amount : 0
  }])

    useEffect(()=>{
        useFetcher("GET" , URL + "/wallet/get-my-wallets" ,{} , {headers : {token :token}} , dis , (res : any)=>{SET_wallets(res)} , t)
    },[])


    useEffect(()=>{
      if(selected_Wallet != "default"){
   useFetcher("GET" , URL + "/wallet/get-wallet-details?w_id=" + selected_Wallet ,{} , {headers : {token :token}} , dis , (res : any)=>{SET_selected_Wallet_details(res)} , t)      
      }
    } , [selected_Wallet])
    
    return (
      <>
        <div
          className="w-full flex justify-evenly mt-7 flex-wrap dark:bg-gray-800"
          data-theme={Theme}
          dir={i18n.dir()}
        >
          <div className="flex lg:w-3/12 w-8/12 mt-5">
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
          <label className="input mt-5">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              required
              placeholder={t("search_title")}
              onChange={(e) => {
                SET_search(e.target.value);
              }}
              value={search}
            />
          </label>

          <div className="flex lg:w-3/12 w-8/12 mt-5">
            <legend className="fieldset-legend">{t("date")} : </legend>
            <input
              type="date"
              className="input mr-3 ml-3 w-7/12"
              value={date}
              onChange={(e) => {
                SET_date(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="w-11/12 h-72 bg-white bg-opacity-45 rounded-md overflow-y-auto mt-10 dark:bg-gray-800">
          <Proccess_Table id={selected_Wallet} search={search} date={date} />
        </div>
      <Proccess_details t={t} i18n={i18n} selected_Wallet={selected_Wallet} selected_Wallet_details={selected_Wallet_details}/> 
      <Proccess_control selected_Wallet={selected_Wallet} />
      </>
    );
}