import { Outlet } from "react-router-dom";

export default function CalculatorLayout(){
    return(
        <div className="min-h-screen flex items-start  justify-center w-full">
            <Outlet />
        </div>
    )
}