import React, { useEffect, useState } from "react";
import { useCollection } from "../../../../hooks/useCollection";
import "../../Stats.css";
export default function LicenseStats(props) {
  const { documents: license } = useCollection("user");
  const [fullLicenseCount, setFullLicenseCount] = useState();
  const [freeLicenseCount, setFreeLicenseCount] = useState();
  const [noLicenseCount, setNoLicenseCount] = useState();
  const [adminCount, setAdminCount] = useState();
  const [userCount, setUserCount] = useState();
  useEffect(() => {
    if (license) {
      const fullLicense = "full-license";
      const matchFullLicense = license.filter(
        (license) => license.license === fullLicense
      );
      setFullLicenseCount(matchFullLicense.length);

      const freeLicense = "free-trial";
      const matchFreeLicense = license.filter(
        (license) => license.license === freeLicense
      );
      setFreeLicenseCount(matchFreeLicense.length);

      const noLicense = "no-license";
      const matchNoLicense = license.filter(
        (license) => license.license === noLicense
      );
      setNoLicenseCount(matchNoLicense.length);

      const adminAccount = "admin";
      const matchAdminAccount = license.filter(
        (license) => license.license === adminAccount
      );
      setAdminCount(matchAdminAccount.length);

      setUserCount(
        matchFreeLicense.length +
          matchFullLicense.length +
          matchNoLicense.length +
          matchAdminAccount.length
      );
    }
  }, [license]);

  return (
    <div className="license-table">
      <p>Licencje</p>
      <div className="licenseCount-container">
        <div className="licenseType-container">
          <span className="licenseName">Pełna licencja: </span>
          <div className="count-container">
            <span className="count">{fullLicenseCount}</span>
          </div>
        </div>
        <div className="licenseType-container">
          <span className="licenseName">Darmowa licencja: </span>
          <div className="count-container">
            <span className="count">{freeLicenseCount}</span>
          </div>
        </div>
        <div className="licenseType-container">
          <span className="licenseName">Bez licencja: </span>
          <div className="count-container">
            <span className="count">{noLicenseCount}</span>
          </div>
        </div>
        <div className="licenseType-container">
          <span className="licenseName">Admini: </span>
          <div className="count-container">
            <span className="count">{adminCount}</span>
          </div>
        </div>
        <div className="licenseType-container">
          <span className="licenseName">Suma: </span>
          <div className="count-container">
            <span className="count">{userCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
