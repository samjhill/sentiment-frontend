import React, { PureComponent } from 'react';
import { getCorrelation } from '../util/api.js';

export default class Correlation extends PureComponent {
  constructor() {
    super();
    this.state = {
      correlation: null,
      covariance: null,
    };
    this.getCorrelationData();
  }

  getCorrelationData = async () => {
    const data = await getCorrelation();
    this.setState({
      correlation: data.correlation,
      covariance: data.covariance,
    });
  }

  render() {
    const { correlation, covariance } = this.state;

    if (!correlation || !covariance)
      return 'Loading...';

    const labels = {
      correlation: Object.keys(correlation),
      covariance: Object.keys(covariance),
    };

    return (
      <h2>Correlation</h2>
      {labels.correlation.map(subName => (
        {subName}
      ))}
    );
  }
}
