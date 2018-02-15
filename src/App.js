import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import Ticker from './components/ticker';
import Chart from './components/chart';
import AreaChart from './components/areaChart';
import Comments from './components/comments';
import Slider from 'react-slick';
import Toggle from 'react-toggle';
import Delta from './components/sentiment-delta';
import NewsFeed from './components/newsFeed';
import 'slick-carousel/slick/slick.css';
import "react-toggle/style.css";

class App extends Component {
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
      env: 'prod',
      slideshowMode: true,
    };

    this.url = 'http://localhost:8081';
    if(this.state.env == 'prod') {
      this.url = 'http://192.168.2.83:8081';
    }
  }

  fetchData() {
    axios.get(this.url + "/localbtc")
        .then(json => {
          const tickers = json.data.prices;
          this.setState({tickers: tickers});
           tickers.map(function(ticker, index){
            if(ticker.type == 'btcusd') {
              document.title = '$' + ticker.price + ' - CoinTools';
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

    axios.get(this.url + "/sentiment")
          .then(json => {
            const sentiment = Object.keys(json.data.thirty).map((label, index) => {
              json.data.thirty[label].date = label;
              return json.data.thirty[label];
            });

            this.setState({sentiment: sentiment});
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

    axios.get(this.url + "/news")
          .then(json => {
            const news = json.data;

            this.setState({news: news});
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

  componentDidMount() {
    this.fetchData();
    this.fetchRedditActiveUsers();
    this.fetchTrends();
    setInterval(() => {this.fetchData()}, this.refreshTime * 1000);
    setInterval(() => {this.fetchRedditActiveUsers()}, this.refreshTime * 10000);
    setInterval(() => {this.fetchTrends()}, this.refreshTime * 10000);
  }

  render() {
    var sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 25000
    };


    if(this.state.slideshowMode == true) {
      return (
          <div className="App">
            <label className="toggle">
              <Toggle
                defaultChecked={this.state.slideshowMode==true}
                onChange={() => {this.setState({slideshowMode: !this.state.slideshowMode})}}
              />
              <span>View in Slideshow Mode</span>
            </label>

            <div className="tickers">
              {this.state.tickers.map((item, index) => (
                <Ticker item={item} key={index}/>
              ))}
            </div>

            <Slider {...sliderSettings}>
              <div>
                <NewsFeed data={this.state.news} />
              </div>
              <div>
                <Delta title="At a Glance" deltas={this.state.deltas} tooltip="" />
                <Chart title="Reddit Sentiment" data={this.state.sentiment} tooltip="Higher number means more positivity in word choice" sortBy='date' />
              </div>

              <div>
                <Chart title="Active Users by Subreddit" data={this.state.subreddits} sortBy='date' />
              </div>

              <div>
                <AreaChart title="Search Trends" data={this.state.trends} sortBy='formattedTime'/>
              </div>

              <div>
                <Comments comments={this.state.comments} />
              </div>
            </Slider>
          </div>
        );
    }
    else {
      return (
          <div className="App">
            <label className="toggle">
              <Toggle
                defaultChecked={this.state.slideshowMode==true}
                onChange={() => {this.setState({slideshowMode: !this.state.slideshowMode})}}
              />
              <span>View in Slideshow Mode</span>
            </label>

            <div className="tickers">
              {this.state.tickers.map((item, index) => (
                <Ticker item={item} key={index}/>
              ))}
            </div>

            <NewsFeed data={this.state.news} />

            <Delta title="At a Glance" deltas={this.state.deltas} tooltip="" />

            <Chart title="Reddit Sentiment" data={this.state.sentiment} tooltip="Higher number means more positivity in word choice" sortBy='date' />

            <Chart title="Active Users by Subreddit" data={this.state.subreddits} sortBy='date' />

            <AreaChart title="Search Trends" data={this.state.trends} sortBy='formattedTime'/>

            <Comments comments={this.state.comments} />

          </div>
        );
    }


  }
}

export default App;
