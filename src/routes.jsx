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
import Chaptalization from "./pages/Pure/Chaptalization";
import Winemaker from "./pages/Pure/Winemaker";
import Malt from "./pages/Pure/Malt";
import LiquidRemaining from "./pages/Damitma/LiquidRemaining";
import Power from "./pages/Damitma/Power";
import HeatingTime from "./pages/Damitma/HeatingTime";
import Boiling from "./pages/Damitma/Boiling";



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
                // Pure
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
                    path: "6",
                    element: <Chaptalization />
                },
                {
                    path: "7",
                    element: <Winemaker />
                },
                {
                    path: "8",
                    element: <Malt />
                },

                // Damitma
                {
                    path: "9",
                    element: <LiquidRemaining />
                },
                {
                    path: "10",
                    element: <Power />
                },
                {
                    path: "11",
                    element: <HeatingTime />
                },
                {
                    path: "12",
                    element: <Boiling />
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