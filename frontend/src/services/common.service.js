import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiCalls from './api_calls';

const ValidateLogin = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log("Validating user login at ui - ", user);
  useEffect(() => {
    if (!user.isLoggedIn || !user.token) {
      navigate("/");
    }
  }, [navigate, user.isLoggedIn, user.token]);
};

const GetDashboardData = (token) => {
  const url = 'http://localhost:8000/dashboard-data';
  const headers = {
    "access-token" : token
  }
  return apiCalls.doGetApiCall(url,headers)
};

const postGoogleDataToRegisterUser = (requestBody) => {
  const url = 'http://localhost:8000/login';
  return apiCalls.doPostApiCall(url, requestBody)
}

const AddNewBlog = (requestBody, headers) => {
  const url = 'http://localhost:8000/blog';
  return apiCalls.doPostApiCall(url, requestBody, headers)
}

const PreviewBlog = (id) => {
  const url = 'http://localhost:8000/blog/'+id;
  return apiCalls.doGetApiCall(url);
}

const DeleteBlog = (id, headers) => {
  const url = 'http://localhost:8000/blog/'+id;
  return apiCalls.doDeleteApiCall(url, headers);
}

const UpdateBlog = (id,data, headers) => {
  const url = 'http://localhost:8000/blog/'+id;
  return apiCalls.doPutApiCall(url,data,headers);
}

const LikeBlog = (id,token) => {
  const headers = {
    "access-token" : token
  }
  const url = 'http://localhost:8000/like/blog/'+id;
  return apiCalls.doGetApiCall(url,headers);
}

const DeleteComment = (id,headers) => {
  const url = "http://localhost:8000/comment";
  const req_body = { 
    "commentId": id
  }
  return apiCalls.doDeleteApiCall(url,headers,req_body)
}

const addComment = (blogId, comment, headers) => {
  const url  = "http://localhost:8000/comment";
  const body = {
    "blogId": blogId,
    "actualComment": comment
  }
  return apiCalls.doPostApiCall(url,body,headers)
}

const updateComment = (commentId, comment, headers) => {
  const url  = "http://localhost:8000/comment";
  const body = {
    "commentId": commentId,
    "actualComment": comment
  }
  return apiCalls.doPutApiCall(url,body,headers)
}

const helpers = {
  validateLogin: ValidateLogin,
  getDashboardData: GetDashboardData,
  postGoogleDataToRegisterUser: postGoogleDataToRegisterUser,
  addNewBlog: AddNewBlog,
  PreviewBlog: PreviewBlog,
  DeleteBlog: DeleteBlog,
  UpdateBlog: UpdateBlog,
  LikeBlog: LikeBlog,
  deleteComment: DeleteComment,
  addComment: addComment,
  updateComment: updateComment
};

export default helpers;
