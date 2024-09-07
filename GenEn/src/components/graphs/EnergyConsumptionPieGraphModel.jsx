import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    // Define the dimensions of the chart
    const width = 800;
    const height = 400;
    const radius = Math.min(width, height) / 2 - 40; // Adjust margin as needed

    // Set up the SVG element
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Add the title above the pie chart
    svg.append('text')
      .attr('x', 0)
      .attr('y', -height / 2 + 20)
      .attr('text-anchor', 'middle')
      .attr('font-size', '24px')
      .attr('font-weight', 'bold')
      .text('Power Types in NZ, MW/H');

    // Load the CSV data
    d3.csv('/data/sample.csv').then(data => {
      // Parse and transform the data as needed
      data.forEach(d => {
        d.value = +d.value; // Convert the value to a number
      });

      // Calculate total value for percentage calculation
      const total = d3.sum(data, d => d.value);

      // Calculate percentages
      data.forEach(d => {
        d.percent = ((d.value / total) * 100).toFixed(2); // Percentage with 2 decimal places
      });

      // Define pie layout
      const pie = d3.pie()
        .value(d => d.value)
        .sort(null); // Optional: to maintain the order in the CSV

      // Define arc generator
      const arc = d3.arc()
        .outerRadius(radius)
        .innerRadius(0); // For a full pie chart, use 0 for the inner radius

      // Define color scale
      const color = d3.scaleOrdinal(d3.schemeCategory10);

      // Draw pie slices
      svg.selectAll('path')
        .data(pie(data))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.name))
        .attr('stroke', 'white')
        .attr('stroke-width', '1px')
        .on('mouseover', function(event, d) {
          d3.select(this).attr('fill', 'orange');

          // Show the percentage
          svg.append('text')
            .attr('class', 'percent-label')
            .attr('transform', `translate(${arc.centroid(d)})`)
            .attr('dy', '.35em')
            .attr('text-anchor', 'middle')
            .attr('font-size', '14px')
            .attr('font-weight', 'bold')
            .text(`${d.data.percent}%`);
        })
        .on('mouseout', function(event, d) {
          d3.select(this).attr('fill', color(d.data.name));

          // Remove the percentage label
          svg.selectAll('.percent-label').remove();
        });

      // Create a legend
      const legend = d3.select(svgRef.current)
        .append('g')
        .attr('transform', `translate(${width / 2 + radius + 60},${40})`); // Adjust position as needed

      const legendItemHeight = 20;
      const legendPadding = 10;
      const legendItems = legend.selectAll('.legend')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', (d, i) => `translate(0, ${i * (legendItemHeight + legendPadding)})`);

      // Add colored rectangles to the legend
      legendItems.append('rect')
        .attr('x', 0)
        .attr('width', legendItemHeight)
        .attr('height', legendItemHeight)
        .attr('fill', d => color(d.name));

      // Add text to the legend
      legendItems.append('text')
        .attr('x', legendItemHeight + legendPadding)
        .attr('dy', legendItemHeight / 2)
        .attr('alignment-baseline', 'middle')
        .text(d => `${d.name}: ${d.value}`);
    });

  }, []);

  return <div className='PieGraph'><svg ref={svgRef}></svg></div>;
};

export default PieChart;
