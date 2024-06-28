import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

export default function MainLayout(){
    return(
        <>
            <ScrollToTop />
            <Header />
            <main className="">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}