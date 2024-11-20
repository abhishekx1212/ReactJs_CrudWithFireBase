import axios from "axios";

const apiInstance = axios.create({
    baseURL:"https://fir-02-97db3-default-rtdb.firebaseio.com/"
})

export default apiInstance;