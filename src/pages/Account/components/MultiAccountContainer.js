import React from "react";
import { useDoc } from "../../../hooks/useDoc";
import { useAuthContext } from "../../../hooks/useAuthContext";
import useAccountData from "../hooks/useAccountData";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

const MultiAccountContainer = () => {
  const { user } = useAuthContext();
  const { documents: accounts } = useDoc("teamAccounts", ["uid", "==", user.uid]);
  const { documents: License } = useDoc("user", ["uid", "==", user.uid]);
  const { accountData, setAccountData, handleAddUser, alert, handleDeleteUser, handleDeleteTeam } = useAccountData(accounts, License);

  const handleCreateTeamsAccount = () => {
    const ref = doc(db, "teamAccounts", user.uid);
    setDoc(ref, {
      uid: user.uid,
      users: [
        {
          email: user.email,
          uid: user.uid,
        },
      ],
      expireDate: License.expireDate || "",
    });
    const licenseDoc = doc(db, "user", License.id);
    updateDoc(licenseDoc, {
      team: user.uid,
    });
  };

  return (
    <div className="d-flex license-container">
      {!accounts && License?.team && (
        <div>Twoje konto jest przypisane do licencji użytkownika o id {License?.team}</div>
      )}
      {!accounts && !License?.team && (
        <>
          <div>
            <p className="ml-5">Stwórz pakiet drużynowy i podepnij do 4 użytkowników pod swoją licencje</p>
            <button className="btn" onClick={() => handleCreateTeamsAccount()} disabled={accounts?.users?.length === 5}>
              Stwórz
            </button>
          </div>
        </>
      )}
      {accounts && (
        <>
          <div>
            <p className="ml-5">Konta podpięte do licencji</p>
            <span className="ml-5" style={{ fontSize: "10px" }}>
              Możesz dodać jeszcze: {5 - accounts?.users?.length} użytkowników
            </span>
          </div>
          <div className="d-flex flex-row align-items-center">
            <input
              type="text"
              className="w-75"
              placeholder="email użytkownika"
              value={accountData}
              onChange={(e) => setAccountData(e.target.value)}
            />
            <button className="btn" onClick={() => handleAddUser(accountData)}>
              Dodaj
            </button>
          </div>
          {alert && <span className="ml-5">{alert}</span>}
          <div>
            <table className="w-75 ml-5">
              <thead>
                <tr>
                  <th>Lp</th>
                  <th>id konta</th>
                  <th>email</th>
                  <th>usuń</th>
                </tr>
              </thead>
              <tbody>
                {accounts?.users?.map((users, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{users.uid}</td>
                    <td>{users.email}</td>
                    <td>
                      {user.uid !== users.uid ? (
                        <button onClick={() => handleDeleteUser(users.uid)} className="btn">
                          -
                        </button>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn mt-5" onClick={() => handleDeleteTeam()}>Usuń</button>
          </div>
        </>
      )}
    </div>
  );
};

export default MultiAccountContainer;
