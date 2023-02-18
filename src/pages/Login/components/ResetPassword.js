import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/config";

export default function ResetPassword() {
  const [email, setEmail] = useState();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    if (email !== " ") {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setSuccess(true);
          setTimeout(() => {
            navigate("/login")
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
                <p>Zresetuj hasło</p>
                <label>E-mail</label>
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </>
            )}
            {success === true && (
              <p>
                Na podany adres email wysłano wiadomość z możliwościa
                zrestartowania hasła
              </p>
            )}
          </div>
          {success !== true ? (
            <div className="d-flex justify-content-start w-100 mb-5 mt-3">
              <button onClick={handleClick} className="btn secondary-btn">
                Resetuj
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
