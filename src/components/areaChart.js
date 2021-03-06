import React, { Component } from 'react';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './chart.css';

export default class FilledAreaChart extends Component {
	constructor(props){
		super(props);

		this.state = {
			colors: [
				'#e6194b',
				'#3cb44b',
				'#ffe119',
				'#0082c8',
				'#f58231',
				'#911eb4',
				'#46f0f0',
				'#f032e6',
				'#d2f53c',
				'#fabebe',
				'#008080',
				'#e6beff',
				'#fffac8',
				'#800000',
				'#aaffc3'
			]
		};
	}

	render() {
		var labels = [];
		if(this.props.data.length > 0) {
				delete this.props.data[0][this.props.sortBy];
        labels = Object.keys(this.props.data[0]);
		}


		return (
			<div className="chart-container">
				<h2>{this.props.title}</h2>
        <AreaChart width={1500} height={800} data={this.props.data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            {
              labels.map( (label, index) => {
                return (
                  <linearGradient id={"color-"+index} key={index} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={this.state.colors[index]} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={this.state.colors[index]}  stopOpacity={0}/>
                  </linearGradient>
                );
              })
            }
          </defs>
          <XAxis dataKey={this.props.sortBy || 'date'} />
          <YAxis />
          <Tooltip />
          {
            labels.map( (label, index) => {
              return (<Area type="monotone" key={index} dataKey={label} stroke={this.state.colors[index]} fillOpacity={1} fill={"url(#color-"+index+")"} />)
            })
          }
        </AreaChart>
			</div>
		);
	};
}
