import { useEffect, useState } from 'react';
import { useSearch } from '../../../hooks/useLimit';
import '../Stats.css';
import FavoriteTheme from './AdministratorPanel/FavoriteTheme';
import LicenseStats from './AdministratorPanel/LicenseStats';
import Logs from './AdministratorPanel/Logs';
import Orders from './AdministratorPanel/Orders';
import PromoCode from './AdministratorPanel/PromoCode';
import Teams from './AdministratorPanel/Teams';
import Themes from './AdministratorPanel/Themes';
import ToDo from './AdministratorPanel/ToDo';
import Users from './AdministratorPanel/Users';
import UsersCountry from './AdministratorPanel/UsersCountry';
import UsersPosters from './AdministratorPanel/UsersPosters';

export default function AdministratorPanel() {
  const [activeBar, setActiveBar] = useState('users');
  const [radioValue, setRadioValue] = useState('full-license');
  const [search, setSearch] = useState('');
  const { documents: users, loading, allUsers } = useSearch('Teams', radioValue, search === '' ? null : search);

  const [dataFiltered, setDataFiltered] = useState([]);

  useEffect(() => {
    if (users) {
      const filteredData = users.filter((user, index, self) => {
        return index === self.findIndex(u => u.uid === user.uid);
      });
      setDataFiltered(filteredData);
    }
  }, [users]);

  return (
    <div className="main-content">
      <div className="ml-5 mt-5">
        <ul className="d-flex flex-row navbar-container">
          <li
            className={activeBar === 'users' ? 'trapezoid-active' : 'trapezoid'}
            onClick={() => {
              setActiveBar('users');
            }}>
            <span>użytkownicy</span>
          </li>
          <li
            className={activeBar === 'themes' ? 'trapezoid-active' : 'trapezoid'}
            onClick={() => {
              setActiveBar('themes');
            }}>
            <span>Motywy</span>
          </li>
          <li
            className={activeBar === 'stats' ? 'trapezoid-active' : 'trapezoid'}
            onClick={() => {
              setActiveBar('stats');
            }}>
            <span>Statystyki</span>
          </li>
          <li
            className={activeBar === 'logs' ? 'trapezoid-active' : 'trapezoid'}
            onClick={() => {
              setActiveBar('logs');
            }}>
            <span>Logi</span>
          </li>
          <li
            className={activeBar === 'toDo' ? 'trapezoid-active' : 'trapezoid'}
            onClick={() => {
              setActiveBar('toDo');
            }}>
            <span style={{ fontSize: '10px' }}>do zrobienia</span>
          </li>
          <li
            className={activeBar === 'teams' ? 'trapezoid-active' : 'trapezoid'}
            onClick={() => {
              setActiveBar('teams');
            }}>
            <span style={{ fontSize: '10px' }}>Kluby</span>
          </li>
        </ul>
        <hr />

        {activeBar === 'stats' && (
          <>
            <div className="d-flex flex-row  upper-container">
              <LicenseStats />
              <FavoriteTheme />
              <UsersCountry />
            </div>
            <Orders user={allUsers} />
          </>
        )}
        {activeBar === 'users' && (
          <>
            <PromoCode />
            <UsersPosters Teams={allUsers} />
            <Users
              allUsers={allUsers}
              users={dataFiltered}
              loading={loading}
              search={search}
              setSearch={setSearch}
              radioValue={radioValue}
              setRadioValue={setRadioValue}
            />
          </>
        )}
        {activeBar === 'themes' && <Themes />}
        {activeBar === 'logs' && <Logs />}
        {activeBar === 'toDo' && <ToDo />}
        {activeBar === 'teams' && <Teams />}
      </div>
    </div>
  );
}
