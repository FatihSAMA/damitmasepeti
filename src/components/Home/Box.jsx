import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa"

export default function Box({title, desc="test", link, icon}){
    return(
        <Link
            to={link}
            className="flex flex-col gap-3 items-center justify-between border-2 border-solid border-zinc-200 rounded-lg py-4 px-1 text-center hover:border-zinc-300 transition-all overflow-hidden"
        >

            <div className="w-[50px]">
                <img src={icon} alt="" />
            </div>
            
            <h4 className="font-bold w-full line-clamp-3 md:text-base text-xs" title={title}>
                {title}
            </h4>

            <button className="border border-primary px-4 py-1 rounded-full flex gap-1 group hover:bg-primary items-center justify-center text-primary transition-all duration-500 hover:text-white font-semibold text-xs md:text-sm" >
                Hemen Dene
                <FaLongArrowAltRight size={14} className=" -rotate-45 group-hover:rotate-0 transition-transform duration-500"  />
            </button>
        </Link>
    )
}