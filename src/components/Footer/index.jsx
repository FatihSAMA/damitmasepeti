import { Link } from "react-router-dom";
import Logo from "../Logo";
import { sanityClient } from "../../../client";
import { useState, useEffect } from "react";

export default function Footer(){
    
    const [data, setData] = useState([])
    useEffect(() => {
        
        const fetchData = async () => {
        
        try{
            const query = `*[_type == "home"]{ footer }`
            const result = await sanityClient.fetch(query)
            setData(result[0])
        }
        catch(err){
            console.log("Veri çekilirken hata meydana geldi!", err)
        }

        }

        fetchData()

    }, [])
    
    return(
        <footer className="bg-background-dark text-white py-8">
            <div className="xcontainer flex justify-between flex-wrap gap-8">
                <div className="flex flex-col gap-4">
                    <Logo />

                    <p className="max-w-[400px] text-justify text-sm">
                        {data?.footer}
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