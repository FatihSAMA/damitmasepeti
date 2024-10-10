// import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Logo from "../Logo";

export default function Header(){
    return(
        <header className="w-full bg-background-dark text-white py-4">
            <div className="xcontainer flex justify-between items-center ">
                <Logo />
                <Link to={"https://damitmasepeti.com"} className="bg-secondary text-white px-2 py-2 rounded-md hover:bg-secondary/80 transition-all flex items-center justify-center gap-1">
                    Alışveriş
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 1024 1024">
                        <path fill="currentColor" d="M754.752 480H160a32 32 0 1 0 0 64h594.752L521.344 777.344a32 32 0 0 0 45.312 45.312l288-288a32 32 0 0 0 0-45.312l-288-288a32 32 0 1 0-45.312 45.312z"></path>
                    </svg>
                </Link>
                {/* <Navbar /> */}
            </div>
        </header>
    )
}