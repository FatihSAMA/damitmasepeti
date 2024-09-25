import { Link } from "react-router-dom";

export default function Footer(){
    
    
    return(
        <footer className="bg-background-dark text-white py-8">

            <div className="flex items-center justify-center flex-wrap text-sm">
                © 2024 Damıtma Sepeti - Developed by
                <Link to="https://fatihkabul.vercel.app" target="_blank" className="pl-1 text-secondary/80 hover:text-secondary transition-colors">
                    Fatih Kabul
                </Link>
            </div>

        </footer>
    )
}