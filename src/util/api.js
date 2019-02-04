import axios from 'axios';

let baseUrl = 'http://localhost:8081';

if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://distributed.love:8081';
}

export const getCorrelation = async () => axios.get(baseUrl + "/correlation")
    .then(json => {
      return json.data;
    });
