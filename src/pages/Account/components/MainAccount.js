import {useState} from 'react';
import MainFooter from "../../../components/MainFooter";
import Title from "../../../components/main-content-elements/Title";
import { useAuthContext } from '../../../hooks/useAuthContext';
import "./MainAccount.css";
function MainAccount() {
  
  const { user } = useAuthContext()
  const [userId, setUserId] = useState(user.uid)
  const [userEmail, setUserEmail] = useState(user.email)
  
    return (
        <div className="main-content">
          <div className="ml-5">
            <div className="account-content">
              <Title title = "Konto" />
                <div className='account-items'>
                  <label for ="userId">Id konta</label>
                  <div className="userId account-data-container" >
                    <span className='account-data'>{userId} </span> 
                  </div>
                  <label for ="userId">E-mail</label>
                  <div className="userEmail account-data-container" >
                  <span className='account-data'>{userEmail}</span>    
                  </div>
                </div>
            </div>
          </div>
          <MainFooter />
        </div>
    );
}


export default MainAccount;