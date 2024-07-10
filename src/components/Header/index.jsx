import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Logo from "../Logo";

export default function Header(){
    return(
        <header className="w-full bg-background-dark text-white py-4">
            <div className="xcontainer flex justify-between items-center ">
                <Logo />
                <Navbar />
            </div>
        </header>
    )
}