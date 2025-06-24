import axios, { AxiosError } from "axios"
import { SET_dialog, SET_isLoading } from "../redux/Types"
import type { TFunction } from "i18next"


export default function useFetcher(method : "GET" | "POST" | "PUT" | "DELETE" , URL : string , data : any , config = {}, dis : any , func : (value : any) => void , t : TFunction<"translation" , undefined>) {

function Error_Handler(err : AxiosError){
    console.log(err)
     dis(SET_isLoading(false))
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
}


switch (method) {
    case "GET":
    dis(SET_isLoading(true))
    axios.get(URL, config)
    .then((Res)=>{
    dis(SET_isLoading(false))
    func(Res.data)
    })
    .catch((err)=>{Error_Handler(err)})
    

        break;
    case "POST":
dis(SET_isLoading(true))
axios.post(URL  , data , config)
.then((Res)=>{
dis(SET_isLoading(false))
func(Res.data)

})
.catch((err)=>{Error_Handler(err)})


        break;
    case "PUT":

    dis(SET_isLoading(true))
    axios.put(URL  , data , config)
    .then((Res)=>{
    dis(SET_isLoading(false))
    func(Res.data)
    })
    .catch((err)=>{Error_Handler(err)})


        break;
    case "DELETE":
        
    dis(SET_isLoading(true))
    axios.delete(URL, config)
    .then((Res)=>{
    dis(SET_isLoading(false))
    func(Res.data)
    })
    .catch((err)=>{Error_Handler(err)})
        break;
    default:
        break;


}

}