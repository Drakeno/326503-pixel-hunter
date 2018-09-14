import Application from './application';
import adaptServerData from './data/data-adapter';

const SERVER_URL = `https://es.dump.academy/pixel-hunter/questions`;

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    Application.showError(`${response.status}`);
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (res) => res.json();

export default class Loader {
  static loadData() {
    return fetch(SERVER_URL).then(checkStatus).then(toJSON).then(adaptServerData);
  }
}
