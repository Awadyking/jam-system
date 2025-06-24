import { useDispatch, useSelector } from "react-redux";
import type { Dialog_ValueType } from "../redux/reducers/Dialog_reducer";
import { AnimatePresence, motion } from "motion/react"
import {  SET_dialog } from "../redux/Types";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";


export default function Dialog(){

  const Dialog : Dialog_ValueType = useSelector((state : {Dialog : Dialog_ValueType}) => state.Dialog)
    const {t} : {t : TFunction<"translation" , undefined> , i18n : any} = useTranslation()
  const dis = useDispatch()

useEffect(() => {
    if(Dialog.isFailed){
    setTimeout(() => {
        dis(SET_dialog({isOpen : false , isSuccess : false , isFailed : false , body : "" , title : "" , func : () => {}}))
    }, 4000);
}else if(Dialog.isSuccess){
    const modal = document.getElementById("my_modal")
    if(modal){
        (modal as HTMLDialogElement).showModal()
    }
}

}, [Dialog.isOpen])



if(Dialog.isOpen){
    if(Dialog.isFailed){
        return (
    <AnimatePresence>
    <motion.div
      key="modal"
       role="alert" 
       onClick={()=>{dis(SET_dialog({isOpen : false , isSuccess : false , isFailed : false , body : "" , title : "" , func : () => {}}))}}
       className="alert alert-warning w-80  pt-3 pb-3 pr-2 pl-2  self-end ml-5 mr-5 z-50 fixed bottom-20 bg-amber-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
        transition={{duration: 1.5 }}
    >
         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
             <span className="text-lg font-bold text-center text-white">{Dialog.body}</span>
        </motion.div>
        </AnimatePresence>
        )
    }else if(Dialog.isSuccess){
        return (

            <dialog id="my_modal" className="modal modal-middle">
                <div className="modal-box">
                        <form method="dialog">
                            <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                     <h3 className="font-bold text-lg">{Dialog.title}</h3>
                     <div className="w-full flex justify-center items-center">
                     <img src="/img/Success.gif" className="w-40 h-32 self-center"/>
                     </div>
                    <p className="py-4 m-0 text-center w-full">{Dialog.body}</p>
                    <div className="modal-action">
                        <button className="btn btn-lg btn-success" onClick={()=>{dis(SET_dialog({isOpen : false , isSuccess : false , isFailed : false , body : "" , title : "" , func : () => {Dialog.func()}})) ; Dialog.func()}}>{t("ok")}</button>
                    </div>
                 </div>
            </dialog>

        )
    }


}else{return <></>}



}