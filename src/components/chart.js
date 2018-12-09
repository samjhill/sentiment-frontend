import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import SimpleTooltip from "react-simple-tooltip";
import './chart.css';

export default class Chart extends Component {
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

		var tooltip;
		if(this.props.tooltip) {
			tooltip =
			(<SimpleTooltip
					content={this.props.tooltip}
					placement="bottom"
					fontSize="1.7rem">
						<i className="fa fa-question"></i>
					</SimpleTooltip>
			);
		}

		return (
			<div className="chart-container">
				<h2>{this.props.title} {tooltip}</h2>
	      <LineChart width={1500} height={800} margin={{top: 5, right: 30, left: 20, bottom: 5}} data={this.props.data}>
						{
							labels.map( (label, index) => {
								return (<Line dot={false} type="monotone" key={index} dataKey={label} stroke={this.state.colors[index]} />)
							})
						}
						<XAxis dataKey={this.props.sortBy || 'date'} />
						<YAxis label={this.props.yAxisLabel}/>
						<Tooltip/>
			     <Legend />
	      </LineChart>
			</div>
		);
	};
}
