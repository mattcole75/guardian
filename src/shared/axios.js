import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://localhost:5001/guardian-d746f/europe-west1/api', // testing on local emulator live
    baseURL: 'http://127.0.0.1:5001/guardian-dev-7b74d/europe-west1/api', // testing on local emulator test
    // baseURL: 'https://europe-west1-guardian-d746f.cloudfunctions.net/api', // live production
    timeout: 20000
  });

export default instance;