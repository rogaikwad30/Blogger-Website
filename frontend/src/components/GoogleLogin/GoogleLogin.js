import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { setUserLogin } from '../../redux-store/store';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log("Is user Logged In - ",user);
  

  const successHandler = (response) => {
    const { name, email, googleId } = response.profileObj;
    console.log("Google Login Response - ",name, email, googleId, response);
    dispatch(setUserLogin({ name, email, googleId }));
    navigate('/dashboard');
  };

  const errorHandler = (error) => {
    console.log("Error in Google Login ", error);
  };

  return (
    <div>
      <GoogleLogin
        clientId="429645888350-8h9g0t3qtnq00urs85l1islajaqaqcs4.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={successHandler}
        onFailure={errorHandler}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default Login;