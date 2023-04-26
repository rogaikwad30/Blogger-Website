import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    console.log("Google Login Response - ", response);
    navigate('/dashboard');
  };

  return (
    <div>
      <GoogleLogin
        clientId="429645888350-8h9g0t3qtnq00urs85l1islajaqaqcs4.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default Login;