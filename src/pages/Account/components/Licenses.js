import React from 'react'
import verified from "../../../img/verified.png";
import discard from "../../../img/discard.png";
import { Link } from "react-router-dom";

export default function Licenses({License}) {
  return (
    <div>
      {License && License[0].license == "free-trial" && (
              <div className="license-container">
                <div className="license-content">
                  <img src={verified} className="icon-verified" />{" "}
                  <span>
                    Masz jeszcze {License[0].numberOfFreeUse} darmowych użyć
                  </span>
                </div>
              </div>
            )}
            {License && License[0].license == "no-license" && (
              <div className="license-container">
                <div className="license-content">
                  <img src={discard} className="icon-verified" />{" "}
                  <span>
                    Twoja licencja skończyła się{" "}
                    <Link to="/offer">Kup dostęp</Link>
                  </span>
                </div>
              </div>
            )}
            {License && License[0].license === "full-license" && (
              <div className="license-container ">
                <p style={{ marginLeft: "20px" }}>Licencja</p>
                <div className="license-type">
                  <label>Typ licencji</label>
                  <input
                    type="text"
                    className="license-content"
                    value="UNLIMITED"
                    disabled
                  />
                </div>
                <div className="license-type">
                  <label>Data wygaśnięcia</label>
                  <input
                    type="text"
                    className="license-content"
                    value={License[0].expireDate}
                    disabled
                  />
                </div>
                <label>Format MM-DD-YYYY</label>
              </div>
            )}
    </div>
  )
}
