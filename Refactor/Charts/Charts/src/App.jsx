import React, { useState, useEffect } from 'react';
import Chart from './GraphModel/GraphModel.jsx';
import FuelTypeGraph from './GraphModel/FuelTypeGraph.jsx';
import FuelTypeTime from './GraphModel/FuelTypeTime.jsx';
import './App.css';

function App() {
    return (
      <div className='Chart1'>
      <h1>CSV Data Chart</h1>
      <Chart />
      <h1>Bar Chart</h1>
      <FuelTypeGraph />
      <h1>Line Graph</h1>
      <FuelTypeTime />
    </div>
    );
}
export default App;