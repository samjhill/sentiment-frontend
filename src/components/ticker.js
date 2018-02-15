import React, { Component } from 'react';
import SimpleTooltip from "react-simple-tooltip";
import './ticker.css';

export default class Ticker extends Component {
	render() {
		var diff = parseInt(this.props.item.price - this.props.item.min);
		var pct = Math.round((diff / this.props.item.price) * 100);

		var tooltip = '';
			switch(this.props.item.type) {
				case 'ebay':
					tooltip = 'Trade 1 BTC for this many dollars worth of eBay Gift Cards.';
					break;
				case 'amazon':
						tooltip = 'Trade 1 BTC for this many dollars worth of Amazon Gift Cards';
						break;
				case 'btcusd':
						tooltip = 'Trade 1 BTC for this many USD. Source: blockchain.info';
						break;
				case 'S&P 500':
						tooltip = 'An index of top-performing companies in the USA';
						break;
				case 'SSE Composite Index':
								tooltip = 'An index of Shanghai companies. I do not really know too much about this; just included for a window into China.';
								break;
				case 'BITCOIN INVT TR':
								tooltip = 'A company that holds Bitcoin and some other cryptos. Stock ticker: NYSE:GBTC.';
								break;
			};


		return (
			<SimpleTooltip content={tooltip} placement="bottom" fontSize="1rem">
				<a className="ticker" target="_blank" href={
						typeof this.props.item.link == 'undefined'
						? '#'
						: "https://localbitcoins.com" + this.props.item.link
					}>
					  <span className="pairName">{this.props.item.type}</span>
						<span className="price">${parseInt(this.props.item.price)}</span>
						<span className={"dailyChange " + (diff > 0 ? 'positive' : 'negative') }>${diff} ({pct}%)</span>
				</a>
			</SimpleTooltip>
		);
	};
}
