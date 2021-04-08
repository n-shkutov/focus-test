import urls from 'services/urls';
import data from './data.json';

function FetchService() {
  this.get = async (url) => {
    if (url === urls.all) {
      return Promise.resolve(data);
    }

    const resp = await fetch(url, { method: 'GET' });
    return resp.json();
  };
}

const fetchService = new FetchService();

export default fetchService;
