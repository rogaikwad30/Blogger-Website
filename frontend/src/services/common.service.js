import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiCalls from './api_calls';

const ValidateLogin = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log("Validating user login at ui - ", user);
  useEffect(() => {
    if (!user.isLoggedIn) {
      navigate("/");
    }
  }, [navigate, user.isLoggedIn]);
};

const GetDashboardData = (email) => {
  const url = 'http://localhost:8000/dashboard-data';
  const headers = {
    "email" : email
  }
  return apiCalls.doGetApiCall(url,headers)
};

const postGoogleDataToRegisterUser = (requestBody) => {
  const url = 'http://localhost:8000/login';
  return apiCalls.doPostApiCall(url, requestBody)
}

const AddNewBlog = (requestBody) => {
  const url = 'http://localhost:8000/blog';
  return apiCalls.doPostApiCall(url, requestBody)
}

const helpers = {
  validateLogin: ValidateLogin,
  getDashboardData: GetDashboardData,
  postGoogleDataToRegisterUser: postGoogleDataToRegisterUser,
  addNewBlog: AddNewBlog
};

export default helpers;
