import React from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";

const AdminButton = ({hasTheme}) => {
  const { poster } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  return (
    <div>
      {(user.uid === "hgwaMbxg3qWnQyqS44AtyTrkSA93" ||
        user.uid === "6vVYzE860LS6Ua4nIIfCSul7feD2" ||
        user.uid === "ait7T01TWaPDqx3a4YsogOQrL4O2") && (
        <button
          className="btn"
          onClick={() =>
            navigate(hasTheme ? `/${language}/posterCreator/theme/${poster}` : `/${language}/posterCreator/${poster}`)
          }
        >
          Edytuj
        </button>
      )}
    </div>
  );
};

export default AdminButton;
