import React, {useContext} from 'react'
import { AuthContext } from '../context/auth';
import { Navigate as Redirect, Route, Outlet } from 'react-router-dom';

 const PrivateRoute = ({ component: Component, ...rest }) => {

    const { user } = useContext(AuthContext);

    // const user = null;

  // return  ( 
  // <Route
  //   {...rest}
  //   exact
  //   render={(props) => 
  //       user ? <Component {...props} /> : <Redirect to ="/anmelden" />
  //   }
  //  />
  // )
  return user ? <Outlet  /> : <Redirect to ="/anmelden" /> //Achtung hab auch Route PrivateRoot eingefügt bei ChatScreenNeu
   
};


export default PrivateRoute;
