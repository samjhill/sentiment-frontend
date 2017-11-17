import React, { Component } from 'react';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './chart.css';

export default class FilledAreaChart extends Component {
	constructor(props){
		super(props);

		this.state = {
			colors: [
				'#400000',
				'#2e5785',
				'#00dcff',
				'#ccff00',
				'#ff00bc',
				'#02213c',
				'tomato',
				'bisque',
				'cornflowerblue'
			]
		};
	}

	render() {
		var labels = [];
		if(this.props.data.length > 0) {
				labels = Object.keys(this.props.data[0]);
		}

		return (
			<div className="chart-container">
				<h2>{this.props.title}</h2>
        <AreaChart width={600} height={600} data={this.props.data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            {
              labels.map( (label, index) => {
                return (
                  <linearGradient id={"color-"+label} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={this.state.colors[index]} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={this.state.colors[index]}  stopOpacity={0}/>
                  </linearGradient>
                );
              })
            }
          </defs>
          <XAxis dataKey={this.props.sortBy || 'date'} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          {
            labels.map( (label, index) => {
              return (<Area type="monotone" dataKey={label} stroke={this.state.colors[index]} fillOpacity={1} fill={"url(#color-"+label+")"} />)
            })
          }
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
          <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
			</div>
		);
	};
}
