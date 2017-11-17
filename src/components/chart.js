import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import SimpleTooltip from "react-simple-tooltip";
import './chart.css';

export default class Chart extends Component {
	constructor(props){
		super(props);

		this.state = {
			colors: [
				'#0cab11',
				'#400000',
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

		var tooltip;
		if(this.props.tooltip) {
			tooltip =
			(<SimpleTooltip
					content={this.props.tooltip}
					placement="bottom"
					fontSize="1rem">
						<i className="fa fa-question"></i>
					</SimpleTooltip>
			);
		}

		return (
			<div className="chart-container">
				<h2>{this.props.title} {tooltip}</h2>
	      <LineChart width={600} height={600} margin={{top: 5, right: 30, left: 20, bottom: 5}} data={this.props.data}>
						{
							labels.map( (label, index) => {
								return (<Line type="monotone" key={index} dataKey={label} stroke={this.state.colors[index]} />)
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
