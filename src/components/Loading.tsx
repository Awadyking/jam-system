import { useSelector } from "react-redux";
import type { ValueType } from "../redux/reducers/Main_reducer";
import { motion } from "motion/react"
import { SpinnerCircular } from 'spinners-react';
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";

export default function Loading(){

  const {isLoading} : {isLoading : boolean} = useSelector((state : ValueType) => state)
  const {t} : {t : TFunction<"translation" , undefined>} = useTranslation()
if(isLoading){
return (
<div className="fixed top-0 w-full h-screen z-50 overflow-hidden bg-gray-500/30 flex flex-col items-center backdrop-blur-lg px-7">
<motion.div initial={{  scale : -0.5 }}
            animate={{ scale: 1 }}
            transition={{
                duration: 1.4,
                scale: { type: "spring", visualDuration: 1, bounce: 0.45 },
            }} className="h-80 w-10/12 lg:w-5/12 rounded-2xl bg-white mt-20 dark:bg-gray-800 opacity-100 flex flex-col items-center justify-evenly">
<SpinnerCircular size={150} thickness={134} speed={99} color="rgba(255, 147, 147, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" />
<p className="w-full m-0 text-center text-xl font-bold text-black dark:text-white">{t("loading")}</p>

</motion.div>

</div>
)

}else{
  return <></>
}



}