import {useState} from 'react';
import MainFooter from "../../../components/MainFooter";
import Title from "../../../components/main-content-elements/Title";
import { useAuthContext } from '../../../hooks/useAuthContext';
import "./MainAccount.css";
function MainAccount() {
  
  const { user } = useAuthContext()

  const [userId, setUserId] = useState(user.id)
    return (
        <div className="main-content">
          <div className="ml-5">
            <div className="account-content">
              <Title title = "Konto" />
                <div className='account-items'>
                  <label for ="userId">Id konta</label>
                  <input type="text" className="userId" value={setUserId} />
                  <label for ="userId">E-mail</label>
                  <input type="text" className="userEmail" />
                </div>
            </div>
          </div>
          <MainFooter />
        </div>
    );
}


export default MainAccount;