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

const getDashboardData = () => {
  const url = 'http://localhost:8000/dashboard-data';
  return apiCalls.doGetApiCall(url)
};

const postGoogleDataToRegisterUser = (requestBody) => {
  const url = 'http://localhost:8000/login';
  return apiCalls.doPostApiCall(url, requestBody)
}

const helpers = {
  validateLogin: ValidateLogin,
  getDashboardData: getDashboardData,
  postGoogleDataToRegisterUser: postGoogleDataToRegisterUser
};

export default helpers;
