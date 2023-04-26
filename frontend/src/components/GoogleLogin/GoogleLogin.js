import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { setUserLogin } from '../../redux-store/store';
import { useNavigate } from 'react-router-dom';
import helpers from '../../services/common.service';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const successHandler = async (response) => {
    const { name, email, googleId } = response.profileObj;
    console.log("Google Login Response - ",name, email, googleId, response);
    dispatch(setUserLogin({ name, email, googleId }));
    const loginResponse = await helpers.postGoogleDataToRegisterUser({name,email,googleId})
    if(loginResponse.status === 200){
      navigate('/dashboard');
    }
    else{
      console.log("Logged in fail from our backend i.e.. nodejs - ", loginResponse);
    }
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