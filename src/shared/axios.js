import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5001/guardian-d746f/europe-west1/api', // testing on local emulator
    // baseURL: 'https://europe-west1-guardian-d746f.cloudfunctions.net/api', // live production
    timeout: 10000
  });

export default instance;