import Auth from "./OAuthLink";
import useCurrentUri from "./useCurrentUri";
import useWebexOAuth from "./useWebexOAuth";
import { useNavigate } from "react-router-dom";

import "./index.css";

const Login = () => {
  let navigate = useNavigate();
  const webexToken = useWebexOAuth();
  const redirectURI = useCurrentUri();

  const Nav = () => {
    navigate("/endpage", { state: { accessToken: webexToken } });
  };
  return (
    <div className="App">
      {webexToken ? (
        <Nav />
      ) : (
        <Auth
          clientID={process.env.REACT_APP_WEBEX_CLIENT_ID}
          loginText="Login Using Webex"
          redirectURI={redirectURI}
          webexAPIBaseURL={process.env.REACT_APP_WEBEX_BASE_URL}
        />
      )}
    </div>
  );
};

export default Login;
