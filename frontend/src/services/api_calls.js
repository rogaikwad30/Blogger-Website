import axios from 'axios';

const doGetApiCall = async (url) => {
  try {
    const response = await axios.get(url);
    console.log("Returning - ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error - ", error);
    return {};
  }
};

const doPostApiCall = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    console.log("Returning post res - ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error in posting data - ", error);
    return {};
  }
};

const apiCalls = {
    doGetApiCall,
    doPostApiCall
};
  
export default apiCalls;