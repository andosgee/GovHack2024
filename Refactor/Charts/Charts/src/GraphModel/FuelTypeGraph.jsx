import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import "./GraphModel.css";

const FuelTypeGraph = () => {
    const svgRef = useRef(null);
  
    useEffect(() => {
      // Chart Dimensions
      const width = 900;
      const height = 600;
      const margin = { top: 50, right: 50, bottom: 60, left: 100 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
  
      // Setup SVG
      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

        svg.append('text')
        .attr('x', innerWidth / 2) // Center the title
        .attr('y', -margin.top / 2) // Place it at the top
        .attr('text-anchor', 'middle')
        .attr('font-size', '24px')
        .attr('font-weight', 'bold')
        .text('Fuel Types in GWh');
  
      // Load CSV Data
      d3.csv('/data/FuelTypeGW.csv').then(data => {
        // Convert 'value' to a number
        data.forEach(d => {
          d.value = +d.value;
        });
  
        // X Scale (Fuel Types)
        const xScale = d3.scaleBand()
          .domain(data.map(d => d.name))
          .range([0, innerWidth])
          .padding(0.1); // Space between bars
  
        // Y Scale (Fuel Values)
        const yScale = d3.scaleLinear()
          .domain([0, d3.max(data, d => d.value)])
          .range([innerHeight, 0]);

        const colorScale = d3.scaleOrdinal()
          .domain(data.map(d => d.name)) // Use 'name' field as the domain
          .range(['#2F4F4F', '#8B4513', '#4682B4', '#FF6347', '#1E90FF', '#FFD700', '#87CEEB', '#808080']); // Define custom colors
  
        // Draw the bars
        svg.selectAll('rect')
          .data(data)
          .enter()
          .append('rect')
          .attr('x', d => xScale(d.name))
          .attr('y', d => yScale(d.value))
          .attr('width', xScale.bandwidth())
          .attr('height', d => innerHeight - yScale(d.value))
          .attr('fill', d => colorScale(d.name));
  
        // X Axis
        svg.append('g')
          .attr('transform', `translate(0,${innerHeight})`)
          .call(d3.axisBottom(xScale))
          .selectAll('text')
          .attr('transform', 'rotate(-40)')
          .attr('text-anchor', 'end')
          .style('fill', 'black');
  
        // Y Axis
        svg.append('g')
          .call(d3.axisLeft(yScale))
          .selectAll('text')
          .style('fill', 'black');

        svg.selectAll('.domain, .tick line')
          .style('stroke', 'black');

          svg.append('text')
          .attr('transform', 'rotate(-90)')
          .attr('x', -innerHeight / 2) // Center the label along the y-axis
          .attr('y', -margin.left + 20) // Position it to the left of the y-axis
          .attr('text-anchor', 'middle')
          .attr('font-size', '16px')
          .attr('font-weight', 'bold')
          .text('Measured in GWh');

          svg.append('text')
          .attr('x', innerWidth / 2)
          .attr('y', innerHeight + margin.bottom-10) 
          .attr('text-anchor', 'middle')
          .attr('font-size', '16px')
          .attr('font-weight', 'bold')
          .text('Fuel Type');
  
        // Add labels
        svg.selectAll('text.bar')
          .data(data)
          .enter()
          .append('text')
          .attr('class', 'bar')
          .attr('text-anchor', 'middle')
          .attr('x', d => xScale(d.name) + xScale.bandwidth() / 2)
          .attr('y', d => yScale(d.value) - 5) // Slightly above the bar
          .text(d => d.value)
          .style('fill', 'black');
  
      }).catch(error => {
        console.error('Error loading the CSV data:', error);
      });
    }, []);
  
    return <div className='PieGraph'><svg ref={svgRef}></svg></div>;
  };

export default FuelTypeGraph;

