import { useEffect } from "react";
import {  useSelector } from "react-redux";
import type { ValueType } from "../redux/reducers/Main_reducer";

export default function Main({children}: Readonly<{children: React.ReactNode;}>) {


const {Theme}  : {Theme : string} = useSelector((state : {Main : ValueType}) => state.Main)
const element = document.documentElement

useEffect(()=>{

        if(Theme == "dark"){ element.classList.add("dark")}
        else{element.classList.remove("dark")}

// let path = window.location.pathname

// // if(!token && 
// //  path != "/login" &&
// //  path != "/" && 
// //  path != "/register"

// // ) {window.location.href = "/login"}

} , [])

    return (
        <main className=" flex h-fit flex-col items-center pt-10 bg-white dark:bg-gray-800">
            {children}
        </main>
    );
}