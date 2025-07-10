import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { ValueType } from "../redux/reducers/Main_reducer";
import { useEffect, useState } from "react";
import useFetcher from "../hooks/useFetcher";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";




export default function Header(){

const {URL , token}  : {URL : string , token : string} = useSelector((state : {Main : ValueType}) => state.Main)



    return (
        <header className="flex w-full justify-between z-50 items-center fixed top-0 h-10 px-5 dark:bg-teal-500 bg-[#FF9393]" >
         <Link to="/"> 
             <img src="/img/banner.png" className="h-10 w-fit"/> 
         </Link>

{token != "" && <div className="flex w-16 justify-between items-center">
    <Link to="/notification">  
            <img src="/img/notification.svg" className="h-6 w-6" /> 
        </Link>
        <Link to="/profile">  
            <img src={URL + "/users/get-profile-image?token=" + token} className="h-8 w-8 rounded-full" /> 
        </Link>
    </div>} 
        </header>
    );
}