import React, { Component } from 'react';

import axios from 'axios';
import logo from '../logo.svg';
import Ticker from '../components/ticker';
import Chart from '../components/chart';
import AreaChart from '../components/areaChart';
import Comments from '../components/comments';
import Slider from 'react-slick';
import Toggle from 'react-toggle';
import Delta from '../components/sentiment-delta';
import NewsFeed from '../components/newsFeed';
import Tips from '../components/tips';

import { Button } from 'react-bootstrap';
import { ToggleButton } from 'react-bootstrap';
import { ToggleButtonGroup } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import styled from 'styled-components';

// styles
import 'slick-carousel/slick/slick.css';
import "react-toggle/style.css";

const StyledSection = styled.div`
  padding: 0rem 0rem 0rem 9rem
`;

const StyledButtonToolbarContainer = styled.div`
  display: inline-flex;
  position: inherit;
  p {
    color: white;
    font-size: 2rem;
    margin: 5px 10px;
  }
`;

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.refreshTime = '60'; //in seconds

    this.state = {
      tickers: [],
      sentiment: [],
      coinbase: [],
      subreddits: [],
      trends: [],
      news: {},
      comments: [],
      deltas: {},
      timeFrame: localStorage.getItem('timeFrame') ? localStorage.getItem('timeFrame') : 'thirty',
      settings: null,
    };

    this.url = 'http://localhost:8081';

    if(process.env.NODE_ENV === 'production') {
      this.url = 'http://distributed.love:8081';
    }
  }

  fetchSentiment() {
    axios.get(this.url + "/sentiment")
          .then(json => {
            var numDays = localStorage.getItem('timeFrame');
            const sentiment = Object.keys(json.data[numDays]).map((label, index) => {
              json.data[numDays][label].date = label;
              return json.data[numDays][label];
            });

            this.setState({sentiment: sentiment});
          }).catch(ex => {
            console.log('parsing failed', ex)
          })
  }

  fetchData() {
    axios.get(this.url + "/localbtc")
        .then(json => {
          const tickers = json.data.prices;
          this.setState({tickers: tickers});
           tickers.map(function(ticker, index){
            if(ticker.type == 'btcusd') {
              document.title = '$' + Math.round(ticker.price) + ' - Distributed.Love';
            }
          });

          axios.get(this.url + "/stocks")
                    .then(json => {
                      var joined = this.state.tickers.slice();
                      json.data.map((item, index) => {
                        joined.push(item);
                      });
                      this.setState({ tickers: joined });
                    }).catch(ex => {
                      console.log('parsing failed', ex)
                    })
        }).catch(ex => {
          console.log('parsing failed', ex)
        })

    axios.get(this.url + "/sentiment/comment")
          .then(json => {
            const comments = json.data;

            this.setState({comments: comments});
          }).catch(ex => {
            console.log('parsing failed', ex)
          })

    axios.get(this.url + "/sentiment/deltas")
          .then(json => {
            const deltas = json.data;

            this.setState({deltas: deltas});
          }).catch(ex => {
            console.log('parsing failed', ex)
          })
  }

  fetchRedditActiveUsers() {
    axios.get(this.url + "/subreddits/users")
        .then(json => {
          const subreddits = Object.keys(json.data).map((label, index) => {
            json.data[label].date = label;
            return json.data[label];
          });
          this.setState({subreddits: subreddits});
        }).catch(ex => {
          console.log('parsing failed', ex)
        })
  }

  fetchTrends() {
    axios.get(this.url + "/trends")
        .then(json => {
          const trends = json.data;
          this.setState({trends: trends});
        }).catch(ex => {
          console.log('parsing failed', ex)
        })
  }

  fetchNews() {
    axios.get(this.url + "/news")
        .then(json => {
          const news = json.data;

          this.setState({news: news});
        }).catch(ex => {
          console.log('parsing failed', ex)
        })
  }

  componentDidMount() {
    this.fetchSentiment();
    this.fetchData();
    this.fetchRedditActiveUsers();
    this.fetchTrends();
    this.fetchNews();

    setInterval(() => {this.fetchSentiment()}, this.refreshTime * 10000);
    setInterval(() => {this.fetchData()}, this.refreshTime * 1000);
    setInterval(() => {this.fetchRedditActiveUsers()}, this.refreshTime * 10000);
    setInterval(() => {this.fetchTrends()}, this.refreshTime * 20000);
    setInterval(() => {this.fetchNews()}, this.refreshTime * 10000);
  }

  render() {
    const { settings } = this.props;
    const { timeFrame, sentiment, deltas, news, subreddits, trends, comments } = this.state;

    // wait for settings to load
    if(!settings) {
      return ('Loading...');
    }

    return (
      <React.Fragment>
        {settings.showTickers.value  && (
          <StyledSection className="tickers">
            {this.state.tickers.map((item, index) => (
              <Ticker item={item} key={index}/>
            ))}
          </StyledSection>
        )}

        <Slider
          dots
          infinite
          speed={500}
          autoplay
          autoplaySpeed={25000}
          >
          {settings.showRedditSentiment.value  && (
            <StyledSection>
              <Chart title="Reddit Sentiment" data={sentiment} tooltip="Higher number means more positivity in word choice" sortBy='date' />
              <StyledButtonToolbarContainer>
                <p>Time Frame (days)</p>
                <ButtonToolbar>
                  <ToggleButtonGroup
                    type="radio"
                    name="changeTimeFrame"
                    onChange={(value) => {localStorage.setItem('timeFrame', value); this.fetchSentiment();}}
                    defaultValue={timeFrame}
                  >
                    <ToggleButton value={'one'}>1</ToggleButton>
                    <ToggleButton value={'seven'}>7</ToggleButton>
                    <ToggleButton value={'thirty'}>30</ToggleButton>
                    <ToggleButton value={'all'}>All</ToggleButton>
                  </ToggleButtonGroup>
                </ButtonToolbar>
              </StyledButtonToolbarContainer>
            </StyledSection>
          )}

          {settings.showDeltas.value && (
            <StyledSection>
              <Delta title="At a Glance" deltas={deltas} tooltip="" />
            </StyledSection>
          )}

          {settings.showNewsFeed.value && (
            <StyledSection>
              <NewsFeed data={news} />
            </StyledSection>
          )}

          {settings.showRedditActiveUsers.value && (
            <StyledSection>
              <Chart title="Active Users by Subreddit" data={subreddits} sortBy='date' />
            </StyledSection>
          )}

          {settings.showSearchTrends.value && (
            <StyledSection>
              <AreaChart title="Search Trends" data={trends} sortBy='formattedTime'/>
            </StyledSection>
          )}

          {settings.showRedditComments.value && (
            <StyledSection>
              <Comments comments={comments} />
            </StyledSection>
          )}
        </Slider>
      </React.Fragment>
    );
  }
}
