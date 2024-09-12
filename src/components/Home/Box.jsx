import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa"

export default function Box({title, desc, link, icon}){
    return(
        <div className="w-[285px] h-[270px] flex flex-col gap-4 items-center justify-between border-2 border-solid border-zinc-200 rounded-lg p-6 text-center hover:border-zinc-300 transition-all ">
            <div className="w-[54px]">
                <img src={icon} alt="" />
            </div>
            <h4 className="font-bold">
                {title}
            </h4>
            {/* <p className="text-copy-light text-sm">
                {desc}
            </p> */}
            <Link to={link} className="border border-primary px-4 py-2 rounded-full flex gap-1 group hover:bg-primary items-center justify-center text-primary transition-all duration-500 hover:text-white font-semibold" >
                Hemen Dene
                <FaLongArrowAltRight size={20} className=" -rotate-45 group-hover:rotate-0 transition-transform duration-500"  />
            </Link>
        </div>
    )
}