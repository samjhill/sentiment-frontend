import React, { Component } from 'react';
import Comment from './comment';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import styled from 'styled-components';

const StyledTabList = styled(TabList)`
	background: #e1e1e1;
	margin: 0;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
`;

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
			    <StyledTabList>
						{labels.map((label, index) => {
							return (<Tab key={index}>{label}</Tab>)
						})}
					</StyledTabList>

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
