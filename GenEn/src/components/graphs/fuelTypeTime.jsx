import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const FuelTypeTime = () => {
    const svgRef = useRef(null);
    const [data, setData] = useState({ data: [], columns: [] });
    const [visibleSeries, setVisibleSeries] = useState({}); // { 'seriesName': true/false }

    useEffect(() => {
        d3.json('/data/FuelTypeTime.json').then(fetchedData => {
            const columns = Object.keys(fetchedData[0]).slice(1); // Exclude 'Year' from columns
            console.log(fetchedData);
            fetchedData.forEach(d => {
                d.Year = new Date(d.Year, 0, 1); // Convert 'Year' to Date object
                console.log(d.Year);
                columns.forEach(col => {
                    d[col] = +d[col]; // Convert values to numbers
                });
            });

            const seriesVisibility = columns.reduce((acc, col) => {
                acc[col] = true; // Initially all series are visible
                return acc;
            }, {});

            setData({ data: fetchedData, columns });
            setVisibleSeries(seriesVisibility);
        }).catch(error => {
            console.error('Error loading the JSON data:', error);
        });
    }, []);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const margin = { top: 20, right: 20, bottom: 30, left: 60 };
        const width = 800 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);
        const customColors = ['#5B84EC', '#469F8D', '#415E46', '#8a97a1', '#ADDAD7', '#FFDD80', '#353535', '#7f7f7f', '#CC3D00', '#574F43'];
        const color = d3.scaleOrdinal(customColors);

        const line = d3.line()
            .x(d => x(d.Year))
            .y(d => y(d.value))
            .curve(d3.curveCatmullRom);

        svg.selectAll('*').remove();

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        if (data.data.length) {
            const { columns } = data;
            const lines = columns.map(col => ({
                name: col,
                values: data.data.map(d => ({ Year: d.Year, value: d[col] }))
            }));

            x.domain(d3.extent(data.data, d => d.Year));
            y.domain([0, d3.max(lines.flatMap(line => line.values.map(d => d.value)))]);

            // Draw the lines
            g.selectAll('.line')
                .data(lines)
                .enter().append('path')
                .attr('class', 'line')
                .attr('d', d => line(d.values))
                .style('stroke', d => color(d.name))
                .style('fill', 'none')
                .style('stroke-width', 4)
                .style('display', d => visibleSeries[d.name] ? 'initial' : 'none');

            // Add X and Y axes
            g.append('g')
                .attr('class', 'x-axis')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(x))
                .attr('font-size', '14px');

            g.append('g')
                .attr('class', 'y-axis')
                .call(d3.axisLeft(y)
                    .tickFormat(d => `${d}MW`)  // Add "MW" to each tick
                    .tickSize(0))  // Remove tick lines (dashes)
                .attr('font-size', '14px')
                .select('.domain')  // Select the axis line
                .remove();          // Remove the Y-axis line

            // Add legend
            const legend = g.append('g')
                .attr('class', 'legend')
                .attr('transform', `translate(${width - 110},72)`);

            legend.selectAll('rect')
                .data(lines)
                .enter().append('rect')
                .attr('x', 0)
                .attr('y', (d, i) => i * 20)
                .attr('width', 18)
                .attr('height', 18)
                .style('fill', d => color(d.name))
                .on('click', (event, d) => {
                    setVisibleSeries(prev => ({
                        ...prev,
                        [d.name]: !prev[d.name]
                    }));
                });

            legend.selectAll('text')
                .data(lines)
                .enter().append('text')
                .attr('x', 30)
                .attr('y', (d, i) => i * 20 + 15)
                .text(d => d.name);
        }
    }, [data, visibleSeries]);

    return (
        <div>
            <div className='PieGraph'>
                <svg ref={svgRef} width={800} height={500}></svg>
            </div>
            <div className="controls">
                {data.columns && data.columns.map(seriesName => (
                    <label key={seriesName}>
                        <input
                            type="checkbox"
                            checked={visibleSeries[seriesName]}
                            onChange={() => setVisibleSeries(prev => ({
                                ...prev,
                                [seriesName]: !prev[seriesName]
                            }))}
                        />
                        {seriesName}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default FuelTypeTime;
