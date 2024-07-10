import { Outlet } from "react-router-dom";

export default function CalculatorLayout(){
    return(
        <div className="min-h-[70vh] flex items-center justify-center w-full">
            <Outlet />
        </div>
    )
}