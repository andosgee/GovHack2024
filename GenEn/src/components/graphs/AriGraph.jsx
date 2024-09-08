import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    {
        "Type": "Current",
        "Geothermal": 1042.1,
        "Coal": 250,
        "Wind": 994.15,
        "Biomass": 32.6,
        "Thermal": "1,245.22",
        "Hydro": 5679.655,
        "Solar PV": 283.55,
        "Batteries": 35,
        "Total": 9527.27804115148
    },
    {
        "Type": 1,
        "Geothermal": 1241.74,
        "Coal": 150.18,
        "Wind": "1,231.87",
        "Biomass": 32.6,
        "Thermal": "1,096.71",
        "Hydro": 5679.655,
        "Solar PV": 283.55,
        "Batteries": 135,
        "Total": 9716.30804115148
    },
    {
        "Type": 2,
        "Geothermal": 1441.38,
        "Coal": 50.36,
        "Wind": "1,231.87",
        "Biomass": 32.6,
        "Thermal": "1,096.71",
        "Hydro": 5679.655,
        "Solar PV": 283.55,
        "Batteries": 135,
        "Total": 9816.12804115148
    },
    {
        "Type": 3,
        "Geothermal": 1641.02,
        "Coal": 50.36,
        "Wind": "1,231.87",
        "Biomass": 32.6,
        "Thermal": 948.2,
        "Hydro": 5679.655,
        "Solar PV": 283.55,
        "Batteries": 135,
        "Total": 9867.25804115149
    },
    {
        "Type": 4,
        "Geothermal": 1740.84,
        "Coal": 50.36,
        "Wind": "1,231.87",
        "Biomass": 32.6,
        "Thermal": 948.2,
        "Hydro": 5679.655,
        "Solar PV": 283.55,
        "Batteries": 135,
        "Total": 9967.07804115148
    },
    {
        "Type": 5,
        "Geothermal": 1840.66,
        "Coal": 50.36,
        "Wind": "1,231.87",
        "Biomass": 32.6,
        "Thermal": 799.69,
        "Hydro": 5679.655,
        "Solar PV": 283.55,
        "Batteries": 135,
        "Total": 9918.38804115148
    },
    {
        "Type": 6,
        "Geothermal": 1940.48,
        "Coal": 50.36,
        "Wind": "1,231.87",
        "Biomass": 32.6,
        "Thermal": 799.69,
        "Hydro": 5679.655,
        "Solar PV": 283.55,
        "Batteries": 135,
        "Total": 10018.2080411515
    },
    {
        "Type": 7,
        "Geothermal": 2140.12,
        "Coal": 50.36,
        "Wind": "1,231.87",
        "Biomass": 32.6,
        "Thermal": 651.18,
        "Hydro": 5679.655,
        "Solar PV": 283.55,
        "Batteries": 135,
        "Total": 10069.3380411515
    },
    {
        "Type": 8,
        "Geothermal": 2239.94,
        "Coal": 50.36,
        "Wind": "1,231.87",
        "Biomass": 32.6,
        "Thermal": 651.18,
        "Hydro": 5679.655,
        "Solar PV": 283.55,
        "Batteries": 135,
        "Total": 10169.1580411515
    },
    {
        "Type": 9,
        "Geothermal": 2339.76,
        "Coal": 50.36,
        "Wind": "1,231.87",
        "Biomass": 32.6,
        "Thermal": 502.67,
        "Hydro": 5679.655,
        "Solar PV": 283.55,
        "Batteries": 135,
        "Total": 10120.4680411515
    },
    {
        "Type": 10,
        "Geothermal": 2439.58,
        "Coal": 50.36,
        "Wind": "1,231.87",
        "Biomass": 32.6,
        "Thermal": 502.67,
        "Hydro": 5679.655,
        "Solar PV": 283.55,
        "Batteries": 135,
        "Total": 10220.2880411515
    },
    {
        "Type": 11,
        "Geothermal": 2539.4,
        "Coal": 50.36,
        "Wind": "1,231.87",
        "Biomass": 32.6,
        "Thermal": 354.16,
        "Hydro": 5679.655,
        "Solar PV": 283.55,
        "Batteries": 135,
        "Total": 10171.5980411515
    },
    {
        "Type": 12,
        "Geothermal": 2639.22,
        "Coal": 50.36,
        "Wind": "1,231.87",
        "Biomass": 32.6,
        "Thermal": 354.16,
        "Hydro": 5679.655,
        "Solar PV": 283.55,
        "Batteries": 135,
        "Total": 10271.4180411515
    },
    {
        "Type": 13,
        "Geothermal": 2739.04,
        "Coal": 50.36,
        "Wind": "1,231.87",
        "Biomass": 32.6,
        "Thermal": 354.16,
        "Hydro": 5679.655,
        "Solar PV": 283.55,
        "Batteries": 135,
        "Total": 10371.2380411515
    },
    {
        "Type": 14,
        "Geothermal": 2838.86,
        "Coal": 50.36,
        "Wind": "1,231.87",
        "Biomass": 32.6,
        "Thermal": 354.16,
        "Hydro": 5679.655,
        "Solar PV": 283.55,
        "Batteries": 135,
        "Total": 10471.0580411515
    },
    {
        "Type": 15,
        "Geothermal": 2938.68,
        "Coal": 50.36,
        "Wind": "1,231.87",
        "Biomass": 32.6,
        "Thermal": 354.16,
        "Hydro": 5679.655,
        "Solar PV": 283.55,
        "Batteries": 135,
        "Total": 10570.8780411515
    },
    {
        "Type": 16,
        "Geothermal": 2938.68,
        "Coal": 50.36,
        "Wind": "1,231.87",
        "Biomass": 32.6,
        "Thermal": 354.16,
        "Hydro": 5679.655,
        "Solar PV": 283.55,
        "Batteries": 135,
        "Total": 10570.8780411515
    },
    {
        "Type": 17,
        "Geothermal": 3038.5,
        "Coal": 50.36,
        "Wind": "1,231.87",
        "Biomass": 32.6,
        "Thermal": 354.16,
        "Hydro": 5679.655,
        "Solar PV": 283.55,
        "Batteries": 135,
        "Total": 10670.6980411515
    },
    {
        "Type": 18,
        "Geothermal": 3038.5,
        "Coal": 50.36,
        "Wind": "1,231.87",
        "Biomass": 32.6,
        "Thermal": 354.16,
        "Hydro": 5679.655,
        "Solar PV": 283.55,
        "Batteries": 135,
        "Total": 10670.6980411515
    },
    {
        "Type": 19,
        "Geothermal": 3138.32,
        "Coal": 50.36,
        "Wind": "1,231.87",
        "Biomass": 32.6,
        "Thermal": 354.16,
        "Hydro": 5679.655,
        "Solar PV": 283.55,
        "Batteries": 135,
        "Total": 10770.5180411515
    },
    {
        "Type": 20,
        "Geothermal": 3138.32,
        "Coal": 50.36,
        "Wind": "1,231.87",
        "Biomass": 32.6,
        "Thermal": 354.16,
        "Hydro": 5679.655,
        "Solar PV": 283.55,
        "Batteries": 135,
        "Total": 10770.5180411515
    },
    {
        "Type": 21,
        "Geothermal": 3238.14,
        "Coal": 50.36,
        "Wind": "1,231.87",
        "Biomass": 32.6,
        "Thermal": 354.16,
        "Hydro": 5679.655,
        "Solar PV": 283.55,
        "Batteries": 135,
        "Total": 10870.3380411515
    },
    {
        "Type": 22,
        "Geothermal": 3238.14,
        "Coal": 50.36,
        "Wind": "1,231.87",
        "Biomass": 32.6,
        "Thermal": 354.16,
        "Hydro": 5679.655,
        "Solar PV": 283.55,
        "Batteries": 135,
        "Total": 10870.3380411515
    },
    {
        "Type": 23,
        "Geothermal": 3337.96,
        "Coal": 50.36,
        "Wind": "1,231.87",
        "Biomass": 32.6,
        "Thermal": 354.16,
        "Hydro": 5679.655,
        "Solar PV": 283.55,
        "Batteries": 135,
        "Total": 10970.1580411515
    },
    {
        "Type": 24,
        "Geothermal": 3337.96,
        "Coal": 50.36,
        "Wind": "1,231.87",
        "Biomass": 32.6,
        "Thermal": 354.16,
        "Hydro": 5679.655,
        "Solar PV": 283.55,
        "Batteries": 135,
        "Total": 10970.1580411515
    },
    {
        "Type": 25,
        "Geothermal": 3337.96,
        "Coal": 50.36,
        "Wind": "1,231.87",
        "Biomass": 32.6,
        "Thermal": 354.16,
        "Hydro": 5679.655,
        "Solar PV": 283.55,
        "Batteries": 135,
        "Total": 10970.1580411515
    },
    {
        "Type": 26,
        "Geothermal": 3337.96,
        "Coal": 50.36,
        "Wind": "1,231.87",
        "Biomass": 32.6,
        "Thermal": 354.16,
        "Hydro": 5679.655,
        "Solar PV": 283.55,
        "Batteries": 135,
        "Total": 10970.1580411515
    }
]; 

