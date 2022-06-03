import React, { useState,useEffect } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { google_login } from '../actions/userActions'


const LoginGoogle = () => {

    const clientId = '374230202308-9b2hlfuis86rdsm3ghik1jtj2roe98gt.apps.googleusercontent.com';
    const [showLoginButton,setShowLoginButton] = useState(true);
  
    const userDetails = useSelector(state => state.googleLogin)
    const { googleInfo } =userDetails

    const navigate = useNavigate()

    useEffect(() => {
        if(googleInfo) {
            console.log("googleInfo:",googleInfo)
            localStorage.setItem('userInfo',JSON.stringify(googleInfo))
            navigate('/')
        }
    },[googleInfo])

    const dispatch = useDispatch()

    const onLoginSuccess = (res) => {
        console.log("Login success",res)
        setShowLoginButton(false);
        
        dispatch(google_login(res.tokenId))
    }

    const onFailureSuccess = (res) => {
        console.log("Login failed",res)
    }



    return (
        <div>
            { showLoginButton ? 
            <GoogleLogin
                clientId={clientId}
                buttonText="Login with google"
                onSuccess={onLoginSuccess}
                onFailure={onFailureSuccess}
                cookiePolicy={'single_host_origin'}
            />
            : null }

           
        </div>
    )
}

export default LoginGoogle