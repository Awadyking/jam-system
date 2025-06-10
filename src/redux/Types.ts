export const isLoading : (value : boolean) => {type : string , value : boolean} = (value)=>{return { type : "Loading" , value : value }}
export const token_action : (value : string) => {type : string , value : string} =(value) => {return {type : "token" , value : value}}
export const USER_action : (value : string) => {type : string , value : string} = (value) => {return {type : "USER" , value : value}}
export const theme_action : (value : string) => {type : string , value : string} =(value) => {return {type : "theme" , value : value}}
