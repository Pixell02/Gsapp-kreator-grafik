import React, { useEffect, useState } from "react";
import "../../Stats.css";
import { useUsersContextProvider } from "../context/UsersContext";

type LicenseCounts = {
  [key: string]: number;
};

export default function LicenseStats() {
  const { users } = useUsersContextProvider();
  const [licenseCounts, setLicenseCounts] = useState<LicenseCounts>({});

  useEffect(() => {
    if (users) {
      const licenseTypes: string[] = ["full-license", "free-trial", "no-license", "admin"];
      const counts: LicenseCounts = {};

      licenseTypes.forEach((type) => {
        const matchUsers = users.filter((user) => user.license === type);
        counts[type] = matchUsers.length;
      });

      setLicenseCounts(counts);
    }
  }, [users]);

  const totalUserCount: number = Object.values(licenseCounts).reduce((acc, count) => acc + count, 0);

  return (
    <div className="license-table">
      <p>Licencje</p>
      <div className="licenseCount-container">
        {Object.entries(licenseCounts).map(([type, count]) => (
          <div key={type} className="licenseType-container">
            <span className="licenseName">
              {type === "full-license"
                ? "Pełna licencja"
                : type === "free-trial"
                ? "Darmowa licencja"
                : type === "no-license"
                ? "Bez licencji"
                : "Admini"}
              :{" "}
            </span>
            <div className="count-container">
              <span className="count">{count}</span>
            </div>
          </div>
        ))}
        <div className="licenseType-container">
          <span className="licenseName">Suma: </span>
          <div className="count-container">
            <span className="count">{totalUserCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
