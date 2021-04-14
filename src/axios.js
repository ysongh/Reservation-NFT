import axios from 'axios';

let serverURL = 'https://reservationnft.herokuapp.com/api/';

const instance = axios.create({
   baseURL: serverURL
});

export default instance;