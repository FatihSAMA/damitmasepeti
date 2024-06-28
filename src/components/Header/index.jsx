import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function Header(){
    return(
        <header className="w-full bg-background-dark text-white py-4">
            <div className="xcontainer flex justify-between items-center ">
                <Link to="/" className="w-[250px] ">
                    <img src="/logo.png" alt="Logo" className="block w-full object-cover" />
                </Link>

                <Navbar />

            </div>
        </header>
    )
}