import React from "react";
import { Link } from "react-router-dom";
import ItemBlock from "../../../../components/main-content-elements/ItemBlock";
import ItemContainer from "../../../../components/main-content-elements/ItemContainer";
import Title from "../../../../components/main-content-elements/Title";
import Licenses from "../../../Account/components/Licenses";
import "../../../Account/components/MainAccount.css";
import UserStats from "./UserAccountComponents/UserStats";
export default function UserProfile(props) {
  
  return (
    <div className="main-content">
      <div className="ml-2">
        <div className="d-flex flex-row">
          <div className="profile-image-name d-flex flex-column">
            <div className="profile-image-container pt-5 pb-5 border border-secondary">
              <div className="profile-image">
                {props.user && props.user.length > 0 && <img src={props.user[0].img} />}
              </div>
            </div>
            <div className="team-name-container border border-secondary">
              <span>{props.user && props.user.length > 0 && props.user[0].firstName + " " + props.user[0].secondName}</span>
            </div>
          </div>
          <div className="mt-2 ml-5">
            <div className="profile-data-container">
              <label>Id użytkownika</label>
              <input
                type="text"
                value={props.user && props.user.length > 0 && props.user[0].uid}
                disabled
              />
              <label>Email</label>
             {props.email && props.email.length > 0 && <input type="text" value={props.email[0].email} disabled />} 
              <label>Sport</label>
              <input type="text" value={props.user && props.user.length > 0 && props.user[0].sport  ? props.user[0].sport : "brak informacji"} disabled />
            </div>
          </div>
        </div>
        <div>
          <div className="yourPoster-container">
            <Licenses License={props.License} />
            <Title title="Motywy użytkownika" />
            <ItemContainer>
              {props.yourPosters && props.yourPosters.map((userPoster) => (
                 <div className="item-category-window">
                 <Link to={`/creator/${userPoster.uuid}`}>
                   <div className="name-content">
                     <span className="name-content">
                       {userPoster.name}
                     </span>
                   </div>
                   <div className="image-category-content">
                     {userPoster.src && (
                       <img
                         src={userPoster.src}
                         alt={
                           userPoster.firstName +
                           " " +
                           userPoster.secondName
                         }
                       />
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
            <ItemContainer>
              
            </ItemContainer>
          </div>
          <div className="players-container">
            <Title title="Zawodnicy" />
            <ItemContainer>
              {props.players && <ItemBlock items={props.players} />}
            </ItemContainer>
          </div>
          <div className="opponents-container">
            <Title title="Przeciwnicy" />
            <ItemContainer>
              {props.opponents && <ItemBlock items={props.opponents} />}
            </ItemContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
