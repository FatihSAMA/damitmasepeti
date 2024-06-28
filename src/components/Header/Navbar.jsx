import { Link } from "react-router-dom"
import navs from "../../constants/navs"

export default function Navbar(){
    return(
        <nav className="md:flex hidden items-center justify-center gap-4">
            {navs.map((nav) => (
                <Link to={nav.url} key={nav.name} className="hover:text-primary transition-colors">
                    {nav.name}
                </Link>
            ))}
        </nav>
    )
}