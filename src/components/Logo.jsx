import { Link } from "react-router-dom";

export default function Logo(){
    return(
        <Link to="https://damitmasepeti.com" className="w-[250px] flex">
            <img src="/logo.png" alt="Logo" className="block w-full object-cover" />
        </Link>
    )
}