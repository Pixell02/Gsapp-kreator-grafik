import React from 'react';
import MainFooter from "../MainFooter";
import Title from "./Title";
import "./MainAccount.css";
function MainAccount() {
    return (
        <div className="main-content">
          <div className="ml-5">
            <div className="account-content">
              <Title title = "Konto" />
                <div className='account-items'>
                  <label for ="userId">Id konta</label>
                  <input type="text" className="userId"  />
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