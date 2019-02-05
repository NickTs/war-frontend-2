import axios from 'axios';

export default axios.create({
    baseURL: "https://www.worldart.ml/b/api/v1/"
});