import type { Dialog_ValueType } from "./reducers/Dialog_reducer"

export const SET_isLoading : (value : boolean) => {type : string , value : boolean} = (value)=>{return { type : "Loading" , value : value }}
export const SET_token_action : (value : string) => {type : string , value : string} =(value) => {return {type : "token" , value : value}}
export const SET_USER_action : (value : string) => {type : string , value : string} = (value) => {return {type : "USER" , value : value}}
export const SET_theme_action : (value : string) => {type : string , value : string} = (value) => {return {type : "theme" , value : value}}
export const SET_dialog : (value : Dialog_ValueType) => {type : string , value : Dialog_ValueType} = (value) => {return {type : "dialog" , value : value}}
