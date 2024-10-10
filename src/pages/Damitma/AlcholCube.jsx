import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Accordion from "../../components/Accordion";
import { sanityClient } from "../../../client";

const table = {
    79: { kazan: 89.23, akis: 91.91},
    79.1: { kazan: 88.71, akis: 91.50},
    79.2: { kazan: 88.41, akis: 91.18},
    79.3: { kazan: 87.12, akis: 90.80},
    79.4: { kazan: 86.31, akis: 90.49},
    79.5: { kazan: 85.49, akis: 90.11},
    79.6: { kazan: 84.26, akis: 89.84},
    79.7: { kazan: 83.00, akis: 89.10},
    79.8: { kazan: 80.88, akis: 88.46},
    79.9: { kazan: 79.91, akis: 88.15},
    80: { kazan: 78.71, akis: 87.76},
    80.1: { kazan: 77.81, akis: 87.11},
    80.2: { kazan: 76.95, akis: 87.20},
    80.3: { kazan: 76.56, akis: 87.03},
    80.4: { kazan: 75.16, akis: 86.79},
    80.5: { kazan: 73.31, akis: 86.31},
    80.6: { kazan: 72.42, akis: 86.15},
    80.7: { kazan: 71.04, akis: 85.86},
    80.8: { kazan: 70.10, akis: 85.68},
    80.9: { kazan: 69.16, akis: 85.41},
    81: { kazan: 67.74, akis: 85.08},
    81.1: { kazan: 66.78, akis: 84.84},
    81.2: { kazan: 65.82, akis: 84.67},
    81.3: { kazan: 63.88, akis: 84.26},
    81.4: { kazan: 62.89, akis: 84.01},
    81.5: { kazan: 61.91, akis: 83.84},
    81.6: { kazan: 60.91, akis: 83.59},
    81.7: { kazan: 59.91, akis: 83.42},
    81.8: { kazan: 58.90, akis: 83.25},
    81.9: { kazan: 57.89, akis: 83.09},
    82: { kazan: 56.87, akis: 82.89},
    82.1: { kazan: 56.18, akis: 82.79},
    82.2: { kazan: 55.50, akis: 82.54},
    82.3: { kazan: 54.81, akis: 82.41},
    82.4: { kazan: 53.24, akis: 82.18},
    82.5: { kazan: 51.67, akis: 81.82},
    82.6: { kazan: 50.96, akis: 81.76},
    82.7: { kazan: 50.20, akis: 81.61},
    82.8: { kazan: 49.42, akis: 81.37},
    82.9: { kazan: 48.79, akis: 81.30},
    83: { kazan: 48.11, akis: 81.11},
    83.1: { kazan: 47.40, akis: 80.96},
    83.2: { kazan: 46.85, akis: 80.88},
    83.3: { kazan: 46.31, akis: 80.71},
    83.4: { kazan: 45.22, akis: 80.45},
    83.5: { kazan: 44.12, akis: 80.28},
    83.6: { kazan: 43.57, akis: 80.17},
    83.7: { kazan: 43.01, akis: 80.01},
    83.8: { kazan: 41.35, akis: 79.73},
    83.9: { kazan: 40.63, akis: 79.46},
    84: { kazan: 40.31, akis: 79.38},
    84.1: { kazan: 39.98, akis: 79.31},
    84.2: { kazan: 39.66, akis: 79.15},
    84.3: { kazan: 38.53, akis: 78.80},
    84.4: { kazan: 37.96, akis: 78.71},
    84.5: { kazan: 37.40, akis: 78.45},
    84.6: { kazan: 36.83, akis: 78.33},
    84.7: { kazan: 36.25, akis: 78.10},
    84.8: { kazan: 35.11, akis: 77.66},
    84.9: { kazan: 34.53, akis: 77.55},
    85: { kazan: 33.95, akis: 77.21},
    85.1: { kazan: 33.28, akis: 77.10},
    85.2: { kazan: 32.60, akis: 76.77},
    85.3: { kazan: 32.12, akis: 76.68},
    85.4: { kazan: 31.63, akis: 76.33},
    85.5: { kazan: 31.14, akis: 76.22},
    85.6: { kazan: 30.65, akis: 76.10},
    85.7: { kazan: 30.16, akis: 75.70},
    85.8: { kazan: 29.81, akis: 75.59},
    85.9: { kazan: 29.46, akis: 75.48},
    86: { kazan: 29.05, akis: 75.09},
    86.1: { kazan: 28.58, akis: 74.95},
    86.2: { kazan: 28.11, akis: 74.52},
    86.3: { kazan: 27.52, akis: 74.39},
    86.4: { kazan: 26.92, akis: 73.89},
    86.5: { kazan: 26.53, akis: 73.77},
    86.6: { kazan: 26.13, akis: 73.65},
    86.7: { kazan: 25.74, akis: 73.16},
    86.8: { kazan: 25.34, akis: 73.05},
    86.9: { kazan: 24.95, akis: 72.95},
    87: { kazan: 24.55, akis: 72.42},
    87.1: { kazan: 24.25, akis: 72.33},
    87.2: { kazan: 23.95, akis: 72.24},
    87.3: { kazan: 23.65, akis: 72.15},
    87.4: { kazan: 23.35, akis: 71.78},
    87.5: { kazan: 22.95, akis: 71.57},
    87.6: { kazan: 22.55, akis: 71.37},
    87.7: { kazan: 22.15, akis: 70.75},
    87.8: { kazan: 21.55, akis: 70.60},
    87.9: { kazan: 20.95, akis: 69.82},
    88: { kazan: 20.65, akis: 69.73},
    88.1: { kazan: 20.35, akis: 69.63},
    88.2: { kazan: 20.04, akis: 69.54},
    88.3: { kazan: 19.74, akis: 68.78},
    88.4: { kazan: 19.57, akis: 68.66},
    88.5: { kazan: 19.39, akis: 68.54},
    88.6: { kazan: 19.22, akis: 68.42},
    88.7: { kazan: 19.05, akis: 68.30},
    88.8: { kazan: 18.88, akis: 68.19},
    88.9: { kazan: 18.70, akis: 68.07},
    89: { kazan: 18.53, akis: 67.71},
    89.1: { kazan: 17.93, akis: 67.55},
    89.2: { kazan: 17.32, akis: 66.59},
    89.3: { kazan: 17.08, akis: 66.48},
    89.4: { kazan: 16.83, akis: 66.38},
    89.5: { kazan: 16.59, akis: 66.27},
    89.6: { kazan: 16.34, akis: 66.17},
    89.7: { kazan: 16.10, akis: 65.21},
    89.8: { kazan: 15.95, akis: 65.07},
    89.9: { kazan: 15.80, akis: 64.93},
    90: { kazan: 15.65, akis: 64.79},
    90.1: { kazan: 15.50, akis: 64.65},
    90.2: { kazan: 15.34, akis: 64.51},
    90.3: { kazan: 15.19, akis: 64.38},
    90.4: { kazan: 15.04, akis: 64.24},
    90.5: { kazan: 14.89, akis: 63.68},
    90.6: { kazan: 14.48, akis: 63.47},
    90.7: { kazan: 14.07, akis: 63.26},
    90.8: { kazan: 13.66, akis: 62.01},
    90.9: { kazan: 13.42, akis: 61.84},
    91: { kazan: 13.17, akis: 61.66},
    91.1: { kazan: 12.93, akis: 61.49},
    91.2: { kazan: 12.68, akis: 61.32},
    91.3: { kazan: 12.44, akis: 60.11},
    91.4: { kazan: 12.23, akis: 59.94},
    91.5: { kazan: 12.03, akis: 59.77},
    91.6: { kazan: 11.83, akis: 59.60},
    91.7: { kazan: 11.62, akis: 59.43},
    91.8: { kazan: 11.42, akis: 59.26},
    91.9: { kazan: 11.21, akis: 57.89},
    92: { kazan: 11.03, akis: 57.72},
    92.1: { kazan: 10.86, akis: 57.55},
    92.2: { kazan: 10.68, akis: 57.38},
    92.3: { kazan: 10.51, akis: 57.21},
    92.4: { kazan: 10.33, akis: 57.04},
    92.5: { kazan: 10.16, akis: 56.87},
    92.6: { kazan: 9.98, akis: 55.43},
    92.7: { kazan: 9.82, akis: 55.23},
    92.8: { kazan: 9.65, akis: 55.03},
    92.9: { kazan: 9.49, akis: 54.82},
    93: { kazan: 9.32, akis: 54.62},
    93.1: { kazan: 9.16, akis: 54.42},
    93.2: { kazan: 9.00, akis: 54.22},
    93.3: { kazan: 8.83, akis: 54.02},
    93.4: { kazan: 8.67, akis: 52.18},
    93.5: { kazan: 8.52, akis: 51.95},
    93.6: { kazan: 8.36, akis: 51.72},
    93.7: { kazan: 8.21, akis: 51.49},
    93.8: { kazan: 8.05, akis: 51.25},
    93.9: { kazan: 7.90, akis: 51.02},
    94: { kazan: 7.74, akis: 50.79},
    94.1: { kazan: 7.59, akis: 50.56},
    94.2: { kazan: 7.43, akis: 48.44},
    94.3: { kazan: 7.28, akis: 48.17},
    94.4: { kazan: 7.12, akis: 47.90},
    94.5: { kazan: 6.97, akis: 47.63},
    94.6: { kazan: 6.81, akis: 47.36},
    94.7: { kazan: 6.66, akis: 47.09},
    94.8: { kazan: 6.50, akis: 46.82},
    94.9: { kazan: 6.35, akis: 46.55},
    95: { kazan: 6.20, akis: 44.00},
    95.1: { kazan: 6.05, akis: 43.76},
    95.2: { kazan: 5.90, akis: 43.51},
    95.3: { kazan: 5.76, akis: 43.27},
    95.4: { kazan: 5.61, akis: 43.03},
    95.5: { kazan: 5.46, akis: 42.79},
    95.6: { kazan: 5.31, akis: 42.54},
    95.7: { kazan: 5.17, akis: 42.30},
    95.8: { kazan: 5.20, akis: 40.00},
    95.9: { kazan: 4.87, akis: 39.62},
    96: { kazan: 4.73, akis: 39.25},
    96.1: { kazan: 4.58, akis: 38.87},
    96.2: { kazan: 4.43, akis: 38.49},
    96.3: { kazan: 4.28, akis: 38.12},
    96.4: { kazan: 4.14, akis: 37.74},
    96.5: { kazan: 3.99, akis: 37.36},
    96.6: { kazan: 3.84, akis: 36.99},
    96.7: { kazan: 3.71, akis: 32.82},
    96.8: { kazan: 3.58, akis: 32.40},
    96.9: { kazan: 3.46, akis: 31.98},
    97: { kazan: 3.33, akis: 31.56},
    97.1: { kazan: 3.21, akis: 31.14},
    97.2: { kazan: 3.08, akis: 30.71},
    97.3: { kazan: 2.96, akis: 30.29},
    97.4: { kazan: 2.83, akis: 29.87},
    97.5: { kazan: 2.71, akis: 29.45},
    97.6: { kazan: 2.58, akis: 29.03},
    97.7: { kazan: 2.46, akis: 23.76},
    97.8: { kazan: 2.35, akis: 22.89},
    97.9: { kazan: 2.23, akis: 22.02},
    98: { kazan: 2.12, akis: 21.16},
    98.1: { kazan: 2.00, akis: 20.29},
    98.2: { kazan: 1.78, akis: 19.42},
    98.3: { kazan: 1.78, akis: 18.56},
    98.4: { kazan: 1.66, akis: 17.69},
    98.5: { kazan: 1.55, akis: 16.83},
    98.6: { kazan: 1.43, akis: 15.96},
    98.7: { kazan: 1.32, akis: 15.09},
    98.8: { kazan: 1.21, akis: 13.15},
    98.9: { kazan: 1.12, akis: 12.32},
    99: { kazan: 1.00, akis: 11.21},
    99.1: { kazan: 0.88, akis: 10.11},
    99.2: { kazan: 0.76, akis: 8.87},
    99.3: { kazan: 0.63, akis: 7.63},
    99.4: { kazan: 0.50, akis: 6.14},
    99.5: { kazan: 0.37, akis: 4.77},
    99.6: { kazan: 0.25, akis: 3.27},
    99.7: { kazan: 0.19, akis: 2.46},
    99.8: { kazan: 0.13, akis: 1.64},
    99.9: { kazan: 0.01, akis: 0.17},
}


