import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://guardian-d746f-default-rtdb.europe-west1.firebasedatabase.app/',
    timeout: 2000
  });

export default instance;