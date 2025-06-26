export default function Ball({title , img }: {title : string , img : string}) {

    return (
        <div className="lg:w-36 lg:h-36 h-48 w-48  rounded-full  flex justify-evenly items-center bg-red-400 dark:bg-teal-500 flex-col ml-8 mt-8 mr-8">
            <img src={img} className="w-16 h-16"/>
            <p className="text-white text-sm font-bold font-sans w-full px-5 text-center">{title}</p>
        </div>
    )
}