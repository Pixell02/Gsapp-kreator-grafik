import { useState } from "react";
import "../Stats.css";
import useComponents from "./hooks/useComponents";
import { UsersProvider } from "./context/UsersContext";

export default function AdministratorPanel() {
  const [activeBar, setActiveBar] = useState("users");
  const { components, options } = useComponents();

  return (
    <UsersProvider>
      <div className="main-content">
        <div className="ml-5 mt-5">
          <ul className="d-flex flex-row navbar-container">
            {options.map((item, i) => (
              <li
                key={i}
                className={activeBar === item.value ? "trapezoid-active" : "trapezoid"}
                onClick={() => {
                  setActiveBar(item.value);
                }}
              >
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
          <hr />
          {components[activeBar] && components[activeBar]}
        </div>
      </div>
    </UsersProvider>
  );
}
