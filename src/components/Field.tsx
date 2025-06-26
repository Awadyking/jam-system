export default function Field({label , place , value , type , bcolor , focus , disabled , setValue} : {label : string , place : string , value : string , type : string , bcolor : string , focus : boolean , disabled : boolean , setValue : any}){

const style = {borderBottom : `solid 4px ${bcolor}`}
    
return(<div className="w-80 h-8 flex justify-between mt-5">
<label className="w-fit dark:text-white text-black text-lg font-serif text-center">{label} :</label>
<input className="w-44 h-8 pl-4 dark:bg-white dark:text-black bg-gray-400 dark:bg-opacity-80 outline-none rounded-md" 
placeholder={place}
type={type}
style={style}
onChange={(e)=>{setValue(e.target.value)}}
value={value}
autoFocus={focus}
disabled={disabled}
></input>

</div>)




}