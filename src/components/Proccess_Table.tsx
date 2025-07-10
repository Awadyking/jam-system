import type { TFunction } from "i18next"
import { useTranslation } from "react-i18next"
import type { ValueType } from "../redux/reducers/Main_reducer"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios"
import { SET_dialog } from "../redux/Types"

export default function Proccess_Table({id , date , search} : {id : string , date : string , search : string}){



 const {t} : {t : TFunction<"translation" , undefined> , i18n : any} = useTranslation()
const dis = useDispatch()
const {token ,  URL , Theme}  : {token : string , URL : string , Theme : string} = useSelector((state : {Main : ValueType}) => state.Main)
const [isloading , SET_isloading] : [boolean , any] = useState(true)
const [Tdata , SET_Tdata] : [[{
    procces_id: number,
    user_name: string,
    amount: number,
    type: string,
    title: string,
    category: string,
    date: number,
    iscancelled : number 
  }] , any ] = useState([    {
    procces_id: 0,
    user_name: "",
    amount: 0,
    type: "Adding",
    title: "string",
    category: "string",
    date: 0,
    iscancelled: 0
  }])

  const [data , SET_data] : [[{
    procces_id: number,
    user_name: string,
    amount: number,
    type: string,
    title: string,
    category: string,
    date: number,
    iscancelled : number 
  }] , any ] = useState([
    {
    procces_id: 0,
    user_name: "",
    amount: 0,
    type: "Adding",
    title: "string",
    category: "string",
    date: 0,
    iscancelled: 0
  }
  ])


useEffect(()=>{
    if(id == "default"){return}
    SET_isloading(true)
    axios.get(URL + `/wallet/get-all-procceses?w_id=${id}&limmit=100`, {headers : {token : token}})
    .then((Res)=>{SET_data(Res.data); SET_isloading(false); SET_Tdata(Res.data)})
    .catch((err)=>{
 if(err.response){
        if(err.response.data == "" || undefined){
            dis(SET_dialog({isOpen : true , isSuccess : false , isFailed : true , body : t("serv_down") , title : "", func : () => {}}))
        } else {
            const data = err.response.data as { detail:{msg_code :  string} };
            dis(SET_dialog({isOpen : true , isSuccess : false , isFailed : true , body : t(`msg_${data.detail.msg_code}`) , title : "", func : () => {}}))
        } 

    }else{
        dis(SET_dialog({isOpen : true , isSuccess : false , isFailed : true , body : t("serv_down") , title : "", func : () => {}}))
    }
    })
    
}, [id])


    function CheckTime(x : number){
        if(x < 10){return "0" + String(x)}
        return String(x)
        
    }
   
function CheckHours(x : number){
    let H = new Date(x).getHours()
   if( H > 12){return CheckTime(H - 12) + ":"  + CheckTime(new Date(x).getMinutes()) + " PM"}
    else{return CheckTime(H) + ":"  + CheckTime(new Date(x).getMinutes()) + " AM"}    
}

useEffect(()=>{
if(JSON.stringify(data) !== JSON.stringify([{
    procces_id: 0,
    user_name: "",
    amount: 0,
    type: "Adding",
    title: "string",
    category: "string",
    date: 0,
    iscancelled: 0
  }]) ){
  if(search[0] + search[1] + search[2] === "id:"){
    SET_Tdata(data.filter((item) => {return item.procces_id === Number(search.replace("id:" , ""))}))
  }
  
  else if(search[0] + search[1] + search[2] + search[3] + search[4] === "user:"){
    SET_Tdata(data.filter((item) => {return item.user_name.includes(search.replace("user:" , ""))}))
  }

  else{
    SET_Tdata(data.filter((item) => {return item.title.includes(search)}))
  }
}
} ,[search])


useEffect(()=>{
  if(JSON.stringify(data) !== JSON.stringify([{
    procces_id: 0,
    user_name: "",
    amount: 0,
    type: "Adding",
    title: "string",
    category: "string",
    date: 0,
    iscancelled: 0
  }])){
let c = data.filter((i)=>{
var dat = String(new Date(i.date *1000).getFullYear()) + "-"  + CheckTime(new Date(i.date * 1000).getMonth() + 1) + "-" + CheckTime(new Date(i.date * 1000).getDate())
return(dat === date)
})

SET_Tdata(c)
}

if(date === ""){SET_Tdata(data)}

} , [date])


function Color(x : string, y : string){
switch(y){

case("amount"):
if( 0 > Number(x)){return <p className="text-red-500">{String(x)}</p>}
else{return <p className="text-green-500">+{String(x)}</p>}

case("cancelled_type"):
if(x == "Adding"){return <p className="text-gray-700 bg-gray-300">{t("adding")}</p>}
else if (x ==  "Discount"){return <p className="text-gray-700 bg-gray-300">{t("discount")}</p>}
break;

case("cancelled_amount"):
if( 0 > Number(x)){return <p className="text-gray-500">{String(x)}</p>}
else{return <p className="text-gray-500">+{String(x)}</p>}


case("type"):
if(x == "Adding"){return <p className="text-green-700 bg-green-300">{t("adding")}</p>}
else if (x ==  "Discount"){return <p className="text-red-700 bg-red-300">{t("discount")}</p>}

else{return <p className="text-red-900">Error</p>}

default: return <p className="text-stone-700">UnKnown type</p>

}}



if(id == "default"){
    return <div className="w-full h-full flex justify-center items-center">
      <p className="text-black dark:text-white font-bold text-2xl m-0">{t("no_selected_wallet")} !</p>
    </div>
}else{
if(isloading){
    return <div className="w-full h-full flex justify-center items-center">
     <span className="loading loading-dots loading-xl" data-theme={Theme}></span>
    </div>

}else{
return <>

  <table className="table text-black dark:text-white border-2 dark:border-white dark:bg-gray-800" >
    <thead className=" text-black dark:text-white text-center font-bold ">
      <tr>
        <th className="w-1/12 border-2 dark:border-white">#</th>
        <th className="w-1/12 border-2 dark:border-white">{t("id")}</th>
        <th className="w-2/12 border-2 dark:border-white">{t("title")}</th>
        <th className="w-1/12 border-2 dark:border-white">{t("name")}</th>
        <th className="w-1/12 border-2 dark:border-white">{t("category")}</th>
        <th className="w-1/12 border-2 dark:border-white">{t("amount")}</th>
        <th className="w-1/12 border-2 dark:border-white">{t("type")}</th>
        <th className="w-2/12 border-2 dark:border-white">{t("date")}</th>
        <th className="w-2/12 border-2 dark:border-white">{t("time")}</th>
      </tr>
    </thead>
    <tbody className="text-black dark:text-white text-center">
      {Tdata.map((i , index)=>{
        const category_arr : string[] = ["candy" , "food" , "repairs" , "projects" ,
                             "subscriptions" , "bills" , "donations" , "gifts" ,
                              "salaries" , "development" , "equipment" , "transportation" , "other"] 
        let cate : string = ""
        category_arr.map((j)=>{if(j == i.category){cate = t(`category_${j}`)}})
        if(cate == ""){
            cate = i.category
        }
        if(i.iscancelled === 0){
            return <tr key={index}>
            <th className="w-1/12 border-2 dark:border-white">{data.length - index}</th>
            <th className="w-1/12 border-2 dark:border-white">{i.procces_id}</th>
            <th className="w-2/12 border-2 dark:border-white">{i.title}</th>
            <th className="w-1/12 border-2 dark:border-white">{i.user_name}</th>
            <th className="w-1/12 border-2 dark:border-white">{cate}</th>
            <th className="w-1/12 border-2 dark:border-white">{Color(String(i.amount) , "amount")}</th>
            <th className="w-1/12 border-2 dark:border-white">{Color(i.type , "type")}</th>
            <th className="w-2/12 border-2 dark:border-white">{CheckTime(new Date(i.date * 1000).getDate()) + "-" + CheckTime(new Date(i.date * 1000).getMonth() + 1) + "-" + CheckTime(new Date(i.date * 1000).getFullYear())}</th>
            <th className="w-2/12 border-2 dark:border-white">{CheckHours(i.date * 1000)}</th>
          </tr>
        }else{
                return <tr key={index}>
            <th className="w-1/12 border-2 dark:border-white line-through text-gray-600">{data.length - index}</th>
            <th className="w-1/12 border-2 dark:border-white line-through text-gray-600">{i.procces_id}</th>
            <th className="w-2/12 border-2 dark:border-white line-through text-gray-600 text-wrap h-fit">{i.title}</th>
            <th className="w-1/12 border-2 dark:border-white line-through text-gray-600">{i.user_name}</th>
            <th className="w-1/12 border-2 dark:border-white line-through text-gray-600">{cate}</th>
            <th className="w-1/12 border-2 dark:border-white line-through ">{Color(String(i.amount) , "cancelled_amount")}</th>
            <th className="w-1/12 border-2 dark:border-white">{Color(i.type , "cancelled_type")}</th>
            <th className="w-2/12 border-2 dark:border-white line-through text-gray-600">{CheckTime(new Date(i.date * 1000).getDate()) + "-" + CheckTime(new Date(i.date * 1000).getMonth() + 1) + "-" + CheckTime(new Date(i.date * 1000).getFullYear())}</th>
            <th className="w-2/12 border-2 dark:border-white line-through text-gray-600">{CheckHours(i.date * 1000)}</th>
          </tr>
            
        }

      })}
    </tbody>
  </table>




</>
}
}

}
