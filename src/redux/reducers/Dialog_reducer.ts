const isOpen : boolean = false
const isSuccess : boolean = false
const isFailed : boolean = false
const body : string = ""
const title : string = "" 


export type Dialog_ValueType = {
isOpen : boolean , 
isSuccess : boolean , 
isFailed : boolean , 
body : string , 
title : string
}

const Value : Dialog_ValueType = { isOpen , isSuccess , isFailed , body , title }

export default function Dialog_Reducer(state : Dialog_ValueType = Value, action : {type : string , value : Dialog_ValueType}){
    switch(action.type){
        case("isOpen"): return {...Value , isOpen : action.value.isOpen}
        case("isSuccess"): return {...Value , isSuccess : action.value.isSuccess}
        case("isFailed"): return {...Value , isFailed : action.value.isFailed}
        case("body"): return {...Value , body : action.value.body}
        case("title"): return {...Value , title : action.value.title}
        default : return state
    }
}
