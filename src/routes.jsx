import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import CalculatorLayout from "./layouts/CalculatorLayout";
import NotFound from "./pages/NotFound";

import AcidCalculator from "./pages/Pure/AcidCalculator";
import Sugar from "./pages/Pure/Sugar";
import AlcholFix from "./pages/Seyreltme/AlcholFix";
import Grain from "./pages/Pure/Grain";
import SugarCorrection from "./pages/Pure/SugarCorrection";
import Refraktometer from "./pages/Pure/Refraktometer";
import FermentationAlchol from "./pages/Pure/FermentationAlchol";
import GlucoseFructose from "./pages/Pure/GlucoseFructose";



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
                    element: <Sugar />
                },
                {
                    path: "3",
                    element: <FermentationAlchol />
                },
                {
                    path: "4",
                    element: <Refraktometer />
                },
                {
                    path: "5",
                    element: <GlucoseFructose />
                },
                
                {
                    path: "23",
                    element: <AlcholFix />
                },
            ]
        }
    ]
}])

export default router