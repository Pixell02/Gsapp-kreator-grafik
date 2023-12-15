import { doc, setDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from '../../../../../firebase/config';
import { useDoc } from '../../../../../hooks/useDoc';
import useAccountData from '../../../../Account/hooks/useAccountData';

const MultiAccountContainer = ({ email }) => {
  const params = useParams();
  const { documents: accounts } = useDoc('teamAccounts', ['uid', '==', params.id]);
  const { documents: License } = useDoc('user', ['uid', '==', params.id]);
  const { accountData, setAccountData, handleAddUser, alert, handleDeleteUser, handleDeleteTeam } = useAccountData(
    accounts,
    License
  );

  const handleCreateTeamsAccount = () => {
    const ref = doc(db, 'teamAccounts', params.id);
    setDoc(ref, {
      uid: params.id,
      users: [
        {
          email: email.email,
          uid: params.id,
        },
      ],
      expireDate: License.expireDate || '',
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
            <button
              className="btn"
              onClick={() => handleCreateTeamsAccount()}
              disabled={accounts?.users?.length === 5}>
              Stwórz
            </button>
          </div>
        </>
      )}
      {accounts && (
        <>
          <div>
            <p className="ml-5">Konta podpięte do licencji</p>
            <span
              className="ml-5"
              style={{ fontSize: '10px' }}>
              Możesz dodać jeszcze: {5 - accounts?.users?.length} użytkowników
            </span>
          </div>
          <div className="d-flex flex-row align-items-center">
            <input
              type="text"
              className="w-75"
              placeholder="email użytkownika"
              value={accountData}
              onChange={e => setAccountData(e.target.value)}
            />
            <button
              className="btn"
              onClick={() => handleAddUser(accountData)}>
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
                      {params.id !== users.uid ? (
                        <button
                          onClick={() => handleDeleteUser(users.uid)}
                          className="btn">
                          -
                        </button>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="btn mt-5"
              onClick={() => handleDeleteTeam()}>
              Usuń
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MultiAccountContainer;
