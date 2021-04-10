import axios from 'axios';

let serverURL = 'http://localhost:1000/api/';

const instance = axios.create({
   baseURL: serverURL
});

export default instance;