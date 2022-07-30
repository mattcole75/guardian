import axios from 'axios';

const instance = axios.create({
    // baseURL: 'https://guardian-d746f-default-rtdb.europe-west1.firebasedatabase.app/', // live production
    baseURL: 'http://localhost:5001/guardian-d746f/us-central1/api', // testing on local emulator
    timeout: 5000
  });

export default instance;