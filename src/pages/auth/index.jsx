import {auth, provider} from '../../config/firebase_config';
import {signInWithPopup} from 'firebase/auth';
import {useNavigate, Navigate} from 'react-router-dom';
import {useGetUserInfo} from '../../hooks/useGetUserInfo'

//---

import './styles.css';

//----------------------------

export const Auth = () => {

    const navigate = useNavigate();
    const {isAuth} = useGetUserInfo();

    const signInWithGoogle = async () =>{

       const results = await signInWithPopup(auth, provider);

       const authInfo ={

        userId: results.user.uid,
        name: results.user.displayName,
        profilePhoto: results.user.photoURL,
        isAuth: true,

       }

       //store auth info locally in browser...not as secure as cookies...
       localStorage.setItem("auth", JSON.stringify(authInfo));

       //once logged in navigate to expenses page...
       navigate('/expense_tracker');
        
    }; //end signInWithGoogle

   if(isAuth){
    return (<Navigate to="/expense_tracker" />);
   }

    //---

    return (
        <div className="container login-page">
            <p>Sign in with Google to Continue</p>
            <button 
                className="btn btn btn-primary login-with-google-button"
                onClick={signInWithGoogle}>
                Sign in with Google
            </button>
        </div>
    );

}