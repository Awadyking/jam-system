const isOpen : boolean = false
const isSuccess : boolean = false
const isFailed : boolean = false
const body : string = ""
const title : string = "" 
const func : ()=> void = () => {}

export type Dialog_ValueType = {
isOpen : boolean , 
isSuccess : boolean , 
isFailed : boolean , 
body : string , 
title : string , 
func : () => void
}

const Value : Dialog_ValueType = { isOpen , isSuccess , isFailed , body , title , func }

export default function Dialog_Reducer(state : Dialog_ValueType = Value, action : {type : string , value : Dialog_ValueType}){
    switch(action.type){
        case("dialog"): return action.value
        default : return state
    }
}