const toPercent = (decimal, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`; const getPercent = (value, total) => {
    const ratio = total > 0 ? value / total : 0; return toPercent(ratio, 2);
}; 

const renderTooltipContent = (o) => {
    const { payload, label } = o;
    const total = payload.reduce((result, entry) => result + entry.value, 0); return (
        <div className="customized-tooltip-content">
            <p className="total">{`${label} (${total})`}</p>
            <ul className="list">
                {payload.map((entry, index) => (
                    <li key={`item-${index}`} style={{ color: entry.color }}>
                        {`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
                    </li>
                ))}
            </ul>
        </div>
    );
}; 

export default class AriGraph extends PureComponent {
    render() {
        return (
            <ResponsiveContainer width="65%" height="100%">
                <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    stackOffset="expand"
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Type" />
                    <YAxis tickFormatter={toPercent} />
                    <Tooltip content={renderTooltipContent} />
                    <Area type="monotone" dataKey="Geothermal" stackId="1" stroke="#8884D8
" fill="#8884D8
" />
                    <Area type="monotone" dataKey="Coal" stackId="1" stroke="#82CA9D
" fill="#82CA9D
" />
                    <Area type="monotone" dataKey="Wind" stackId="1" stroke="#FFC658
" fill="#FFC658
" />
                    <Area type="monotone" dataKey="Biomass" stackId="1" stroke="#FFC658
" fill="#FFC658
" />
                    <Area type="monotone" dataKey="Thermal" stackId="1" stroke="#8884D8
" fill="#8884D8
" />
                    <Area type="monotone" dataKey="Hydro" stackId="1" stroke="#82CA9D
" fill="#82CA9D
" />
                    <Area type="monotone" dataKey="Solar PV" stackId="1" stroke="#FFC658
" fill="#FFC658
" />
                </AreaChart>
            </ResponsiveContainer>
        );
    }
}