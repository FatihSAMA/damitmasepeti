import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import AcidCalculator from "./pages/AcidCalculator";
import CalculatorLayout from "./layouts/CalculatorLayout";
import NotFound from "./pages/NotFound";
import Calc2 from "./pages/Calc2";


const router = createBrowserRouter([{
    path : "/",
    element : <MainLayout />,
    errorElement: <NotFound />,
    children : [
        {
            index : true,
            element : <Home />
        },
        {
            path: "/calc",
            element: <CalculatorLayout />,
            children: [
                {
                    path: "1",
                    element: <AcidCalculator />
                },
                {
                    path: "2",
                    element: <Calc2 />
                },
            ]
        },
    ]
}])

export default router