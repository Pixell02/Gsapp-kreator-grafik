import React from "react";
import { useParams } from "react-router-dom";
import LeftBar from "../../../../components/Left-Bar";
import { useCollection } from "../../../../hooks/useCollection";
import UserProfile from "./UserProfile";
import { useDoc } from "../../../../hooks/useDoc";

export default function UserAccount() {
  const { id } = useParams();
  const { documents: license } = useDoc("user", ["uid", "==", id]);
  const { documents: user } = useCollection("Teams", ["uid", "==", id]);
  const { documents: email } = useDoc("email", ["uid", "==", id]);
  const { documents: yourCatalog } = useCollection("yourCatalog", ["uid", "==", id]);
  return (
    <div className="page-container">
      <div className="content-wrap">
        <LeftBar />
        <UserProfile user={user} yourPosters={yourCatalog} email={email} License={license} />
      </div>
    </div>
  );
}
