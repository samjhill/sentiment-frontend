import React from "react";
import styled from 'styled-components';

const StyledSection = styled.div`
  padding: 0rem 0rem 0rem 9rem
  color: white;
  a {
    color: white;
    font-weight: bold;
  }
  h3 {
    border-top: 1px solid white;
    padding-top: 3rem;
  }
`;

export default () => (
<StyledSection>
<h2>About</h2>
<p>
Distributed.love is a service I made that occasionally scrapes Reddit pages and some other APIs, then uses a library to analyze the positivity and negativity in the words people use.
</p>

<h3>Why?</h3>
<p>
  The words people choose tend to be very telling of their state of mind, perspective, thoughts, and feelings. I&apos;ve always been a bit of a language dork.
</p>

<p>
  I started the project with the hypothesis that certain actors were pumping the sentiment in <a target="_blank" href="https://www.reddit.com/r/bitcoin">/r/bitcoin</a> so they could get the best price before selling a chunk of coins.
</p>

<p>
  It&apos;s also my side project, to learn about Sentiment Analysis and practice my Node.js and React.js (Javascript) skills.
</p>

<h3>How?</h3>

<p>
  It basically assigns a score to each word using <a target="_blank" href="https://github.com/thisandagain/sentiment">this library</a>, then averages the sentence.
</p>

<p>
  i.e. "horrible" : -10, "fantastic": 12
</p>

<p>
  I do that for both titles and text-posts, as well as <a target="_blank" href="reddit.com/r/BitcoinMarkets">/r/BitcoinMarkets&apos;s</a> and a few other subs&apos; daily threads.
</p>

<p>
  I also look at number of active users in a subreddit, news sentiment, and Google trends.
</p>

<h3>Can I use this to make money?</h3>

<p>
  I'm pretty sure all my data points are trailing indicators, i.e.: the price of Bitcoin is low, so people in /r/bitcoin who use feel-good language to reassure everyone will get upvoted. This causes a positive spike in the sentiment.
</p>

<p>
  Using this to make predictions about where the price is going in the future is dangerous.
</p>

<p>
  That being said, there have been several occasions in the past where trading inversely to the sentiment has worked for me. According to the previous example, a big positive spike in the sentiment = dip the next day.
</p>

<p>
  The one thing I've found it very useful for is finding the bottom: quantifying "Buy when there's blood in the streets." If price, sentiment, and active user count are low, for weeks, that's my time to buy some big chunks.
</p>

<p>
  A $100 buy every week will beat any of this nonsense 95% of the time.
</p>
</StyledSection>
);
