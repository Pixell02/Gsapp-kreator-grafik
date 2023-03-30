import React, { useState } from "react";
import { Link } from "react-router-dom";
import ItemBlock from "../../../../components/main-content-elements/ItemBlock";
import ItemContainer from "../../../../components/main-content-elements/ItemContainer";
import Title from "../../../../components/main-content-elements/Title";
import Licenses from "../../../Account/components/Licenses";
import "../../../Account/components/MainAccount.css";
import UserStats from "./UserAccountComponents/UserStats";
import EditYourTeamWindow from "../../../YourTeamPanel/components/EditYourTeamWindow";
import FilteredBlock from "../../../../components/main-content-elements/FilteredBlock";
import EditOpponentWindow from "../../../Opponents/components/EditOpponentWindow";
import EditPlayerWindow from "../../../Players/components/EditPlayerWindow";
import AddPlayerWindow from "../../../Players/components/addPlayerWindow";
import AddOpponentWindow from "../../../Opponents/components/addOpponentWindow";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase/config";

export default function UserProfile(props) {
  const [data, setData] = useState();
  const [openEditYourTeam, setOpenEditYourTeam] = useState(false);
  const [openEditPlayer, setOpenEditPlayer] = useState(false);
  const [openEditOpponent, setOpenEditOpponent] = useState(false);
  const [openPlayerModal, setOpenPlayerModal] = useState(false);
  const [openOpponentModal, setOpenOpponentModal] = useState(false);
  const editClick = (e, user, type) => {
    if (type === "player") {
      setOpenEditPlayer(true);
    } else if (type === "opponent") {
      setOpenEditOpponent(true);
    } else {
      setOpenEditYourTeam(true);
    }

    setData(user);
  };
  const [itemToEdit, setItemToEdit] = useState(null);
  const handleDeleteClick = async (id, type) => {
    if (type === "player") {
      const ref = doc(db, "Players", id);
      await deleteDoc(ref);
    } else if (type === "opponent") {
      const ref = doc(db, "Opponents", id);
      await deleteDoc(ref);
    }
  };
  // const handleClickOutside = (e) => {
  //     if (!hideElement.current.contains(e.target)) {
  //       setItemToEdit(null);
  //     }
  //   };
  const handleClick = (e, item) => {
    setItemToEdit(item);
  };

  return (
    <div className="main-content">
      {openOpponentModal && (
        <div className="d-flex h-100 position-absolute w-100 justify-content-center align-items-center">
          <AddOpponentWindow Teams={props.user} open={openOpponentModal} onClose={() => setOpenOpponentModal(false)} />
        </div>
      )}
      {openPlayerModal && (
        <div className="d-flex h-100 position-absolute w-100 justify-content-center align-items-center">
          <AddPlayerWindow Teams={props.user} open={openPlayerModal} onClose={() => setOpenPlayerModal(false)} />
        </div>
      )}
      {data && openEditYourTeam && (
        <div className="d-flex h-100 position-absolute w-100 justify-content-center align-items-center">
          <EditYourTeamWindow yourTeam={data} open={openEditYourTeam} onClose={(e) => setOpenEditYourTeam(false)} />
        </div>
      )}
      {data && openEditOpponent && (
        <div className="d-flex h-100 position-absolute w-100 justify-content-center align-items-center">
          <EditOpponentWindow Teams = {props.user} player={data} open={openEditOpponent} onClose={(e) => setOpenEditOpponent(false)} />
        </div>
      )}
      {data && openEditPlayer && (
        <div className="d-flex h-100 position-absolute w-100 justify-content-center align-items-center">
          <EditPlayerWindow Teams = {props.user} player={data} open={openEditPlayer} onClose={(e) => setOpenEditPlayer(false)} />
        </div>
      )}

      <div className="ml-2">
        <div className="d-flex flex-row">
          {props.user &&
            props.user.map((user) => (
              <div className="profile-image-name d-flex flex-column">
                <div className="profile-image-container pt-5 pb-5 border border-secondary">
                  <div className="profile-image">{<img src={user.img} />}</div>
                </div>
                <div className="team-name-container border border-secondary">
                  <span>{user.firstName + " " + user.secondName}</span>
                </div>
                <div className="btn-container w-100">
                  <button onClick={(e) => editClick(e, user)} className="mx-1 w-100 btn btn-primary">
                    Edytuj
                  </button>
                </div>
              </div>
            ))}

          <div className="mt-2 ml-5">
            <div className="profile-data-container">
              <label>Id użytkownika</label>
              <input type="text" value={props.user && props.user.length > 0 && props.user[0].uid} disabled />
              <label>Email</label>
              {props.email && props.email.length > 0 && <input type="text" value={props.email[0].email} disabled />}
              <label>Sport</label>
              <input
                type="text"
                value={
                  props.user && props.user.length > 0 && props.user[0].sport ? props.user[0].sport : "brak informacji"
                }
                disabled
              />
            </div>
          </div>
        </div>
        <div>
          <div className="yourPoster-container">
            <Licenses License={props.License} />
            <Title title="Motywy użytkownika" />
            <ItemContainer>
              {props.yourPosters &&
                props.yourPosters.map((userPoster) => (
                  <div className="item-category-window">
                    <Link to={`/creator/${userPoster.uuid}`}>
                      <div className="name-content">
                        <span className="name-content">{userPoster.name}</span>
                      </div>
                      <div className="image-category-content">
                        {userPoster.src && (
                          <img src={userPoster.src} alt={userPoster.firstName + " " + userPoster.secondName} />
                        )}
                      </div>
                    </Link>
                  </div>
                ))}
            </ItemContainer>
          </div>
          <div className="users-stats">
            <Title title="Statystyki użytkownika" />
            <ItemContainer>
              <UserStats generated={props.generated} />
            </ItemContainer>
          </div>
          <div className="favorite-theme-container">
            <Title title="Ulubione motywy" />
            <ItemContainer></ItemContainer>
          </div>
          <div className="players-container">
            <Title title="Zawodnicy" />
            <div className="btn-container ml-5">
              <button onClick={() => setOpenPlayerModal(true)} className="btn primary-btn">
                Dodaj zawodnika
              </button>
            </div>
            <ItemContainer>
              {props.user &&
                props.user.map((teams) => (
                  <>
                    <div className="ml-5 mt-3">{teams.firstName + " " + teams.secondName}</div>
                    <div className="d-flex flew-row flex-wrap ml-5">
                      {props.players &&
                        props.players
                          .filter((player) => player.team === teams.firstName + " " + teams.secondName)
                          .map((player) => (
                            <>
                              <FilteredBlock
                                type="player"
                                handleClick={handleClick}
                                editClick={editClick}
                                itemToEdit={itemToEdit}
                                setItemToEdit={setItemToEdit}
                                item={player}
                                openEditModal={openEditPlayer}
                                handleDeleteClick={handleDeleteClick}
                              />
                            </>
                          ))}
                    </div>
                  </>
                ))}
              <ItemContainer>
                <div className="d-flex w-100">bez drużyny</div>
                <div className="ml-5 w-100 d-flex">
                {props.players &&
                  props.players.map((opponent) => (
                    <>
                      {opponent.team === undefined && (
                        <FilteredBlock
                          type="opponent"
                          handleClick={handleClick}
                          editClick={editClick}
                          itemToEdit={itemToEdit}
                          setItemToEdit={setItemToEdit}
                          item={opponent}
                          handleDeleteClick={handleDeleteClick}
                        />
                      )}
                    </>
                  ))}
                </div>
              </ItemContainer>
            </ItemContainer>
          </div>
          <div className="opponents-container">
            <Title title="Przeciwnicy" />
            <div className="btn-container ml-5">
              <button onClick={() => setOpenOpponentModal(true)} className="btn primary-btn">
                Dodaj Przeciwnika
              </button>
            </div>
            <ItemContainer>
            
              {props.user &&
                props.user.map((teams) => (
                  <>
                    <div className="ml-5 mt-3">{teams.firstName + " " + teams.secondName}</div>
                    <div className="ml-5 w-100 d-flex">
                    {props.opponents &&
                      props.opponents
                        .filter((player) => player.team === teams.firstName + " " + teams.secondName)
                        .map((player) => (
                          <>
                            <FilteredBlock
                              type="opponent"
                              handleClick={handleClick}
                              editClick={editClick}
                              itemToEdit={itemToEdit}
                              setItemToEdit={setItemToEdit}
                              item={player}
                              handleDeleteClick={handleDeleteClick}
                            />
                          </>
                        ))}
                      </div>
                  </>
                    
                ))}
                
              <ItemContainer>
                <div className="d-flex w-100 ml-5">bez drużyny</div>
                <div className="ml-5 w-100 d-flex">
                {props.opponents &&
                  props.opponents.map((opponent) => (
                    <>
                      {opponent.team === undefined && (
                        <FilteredBlock
                          type="opponent"
                          handleClick={handleClick}
                          editClick={editClick}
                          itemToEdit={itemToEdit}
                          setItemToEdit={setItemToEdit}
                          handleDeleteClick={handleDeleteClick}
                          item={opponent}
                        />
                      )}
                    </>
                  ))}
                </div>
              </ItemContainer>
            </ItemContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
