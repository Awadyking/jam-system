import axios from "axios"
import {isLoading } from "../redux/Types"

export default function useFetcher(method , URL , data , config = {}, dis , func) {


function Error_Handler(err){
    console.log(err)
    
}


switch (method) {
    case "GET":
    dis(isLoading(true))
    axios.get(URL, config)
    .then((Res)=>{
    dis(isLoading(false))
    func(Res.data)
    })
    .catch((err)=>{Error_Handler(err)})
    

        break;
    case "POST":
        
dis(isLoading(true))
axios.post(URL  , data , config)
.then((Res)=>{
dis(isLoading(false))
func(Res.data)

})
.catch((err)=>{Error_Handler(err)})


        break;
    case "PUT":

    dis(isLoading(true))
    axios.put(URL  , data , config)
    .then((Res)=>{
    dis(isLoading(false))
    func(Res.data)
    })
    .catch((err)=>{Error_Handler(err)})


        break;
    case "DELETE":
        
    dis(isLoading(true))
    axios.delete(URL, config)
    .then((Res)=>{
    dis(isLoading(false))
    func(Res.data)
    })
    .catch((err)=>{Error_Handler(err)})
        break;
    default:
        break;


}

}