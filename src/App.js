import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import Ticker from './components/ticker';
import Chart from './components/chart';
import AreaChart from './components/areaChart';

class App extends Component {
  constructor(props) {
    super(props);

    this.refreshTime = '60'; //in seconds

    this.state = {
      tickers: [],
      sentiment: [],
      coinbase: [],
      subreddits: [],
      env: 'dev'
    };

    this.url = 'http://localhost:8081';
    if(this.state.env == 'prod') {
      this.url = 'http://192.168.2.59:8081';
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
            const sentiment = Object.keys(json.data.seven).map((label, index) => {
              json.data.seven[label].date = label;
              return json.data.seven[label];
            });

            this.setState({sentiment: sentiment});
          }).catch(ex => {
            console.log('parsing failed', ex)
          })
  }

  fetchCoinbaseUsers() {
    axios.get(this.url + "/coinbase/users")
        .then(json => {
          const coinbase = json.data;
          this.setState({coinbase: coinbase});
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
          console.log(subreddits);
        }).catch(ex => {
          console.log('parsing failed', ex)
        })
  }

  componentDidMount() {
    this.fetchData();
    this.fetchCoinbaseUsers();
    this.fetchRedditActiveUsers();
    setInterval(() => {this.fetchData()}, this.refreshTime * 1000);
    setInterval(() => {this.fetchCoinbaseUsers()}, this.refreshTime * 10000);
    setInterval(() => {this.fetchRedditActiveUsers()}, this.refreshTime * 10000);
  }

  render() {
    return (
        <div className="App">
          <div className="tickers">
            {this.state.tickers.map((item, index) => (
              <Ticker item={item} key={index}/>
            ))}
          </div>

          <Chart title="Active Users by Subreddit" data={this.state.subreddits} sortBy='date' />

          <Chart title="Reddit Sentiment" data={this.state.sentiment} tooltip="Higher number means more positivity in word choice" sortBy='date' />

          <AreaChart title="Coinbase: New Users (dummy data ends 11/16)" data={this.state.coinbase} sortBy='datetime'/>
        </div>
      );
  }
}

export default App;
