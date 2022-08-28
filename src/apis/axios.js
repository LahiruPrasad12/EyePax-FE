import axios from "axios";
import process, {config} from "shelljs";

const instance = axios.create({
  baseURL: 'http://localhost:5000'
});

if (localStorage.getItem('JWT')) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('JWT')}`;
}

export default instance
