import React, { Component } from 'react';
import SimpleTooltip from "react-simple-tooltip";
import './comment.css';

export default class Comment extends Component {
	render() {
		return (
      <div className="comment-container">
  			<SimpleTooltip content={this.props.tooltip} placement="left" fontSize="1rem">
  				<a className="comment" target="_blank" href={
  						typeof this.props.item.permalink === 'undefined'
  						? '#'
  						: this.props.item.permalink
  					}>
              <span className="title">{this.props.title}</span>
  						<span className="comment">{this.props.item.text.replace(/&#39;/g, '\'')}</span>
              <span className="author"><i className="fa fa-user"></i> {this.props.item.author}</span>
  				</a>
  			</SimpleTooltip>
      </div>
		);
	};
}
