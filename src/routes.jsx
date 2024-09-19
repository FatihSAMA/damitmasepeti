import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import CalculatorLayout from "./layouts/CalculatorLayout";
import NotFound from "./pages/NotFound";

import AcidCalculator from "./pages/Pure/AcidCalculator";
import Sugar from "./pages/Pure/Sugar";
import AlcholFix from "./pages/Seyreltme/AlcholFix";
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
import SPNCalculator from "./pages/Damitma/SPNCalculator";
// import LoadUnderStage from "./pages/Damitma/LoadUnderStage";
import Reflu from "./pages/Damitma/Reflu";
import Distillation from "./pages/Damitma/Distillation";
import HeadsSelection from "./pages/Pure/HeadsSelection";
import LiquidTimer from "./pages/Damitma/LiquidTimer";
import AlcoholDensity from "./pages/Seyreltme/AlcholDensity";
import AlcoholWater from "./pages/Seyreltme/AlcholWater";
import AlcoholMixing from "./pages/Seyreltme/AlcholMixing";
import UnitConverter from "./pages/Other/UnitConverter";
import MutlakAlkol from "./pages/Other/MutlakAlkol";
import Anason from "./pages/Other/Anason";
import AS3 from "./pages/Pure/AS3";
import SecondDistillation from "./pages/Damitma/SecondDistillation";



const router = createBrowserRouter([{
    path : "/",
    element : <MainLayout />,
    // errorElement: <NotFound />,
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
                {
                    path: "30",
                    element: <AS3 />
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
                    path: "13",
                    element: <SPNCalculator />
                },
                // {
                //     path: "14",
                //     element: <LoadUnderStage />
                // },
                {
                    path: "15",
                    element: <Reflu />
                },
                {
                    path: "16",
                    element: <Distillation /> 
                },
                {
                    path: "17",
                    element: <HeadsSelection /> 
                },
                {
                    path: "18",
                    element: <LiquidTimer /> 
                },
                {
                    path: "31",
                    element: <SecondDistillation />
                },



                {
                    path: "23",
                    element: <AlcholFix />
                },
                {
                    path: "24",
                    element: <AlcoholDensity /> // sorunlu
                },
                {
                    path: "25",
                    element: <AlcoholWater /> // bazı değerler tablodan çekildiği için yanlış
                },
                {
                    path: "26",
                    element: <AlcoholMixing />
                },


                {
                    path: "27",
                    element: <UnitConverter />
                },
                {
                    path: "28",
                    element: <MutlakAlkol />
                },
                {
                    path: "29",
                    element: <Anason />
                },

            ]
        }
    ]
}])

export default router