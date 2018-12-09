import React, { Component } from 'react';
import styled from 'styled-components';

const StyledFeed = styled.div`
	display: inline-block;
	background: none;
`;

const StyledNewsItem = styled.a`
	display: block;
	text-decoration: none;
	background: white;
	margin-bottom: 1rem;
	color: black;
	padding: .5rem;
	transition: all .1s;

	&:hover {
		transform: scale(1.05);
		color: black;
		text-decoration: none;
	}
`;

const StyledTitle = styled.span`
	display: block;
	font-size: 2rem;
	margin-bottom: 1rem;
`;

const StyledDescription = styled.span`
	color: grey;
	font-size: 1.5rem;
`;

export default class NewsFeed extends Component {
	buildNewsItem(title, description, href) {
		return (
			<StyledNewsItem key={title} target="_blank" href={href}>
				<StyledTitle>{title}</StyledTitle>
				<StyledDescription>{description.replace(/&nbsp;/g, ' ')}</StyledDescription>
			</StyledNewsItem>
		)
	};

	render() {
    var searchTerms = Object.keys(this.props.data);

		return (
				<StyledFeed>
					  {searchTerms.map((item, index) => {
              return this.props.data[item].map((article, i) => {
								return this.buildNewsItem(article.title, article.description, article.link)
              })
            })}
				</StyledFeed>
		);
	};
}
