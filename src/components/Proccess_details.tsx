export default function Proccess_details({selected_Wallet , selected_Wallet_details , t , i18n} : {selected_Wallet : string , selected_Wallet_details : {
  wallet_name: string,
  currency : string,
  amount: number,
  type: string,
  depts: number,
  for: number,
  target: number,
  creation_date : string,
  owner_name: string,
  users_data: [{username: string , amount: number}]
} , t : any , i18n : any} ){ 

if(selected_Wallet != "default"){
return (
    <div className="flex w-11/12 flex-wrap mt-2 justify-evenly" dir={i18n.dir()}>
            <div className="w-64 h-8 flex justify-between mt-5">
              <label className="w-fit dark:text-white text-black text-lg font-serif text-center items-center m-0">
                {t("balance")} :
              </label>
              <div className="w-44 flex items-center">
                <input
                  className="w-32 h-8 pl-4 px-1 text-black dark:bg-opacity-80 bg-gray-100 outline-none rounded-md border-b-4 border-[#FF9393] dark:border-green-500"
                  type="text"
                  disabled
                  value={String(selected_Wallet_details.amount)}
                ></input>
                <label className="w-8 ml-2 mr-2 dark:text-white text-black text-lg font-serif text-center">
                  {selected_Wallet_details.currency}
                </label>
              </div>
            </div>

             <div className="w-64 h-8 flex justify-between mt-5">
              <label className="w-fit dark:text-white text-black text-lg font-serif text-center items-center m-0">
                {t("depts")} :
              </label>
              <div className="w-44 flex items-center">
                <input
                  className="w-32 h-8 pl-4 px-1 text-black dark:bg-opacity-80 bg-gray-100 outline-none rounded-md border-b-4 border-[#FF9393] dark:border-green-500"
                  type="text"
                  disabled
                  value={String(selected_Wallet_details.depts)}
                ></input>
                <label className="w-8 ml-2 mr-2 dark:text-white text-black text-lg font-serif text-center">
                  {selected_Wallet_details.currency}
                </label>
              </div>
            </div>
            <div className="w-64 h-8 flex justify-between mt-5">
              <label className="w-fit dark:text-white text-black text-lg font-serif text-center items-center m-0">
                {t("for")} :
              </label>
              <div className="w-44 flex items-center">
                <input
                  className="w-32 h-8 px-1 pl-4 text-black dark:bg-opacity-80 bg-gray-100 outline-none rounded-md border-b-4 border-[#FF9393] dark:border-green-500"
                  type="text"
                  disabled
                  value={String(selected_Wallet_details.for)}
                ></input>
                <label className="w-8 ml-2 mr-2 dark:text-white text-black text-lg font-serif text-center">
                  {selected_Wallet_details.currency}
                </label>
              </div>
            </div>
                         <div className="w-64 h-8 flex justify-between mt-5">
              <label className="w-fit dark:text-white text-black text-lg font-serif text-center items-center m-0">
                {t("target")} :
              </label>
              <div className="w-44 flex items-center">
                <input
                  className="w-32 px-1 h-8 pl-4 text-black dark:bg-opacity-80 bg-gray-100 outline-none rounded-md border-b-4 border-[#FF9393] dark:border-green-500"
                  type="text"
                  disabled
                  value={String(selected_Wallet_details.target)}
                ></input>
                <label className="w-8 ml-2 mr-2 dark:text-white text-black text-lg font-serif text-center">
                  {selected_Wallet_details.currency}
                </label>
              </div>
            </div>



          </div>
)
}else{
    return <></>
}


}

 