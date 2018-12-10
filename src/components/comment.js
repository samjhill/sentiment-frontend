import React, { Component } from 'react';
import SimpleTooltip from "react-simple-tooltip";
import styled from 'styled-components';

const CommentContainer = styled.div`
	display: inline-block;
	max-width: 100%;
	background: white;

	.comments {
	  margin: 0 auto;
	  display: inline-nlock;
	  width: 75%;
	  min-width: 500px;
	  color: white;
	}

	.react-tabs {
	  display: inline-block;
	  background: white;
	  color: black;
	  max-width: 100%;
	}

	a {
	  text-decoration: none;
	  font-size: 1.75rem;
	  color: black;
	}

	.title {

	}

`;

const Title = styled.span`
	display: block;
	font-size: 2.5rem;
	margin-bottom: 2rem;
`;

const StyledComment = styled.span`
	display: inline-block;
	padding: .5rem;
`;

const Author = styled.div`
	display: block;
	text-align: center;
	padding: 1.5rem;
`;


export default class Comment extends Component {
	render() {
		return (
      <CommentContainer>
  			<SimpleTooltip content={this.props.tooltip} placement="left" fontSize="1rem">
  				<a className="comment" target="_blank" href={
  						typeof this.props.item.permalink === 'undefined'
  						? '#'
  						: this.props.item.permalink
  					}>
              <Title>{this.props.title}</Title>
  						<StyledComment>{this.props.item.text.replace(/&#39;/g, '\'')}</StyledComment>
              <Author><i className="fa fa-user"></i> {this.props.item.author}</Author>
  				</a>
  			</SimpleTooltip>
      </CommentContainer>
		);
	};
}