export default function AlcholCube() {

  const [data, setData] = useState([])
  useEffect(() => {
    
    const fetchData = async () => {
      
      try{
        const query = `*[_type == "calculations" && id == "kup_sivi_sicakligi"]`
        const result = await sanityClient.fetch(query)
        setData(result[0])
      }
      catch(err){
        console.log("Veri çekilirken hata meydana geldi!", err)
      }

    }

    fetchData()

  }, [])


  const [boilerTemp, setBoilerTemp] = useState(82.8)
  const [boilerVolume, setBoilerVolume] = useState(3000);
  const [garbage, setGarbage] = useState(150);
  const [stomach, setStomach] = useState(1250);

  const [boilerAlchol, setBoilerAlchol] = useState();
  const [flowAlchol, setFlowAlchol] = useState();
  const [remainAlchol, setRemainAlchol] = useState();
  const [remain, setRemain] = useState();

  const [error, setError] = useState(false);


  const calculate = () => {

    let boiler, flow;
    try {
        boiler = table[boilerTemp].kazan;
        flow = table[boilerTemp].akis;
        setError(false);

        setBoilerAlchol(boiler);
        setFlowAlchol(flow);
        
        const remLiq = boilerVolume - garbage - stomach;
        setRemain(remLiq);

        const remAlc = boiler * remLiq / 100;
        setRemainAlchol(remAlc);



    } catch (err) {
        setError("Kazan Sıcaklığı 79-99.9 Aralığında Olmalıdır!")
    }


  };

  useEffect(() => {
    calculate();
  }, [boilerTemp, boilerVolume, garbage, stomach]);

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/alcholtemp.png" alt="" />
        </div>
        <h1 className="calc-title">
          {data?.title}
        </h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">
          
            <Input
            title="Kazan Sıcaklığı"
            unit="°C"
            value={boilerTemp}
            setter={setBoilerTemp}
            />
            <Input
            title="Kazan İçine Doldurulan Hacim"
            unit="ml"
            value={boilerVolume}
            setter={setBoilerVolume}
            />
            <Input
            title="Çöp+Baş Alınan Miktar"
            unit="ml"
            value={garbage}
            setter={setGarbage}
            />
            <Input
            title="Göbek Kısmından Alınan Miktar"
            unit="ml"
            value={stomach}
            setter={setStomach}
            />

        </div>

        <div className="calc-result">
            {error ? <sm className="text-red-600">{error}</sm> :
            <div className="divide-y space-y-2">
            
            <div className="flex justify-between w-full pt-2">
                <span>Kazan İçindeki Alkol : </span>
                <span><b>{boilerAlchol}</b> %</span>
            </div>

            <div className="flex justify-between w-full pt-2">
                <span>Akış Halindeki Alkol : </span>
                <span><b>{flowAlchol}</b> %</span>
            </div>

            <div className="flex justify-between w-full pt-2">
                <span>Kazanda Kalan Mutlak Alkol : </span>
                <span><b>{remainAlchol}</b> ml</span>
            </div>

            <div className="flex justify-between w-full pt-2">
                <span>Kazanda Kalan Sıvı : </span>
                <span><b>{remain}</b> ml</span>
            </div>


            </div>
            }
        </div>
      </div>

      <div className="accordions">
        {data?.accordions?.length > 0 && (
          data.accordions.map((accordion, index) => (
            <Accordion title={accordion.title} content={accordion.content} key={index} />
          ))
        )}
      </div>
    </div>
  );
}
