import React, { useState, useEffect, useCallback } from 'react';
import PieChart from "./graphs/EnergyConsumptionPieGraphModel";
import AriGraph from "./graphs/AriGraph";
import LineChart from './graphs/CapacityVsDemand'
import FuelTypeGraph from "./graphs/FuelType";
import FuelTypeTime from './graphs/fuelTypeTime';

export default function GraphSection() {
    const [currentGraph, setCurrentGraph] = useState(null);

    const handleButtonClick = useCallback((event) => {
        const buttonId = event.target.id;
        switch (buttonId) {
            case 'pie-graph':
                setCurrentGraph(<PieChart />);
                break;
            case 'bar-graph':
                setCurrentGraph(<FuelTypeGraph />);
                break;
            case 'line-graph':
                setCurrentGraph(<FuelTypeTime />)
                break;
            default:
                setCurrentGraph(null);
                break;
        }
    }, []);

    useEffect(() => {
        const pieGraphButton = document.getElementById('pie-graph');
        const barGraphButton = document.getElementById('bar-graph');
        const lineGraphButton = document.getElementById('line-graph');

        pieGraphButton.addEventListener('click', handleButtonClick);
        barGraphButton.addEventListener('click', handleButtonClick);
        lineGraphButton.addEventListener('click', handleButtonClick);

        return () => {
            pieGraphButton.removeEventListener('click', handleButtonClick);
            barGraphButton.removeEventListener('click', handleButtonClick);
            lineGraphButton.removeEventListener('click', handleButtonClick);

        };
    }, [handleButtonClick]);

    return (
        <>
        <div style={{display: "flex", justifyContent: "space-around"}}>
            <div id="display-graph" style={{ display: "flex", height: "70vh", width: "55vw", border: "2px solid black", margin: "0 0 2.5vh .5vw", alignItems: "center", justifyContent: "center", overflow: "hidden"}}>
                {currentGraph}
            </div>
            <div style={{width: "40%"}}>
                <p style={{fontSize: "2em", fontWeight: "bold", margin: "6.5vh 0 4.5vh 0"}}>Our current energy grid relies on 24% non-renewable energy sources, which are harmful to the environment and expensive to maintain.</p>
                <p style={{fontSize: "1.5em"}}>However, 76% of New Zealand's energy comes from renewable sources, primarily hydro. Unfortunately, climate change is affecting hydro power, causing significant stability issues in New Zealand's power supply.</p>
                <p style={{fontSize: "1.2em", margin: "3.5vh 0 0"}}>Diesel, coal, and gas are non-renewable sources that generate a significant portion of our power, especially when the grid is near maximum capacity. This is crucial for our current power grid, as we wouldn't be able to meet demand without them. Hydro, solar, and wind are all renewable sources, but their power output fluctuates. Geothermal energy, on the other hand, is a renewable source that can be controlled, allowing for a smoother and more stable power grid.</p>
            </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-evenly", width: "55%", marginBottom: "10vh" }}>
                <button style={{height: "4.5vh", backgroundColor: "white", width: "14vw", borderRadius: "10px"}} id="pie-graph">Renewable vs Non-Renewable</button>
                <button style={{height: "4.5vh", backgroundColor: "white", width: "14vw", borderRadius: "10px"}} id="bar-graph">Renewable Energy by Fuel Type - Bar Graph</button>
                <button style={{height: "4.5vh", backgroundColor: "white", width: "14vw", borderRadius: "10px"}} id="line-graph">Renewable Energy by Fuel Type - Line Graph</button>
            </div>

            <div style={{ height: "65vh", width: "100%", display: "flex" }}>
                <div style={{ width: "30%", margin: "2.5vh 5vw 0 5vw" }}>
                    <p style={{fontSize: "2em", fontWeight: "bold"}}>Estimated path to Renewable Energy: 2024 - 2040</p>
                    <p style={{fontSize: "1.5em"}}>As we strive to combat the rising energy prices in New Zealand and work towards a sustainable future, it is crucial to carefully consider the path our society will choose.</p>
                    <p style={{fontSize: "1.2em"}}>To determine the best energy solutions, we decided to use metrics such as Long-Run Marginal Cost (LRMC) per megawatt-hour (MWh) and sustainability.
                    When evaluating these factors to keep costs down, ensure sufficient power for future projects, and handle peak power usage, it became clear that geothermal energy is the cleanest and most effective path forward. By consistently investing in new geothermal sites, we can reduce our reliance on non-renewable power sources. Additionally, diversifying into wind energy will create a more stable ecosystem for power sources in New Zealand.</p>
                    <p style={{fontSize: "1.2em", fontWeight: "bold"}}>
                    This approach allows us to create a sustainable and reliable energy future that every Kiwi can be proud of!
                    </p>
                </div>
                <AriGraph />
            </div>

            
        </>
    );
}