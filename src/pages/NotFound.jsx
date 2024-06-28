import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function NotFound(){
    return(
        <>
            <Header />
            <main className="flex items-center flex-col h-screen relative ">
                <h1 className="z-10 text-center mt-12 text-3xl font-bold text-dark">
                    Aradığınız Sayfaya Ulaşılamıyor
                </h1>
                <div className="max-w-[750px] z-[4]">
                    <img src="/lost.svg" alt="Lab Image" />
                </div>
                <Link to="/" className="z-10 font-semibold bg-secondary px-4 py-2.5 mt-8 rounded-md hover:bg-secondary/90 transition-colors">
                    Geri Dön
                </Link>
            </main>
        </>
    )
}