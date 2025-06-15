import { useEffect } from "react";
import {  useSelector } from "react-redux";
import type { ValueType } from "../redux/reducers/Main_reducer";

export default function Main({children}: Readonly<{children: React.ReactNode;}>) {


const {Theme}  : ValueType = useSelector((state : ValueType) => state)
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
        <main className="flex h-fit flex-col items-center pt-10 ">
            {children}
        </main>
    );
}