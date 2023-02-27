import React from "react";
import { useParams } from "react-router-dom";
import LeftBar from "../../../../components/Left-Bar";
import { useCollection } from "../../../../hooks/useCollection";
import UserProfile from "./UserProfile";

export default function UserAccount() {
  const params = useParams();
  const { documents: license } = useCollection("user", ["uid", "==", params.id]);
  const { documents: user } = useCollection("Teams", ["uid", "==", params.id]);
  const {documents: email} = useCollection("email", ["uid", "==", params.id]);
  const { documents: players } = useCollection("Players", [
    "uid",
    "==",
    params.id,
  ]);
  const { documents: opponents } = useCollection("Opponents", [
    "uid",
    "==",
    params.id,
  ]);
  const { documents: yourCatalog } = useCollection("yourCatalog", [
    "uid",
    "==",
    params.id,
  ]);
  const { documents: generated } = useCollection("generated", ["uid", "==", params.id]);
  return (
    <div className="page-container">
      <div className="content-wrap">
        <LeftBar />
        <UserProfile
          user={user}
          players={players}
          opponents={opponents}
          yourPosters={yourCatalog}
          email={email}
          License={license}
          generated={generated}
        />
      </div>
    </div>
  );
}
