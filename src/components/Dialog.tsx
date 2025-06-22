import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import type { Dialog_ValueType } from "../redux/reducers/Dialog_reducer";

export default function Dialog(){

  const Dialog : Dialog_ValueType = useSelector((state : {Dialog : Dialog_ValueType}) => state.Dialog)
  const {t} : {t : TFunction<"translation" , undefined>} = useTranslation()

  
if(Dialog.isOpen){
return (
<></>
)


}else{
  return <></>
}



}