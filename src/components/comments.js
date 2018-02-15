import React, { Component } from 'react';
import Comment from './comment';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default class Comments extends Component {
	constructor(props) {
		super(props);
    this.state = { tabIndex: 1 };
  }

	render() {
    const labels = this.props.comments.map((comment, index) => {
        return comment.label;
    });

		return (
			<div className="comments">
				<h2>/r/BitcoinMarkets Daily Comments</h2>
				<Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({tabIndex})}>
			    <TabList>
						{labels.map((label, index) => {
							return (<Tab key={index}>{label}</Tab>)
						})}
					</TabList>

	  			{this.props.comments.map((comment, index) => {
	          return (
							<TabPanel key={index}>
		            <Comment item={comment} tooltip={"This is the "+comment.label+" comment from the /r/BitcoinMarkets daily thread."} />
							</TabPanel>
						);
	        })}
	      </Tabs>
			</div>
		);
	};
}
