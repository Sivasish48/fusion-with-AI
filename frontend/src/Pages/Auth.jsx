import React from 'react'
import {useKindeAuth} from "@kinde-oss/kinde-auth-react";
function Auth() {
    const { login, register } = useKindeAuth();
  return (<div>
       <button onClick={register} type="button">Register</button>
       <button onClick={login} type="button">Log In</button>
  </div>
    
  )
}

export default Auth



