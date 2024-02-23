import { useState } from "react";
import Title from "../../../../components/main-content-elements/Title";
import "../../Stats.css";
import useSearchUser from "./hooks/useSearchUser";
import Select from "../../../../components/Select";
import User from "../Users/User";
export default function Users() {
  const [search, setSearch] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [clicked, setClicked] = useState(false);
  const { users, loading } = useSearchUser(search, licenseType, clicked);
  const options = [
    { label: "", value: "" },
    { label: "darmowa licencja", value: "free-trial" },
    { label: "brak licencji", value: "no-license" },
    { label: "pełna licencja", value: "full-license" },
  ];
  return (
    <div className="ml-5 mt-5 users-content-container bg-light">
      <div className="pt-2 d-flex flex-row align-items-center">
        <Title title="Użytkownicy" />
        <input
          type="text"
          placeholder="Szukaj"
          className="w-25"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn" onClick={() => setClicked(!clicked)}>
          Szukaj
        </button>
        <Select
          id="s"
          options={options}
          name="typ licencji"
          value={licenseType}
          onChange={(e) => setLicenseType(e.target.value)}
        />
      </div>
      <table>
        <tr>
          <th className="dimension">id użytkownika</th>
          <th className="dimension">herb drużyny</th>
          <th className="dimension">Nazwa drużyny</th>
          <th className="dimension">Sport</th>
          <th className="dimension">Typ licencji</th>
          <th className="dimension">Szczegóły</th>
        </tr>
        {loading && <p>ładowowanie</p>}
        {users ? users.map((user) => <User user={user} />) : <p>brak danych</p>}
      </table>
    </div>
  );
}
