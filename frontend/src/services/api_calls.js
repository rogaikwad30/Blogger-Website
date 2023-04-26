import axios from 'axios';

const doGetApiCall = async (url, headers={}) => {
  try {
    const response = await axios.get(url, { headers });
    console.log("Returning - ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error - ", error);
    return error;
  }
};

const doPostApiCall = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    console.log("Returning post res - ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error in posting data - ", error);
    return error;
  }
};

const doDeleteApiCall = async (url) => {
  try {
    const response = await axios.delete(url);
    console.log("Returning delete res - ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error in deleting data - ", error);
    return error;
  }
};

const doPutApiCall = async (url, data, headers={}) => {
  try {
    const response = await axios.put(url, data, { headers: headers });
    console.log("Returning put res - ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error in updating data - ", error);
    return error;
  }
};


const apiCalls = {
    doGetApiCall,
    doPostApiCall,
    doDeleteApiCall,
    doPutApiCall
};
  
export default apiCalls;