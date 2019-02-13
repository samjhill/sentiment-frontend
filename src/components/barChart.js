import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ReferenceLine, Label } from 'recharts';
import SimpleTooltip from "react-simple-tooltip";
import './chart.css';

export default class CustomBarChart extends Component {
	constructor(props){
		super(props);
		this.state = {
			colors: [
        '#ffe119',
        '#3cb44b',
				'#e6194b',
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
		if(!this.props.data) {
			return null;
		}
		if(this.props.data.length > 0) {
				this.props.data.map(datum => {
						const keys = Object.keys(datum);
						keys.map(keyName => {
							if (labels.indexOf(keyName) === -1) {
								labels.push(keyName);
							}
						})
				});
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
	      <BarChart width={1500} height={700} margin={{top: 5, right: 30, left: 20, bottom: 0}} data={this.props.data}>
						{
							labels.map( (label, index) => {
								return (<Bar key={index} dataKey={label} fill={this.state.colors[index]} />)
							})
						}
            <ReferenceLine y={0} stroke='#000'/>
						<XAxis ticks={this.props.ticks} dataKey={this.props.sortBy || 'date'}>
              <Label value={this.props.xAxisLabel} offset={40} position="insideBottom" />
            </XAxis>
						<YAxis label={{ value: this.props.yAxisLabel, angle: -90, position: 'insideLeft' }}>
            </YAxis>
			     <Legend />
	      </BarChart>
			</div>
		);
	};
}
