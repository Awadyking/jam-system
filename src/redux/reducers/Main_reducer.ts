const URL : string = import.meta.env.VITE_URL
const token : string= localStorage.getItem("token") ?? ""
const stringifiedUser : string | null = localStorage.getItem("user")
const USER : {id : string , username : string , user_email : string , user_age : number , name : string , isBanned : 0 | 1 , join_date : string} | string = stringifiedUser ? JSON.parse(stringifiedUser) : ""
const isLoading : boolean = false
const Theme : string  = localStorage.getItem("theme") || "light"
const element : HTMLElement = document.documentElement 


export type ValueType = {
    URL : string
    token : string 
    USER : {id : string , username : string , user_email : string , user_age : number , name : string , isBanned : 0 | 1 , join_date : string} | string
    isLoading : boolean
    Theme : string
}

const Value : ValueType = { URL , token ,  USER , isLoading , Theme }

export default function Main_Reducer(state = Value, action : {type : string , value : any}){
switch(action.type){

case("USER"):
localStorage.setItem("user" , JSON.stringify(action.value) )
return {...Value , USER : action.value }


case("token"):
localStorage.setItem("token" , action.value) 
return { ...Value , token : action.value }


case("Loading"):
return {...Value , isLoading : action.value}


case("theme"):
localStorage.setItem("theme" , action.value)
if(action.value == "dark"){element.classList.add("dark")}
else{element.classList.remove("dark")}

return {...Value , Theme : Theme}


default: 
return state
}


}
