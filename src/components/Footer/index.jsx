import { Link } from "react-router-dom";
import Logo from "../Logo";

export default function Footer(){
    return(
        <footer className="bg-background-dark text-white py-8">
            <div className="xcontainer flex justify-between flex-wrap gap-8">
                <div className="flex flex-col gap-4">
                    <Logo />

                    <p className="max-w-[400px] text-justify text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quo harum officia voluptates, voluptatem nesciunt tenetur praesentium inventore magnam, repellat sapiente ea. Id officiis quam aliquam natus sed sint quos.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <h6 className="text-primary font-bold">
                        Kurumsal
                    </h6>
                    <div className="flex flex-col gap-2.5">
                        <Link to="https://damitmasepeti.com/hakkimizda" className="hover:text-secondary transition-colors">
                            Hakkımızda
                        </Link>
                        <Link to="https://damitmasepeti.com/iletisim" className="hover:text-secondary transition-colors">
                            İletişim
                        </Link>
                    </div>
                </div>
            </div>
            <hr className="xcontainer rounded-full border-zinc-500 my-6" />

            <div className="flex items-center justify-center flex-wrap text-sm">
                © 2024 Damıtma Sepeti - 
                <Link to="https://fatihkabul.vercel.app" target="_blank" className="pl-1 text-secondary/80 hover:text-secondary transition-colors">
                    Fatih Kabul
                </Link>
            </div>

        </footer>
    )
}