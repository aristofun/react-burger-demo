import axios from "axios";

const inst = axios.create({
  baseURL: 'https://playground-1538044699957.firebaseio.com/'
});

export default inst;
