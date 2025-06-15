import { Link } from "react-router-dom";


export default function Header(){
    return (
        <header className="flex w-full justify-between items-center fixed top-0 h-10 px-5 dark:bg-teal-500 bg-[#FF9393]" >
         <Link to="/"> <img src="/img/banner.png" className="h-10 w-fit"/> </Link>
         <Link to="/notification">  <img src="/img/notification.svg" className="h-6 w-6" /> </Link>
        </header>
    );
}