import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase/config';
import translation from './resetPassword.json';
import { useLanguageContext } from '../../../context/LanguageContext';
export default function ResetPassword() {
  const [email, setEmail] = useState();
  const [success, setSuccess] = useState(false);
  const { language } = useLanguageContext();
  const navigate = useNavigate();
  const handleClick = () => {
    if (email !== ' ') {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setSuccess(true);
          setTimeout(() => {
            navigate(`${language}/login`);
          }, [3000]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="form-align-center">
      <div className="form ">
        <div className="form-group">
          <div className="text-left">
            {success === false && (
              <>
                <p>{translation.resetPassword[language]}</p>
                <label>{translation.email[language]}</label>
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </>
            )}
            {success === true && <p>{translation.emailSend[language]}</p>}
          </div>
          {success !== true ? (
            <div className="d-flex justify-content-start w-100 mb-5 mt-3">
              <button
                onClick={handleClick}
                className="btn secondary-btn">
                {translation.resetButton[language]}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
