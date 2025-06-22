import Main_Reducer from "./reducers/Main_reducer"
import Dialog_Reducer from "./reducers/Dialog_reducer";
import { combineReducers } from "redux";

 const Tree = combineReducers({
    Main : Main_Reducer ,
     Dialog  : Dialog_Reducer
})

export default Tree