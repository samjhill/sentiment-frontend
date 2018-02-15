import React, { Component } from 'react';
import './newsFeed.css';

export default class NewsFeed extends Component {
	buildNewsItem(title, description, href) {
		return (<a className="news-item" target="_blank" href={href}>
				<span className="title">{title}</span>
				<span className="description">{description}</span>
		</a>)
	};

	render() {
    var searchTerms = Object.keys(this.props.data);

		if(this.props.data['bitcoin']) {
			this.props.data['bitcoin'].map((article, i) => {
				console.log(article);
			});
		}

		return (
				<div className="news-feed">
					  {searchTerms.map((item, index) => {
              return this.props.data[item].map((article, i) => {
								return this.buildNewsItem(article.title, article.description, article.link)
              })
            })}
				</div>
		);
	};
}
