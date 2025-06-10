const URL : string = import.meta.env.VITE_URL
const token : string= localStorage.getItem("token") ?? ""
const stringified_USER : string = localStorage.getItem("user") ?? ""
const USER : {id : string , username : string} | undefined = JSON.parse(stringified_USER)
const isLoading : boolean = false
const Theme : string  = localStorage.getItem("theme") || "light"
const element : HTMLElement = document.documentElement 


type ValueType = {
    URL : string
    token : string | undefined
    USER : {id : string , username : string} | undefined
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
