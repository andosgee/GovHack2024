import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 900;
    const height = 600;
    const margin = { top: 40, right: 80, bottom: 40, left: 50 };

    // Create the SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Parse the data
    d3.csv('/data/GenEn_CapacityVsDemand.csv').then(data => {
      data.forEach(d => {
        d.Year = +d.Year;
        d.AiForcast = +d.AiForcast;
        d.CapacityLow = +d.CapacityLow;
        d.CapacityHigh = +d.CapacityHigh;
        d.Reference = +d.Reference;
      });

      const xScale = d3.scaleLinear()
        .domain([2008, 2050])
        .range([0, innerWidth]);

      const yScale = d3.scaleLinear()
        .domain([d3.min(data, d => Math.min(d.CapacityLow, d.CapacityHigh, d.AiForcast, d.Reference)) - 1, 
                 d3.max(data, d => Math.max(d.CapacityLow, d.CapacityHigh, d.AiForcast, d.Reference)) + 1])
        .range([innerHeight, 0]);

      // Smooth lines using d3.curveMonotoneX for smoothness
      const line = d3.line()
        .x(d => xScale(d.Year))
        .y(d => yScale(d.AiForcast))
        .curve(d3.curveMonotoneX);  // Smooth curve

      const line2 = d3.line()
        .x(d => xScale(d.Year))
        .y(d => yScale(d.CapacityLow))
        .curve(d3.curveMonotoneX);  // Smooth curve

      const line3 = d3.line()
        .x(d => xScale(d.Year))
        .y(d => yScale(d.CapacityHigh))
        .curve(d3.curveMonotoneX);  // Smooth curve

      const line4 = d3.line()
        .x(d => xScale(d.Year))
        .y(d => yScale(d.Reference))
        .curve(d3.curveMonotoneX);  // Smooth curve

      // Add x-axis
      const xAxis = svg.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format('d')));

      // Remove axis line and ticks for x-axis
      xAxis.select('.domain').remove(); // Remove x-axis border line
      xAxis.selectAll('line').remove(); // Remove tick lines

      // Remove y-axis completely
      // Note: No y-axis code is needed now

      // Add AiForcast line
      svg.append('path')
        .data([data])
        .attr('fill', 'none')
        .attr('stroke', '#4caf50')
        .attr('stroke-width', 3)
        .attr('d', line);

      // Add CapacityLow line
      svg.append('path')
        .data([data])
        .attr('fill', 'none')
        .attr('stroke', '#84cceb')
        .attr('stroke-width', 3)
        .attr('d', line2);

      // Add CapacityHigh line
      svg.append('path')
        .data([data])
        .attr('fill', 'none')
        .attr('stroke', '#41d8d3')
        .attr('stroke-width', 3)
        .attr('d', line3);

      // Add Reference line
      svg.append('path')
        .data([data])
        .attr('fill', 'none')
        .attr('stroke', '#5b84ec')
        .attr('stroke-width', 3)
        .attr('d', line4);

      // Function to add markers and labels only at the last data point
      const addMarkersAndLabelsToEnd = (lineColor, yValue, label) => {
        const lastDataPoint = data[data.length - 1]; // Get the last data point
        const marker = svg.append('circle')
          .attr('cx', xScale(lastDataPoint.Year))
          .attr('cy', yScale(lastDataPoint[yValue]))
          .attr('r', 8)
          .attr('fill', 'White')
          .attr('stroke', lineColor)
          .attr('stroke-width', 3);

        // Add text labels near the markers
        svg.append('text')
          .attr('x', xScale(lastDataPoint.Year) + 10)
          .attr('y', yScale(lastDataPoint[yValue]) - 10)
          .attr('fill', 'Black')
          .attr('font-weight', 'bold')
          .attr('font-size', '14px')
          .text(`${lastDataPoint[yValue]} TWh`);
      };

      // Add markers and labels at the last data points
      addMarkersAndLabelsToEnd('#4caf50', 'AiForcast', 'AiForcast');
      addMarkersAndLabelsToEnd('#84cceb', 'CapacityLow', 'CapacityLow');
      addMarkersAndLabelsToEnd('#41d8d3', 'CapacityHigh', 'CapacityHigh');
      addMarkersAndLabelsToEnd('#5b84ec', 'Reference', 'Reference');

      // Add title
      svg.append('text')
        .attr('x', innerWidth / 2)
        .attr('y', -20)
        .attr('text-anchor', 'middle')
        .attr('font-size', '20px')
        .attr('font-weight', 'bold')
        .text('Capacity vs Forecast from 2008 to 2050');

      // Move legend to top-left corner
      const legend = svg.append('g')
        .attr('transform', `translate(0, -20)`);

      const categories = ['AiForcast', 'CapacityLow', 'CapacityHigh', 'Reference'];
      const colors = ['#4caf50', '#84cceb', '#41d8d3', '#5b84ec'];

      categories.forEach((category, i) => {
        const legendRow = legend.append('g')
          .attr('transform', `translate(0, ${i * 20})`);

        legendRow.append('rect')
          .attr('width', 10)
          .attr('height', 10)
          .attr('fill', colors[i]);

        legendRow.append('text')
          .attr('x', 20)
          .attr('y', 10)
          .attr('text-anchor', 'start')
          .style('text-transform', 'capitalize')
          .text(category);
      });
    });

  }, []);

  return <svg className="hero-graph" ref={svgRef}></svg>;
};

export default LineChart;