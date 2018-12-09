import React, { Component } from 'react';
import SimpleTooltip from "react-simple-tooltip";
import styled from 'styled-components';
import './ticker.css';
import './sentiment-deltas.css';

const LabelContainer = styled.div`
  width: 100%;
`;

const RightNow = styled.h3`
  display: inline-block;
  text-align: left;
  width: 50%;
`;

const WeeklyChange = styled.h3`
  display: inline-block;
  text-align: right;
  width: 50%;
`;

export default class Delta extends Component {
  pickEmoji(score) {
    if(score < -1){
      return 'fa-frown-o';
    }
    if(score >= -1 && score < 2){
      return "fa-meh-o";
    }
    else {
      return "fa-smile-o";
    }
  }

  buildDelta(name, diff, emoji, index) {
    return (
				<a className="delta ticker" target="_blank" href={'https://reddit.com/r/' + name} key={index}>
            <SimpleTooltip
              content={"This is the level of positivity of titles and text posts in /r/" + name + " right now."}
              placement="right"
              fontSize="1rem">
                <i className={"fa " + emoji}/>
            </SimpleTooltip>

					  <span className="subName">{name}</span>

            <SimpleTooltip
              content={"The positivity in /r/" + name + " has changed by " + diff + "% over the weekly average."}
              placement="right"
              fontSize="1rem"
              className="diff">
                <span>{diff}%</span>
            </SimpleTooltip>
				</a>);
  }

	render() {
      return (<div className="deltas">
        <h2>{this.props.title}</h2>
        <LabelContainer>
          <RightNow>Right now</RightNow>
          <WeeklyChange>Change this week</WeeklyChange>
        </LabelContainer>
  		  {Object.keys(this.props.deltas).map((delta, index) => {
          let deltaItem = this.props.deltas[delta];
          var emoji = this.pickEmoji(deltaItem.currentScore);

          return this.buildDelta(delta, deltaItem.delta, emoji, index);
        })}
      </div>);
	};
}
