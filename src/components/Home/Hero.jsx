import { FaLongArrowAltDown } from "react-icons/fa"


export default function Hero(){
    return(
        <section 
        className="flex md:flex-row flex-col-reverse items-center justify-center mx-auto lg:mt-2 mt-8 xcontainer">
            <div className="flex-1 flex items-center text-center md:text-left md:items-start flex-col gap-12">
                <h1 className="font-bold text-4xl z-10">
                    Lorem ipsum dolor sit amet.
                </h1>
                <p className="max-w-[700px] text-copy-light text-lg font-medium z-10">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis fugiat, odit quidem quam, accusantium alias eligendi modi delectus possimus officia sapiente ut ex culpa soluta cumque quia, non explicabo quo?
                </p>
                <a href="#calculator" className="flex items-center justify-center bg-secondary text-white py-3 px-8 rounded-full hover:bg-secondary/90 hover:scale-95 duration-500 transition-all gap-2 group font-medium z-10">
                    Keşfet
                    <FaLongArrowAltDown size={20} className=" -rotate-45 group-hover:rotate-0 duration-500 transition-all" />
                </a>
            </div>

            <div className="flex-1 flex items-center justify-center">
                <img src="/hero.svg" alt="Lab Image" className="w-full" />
            </div>
        </section>
    )
}