import React from 'react';
import FacebookLogin from 'react-facebook-login';
  
const FbLogin = (props) => {
    return(
        <FacebookLogin
            appId="1366238783499175"
            autoLoad={true}
            fields="name,email,picture"
            callback={props.getPersonFbData}
            cssClass="btn btn-primary"
            icon="fa-facebook"
      />
    );
};
export default FbLogin;
