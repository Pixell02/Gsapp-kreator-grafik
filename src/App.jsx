import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Success from "./pages/Success/Success";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Catalog from "./pages/Catalog/Catalog";
import YourTeamPanel from "./pages/YourTeamPanel/YourTeamPanel";
import Players from "./pages/Players/Players";
import Opponents from "./pages/Opponents/Opponents";
import Sponsors from "./pages/Sponsors/Sponsors";
import YourCatalog from "./pages/YourCatalog/YourCatalog";
import Offer from "./pages/Offer/Offer";
import Account from "./pages/Account/Account";
import "./App.css";
import Creator from "./pages/Creator/Creator";
import Stats from "./pages/stats/Stats";
import PosterCreator from "./pages/posterCreator/PosterCreator";
import UserAccount from "./pages/stats/components/UserAccountComponents/UserAccount";
import ResetPassword from "./pages/Login/components/ResetPassword";
import Guide from "./pages/Guide/Guide";
import DataPrivacy from "./DataPrivacy";
import { TeamProvider } from "./context/TeamContext";
import { useLanguageContext } from "./context/LanguageContext";
import Calendar from "./pages/Calendar/Calendar";
function App() {
  const { user, authIsReady } = useAuthContext();
  const { language } = useLanguageContext();
  return (
    <TeamProvider>
      <BrowserRouter>
        {authIsReady && (
          <Routes>
            <Route path="/" element={<Navigate to={`/${language}/login`} />} />
            <Route path="/:lang/resetPassword" element={<ResetPassword />} />
            <Route path="/:lang/login" element={!user ? <Login /> : <Navigate to={`/${language}/yourCatalog`} />} />
            <Route
              path="/:lang/register"
              element={!user ? <Register /> : <Navigate to={`/${language}/yourCatalog`} />}
            />

            <Route
              path="/:lang/yourCatalog"
              element={user ? <YourCatalog /> : <Navigate to={`/${language}/login`} />}
            />
            <Route path="/:lang/catalog" element={user ? <Catalog /> : <Navigate to={`/${language}/login`} />} />
            <Route
              path="/:lang/yourTeamPanel"
              element={user ? <YourTeamPanel /> : <Navigate to={`/${language}/login`} />}
            />
            <Route path="/:lang/players" element={user ? <Players /> : <Navigate to={`/${language}/login`} />} />
            <Route path="/:lang/opponents" element={user ? <Opponents /> : <Navigate to={`/${language}/login`} />} />
            <Route path="/:lang/sponsors" element={user ? <Sponsors /> : <Navigate to="/login" />} />
            <Route path="/success" element={user ? <Success /> : <Navigate to={`/${language}/login`} />} />
            <Route path="/success/*" element={user ? <Success /> : <Navigate to={`/${language}/login`} />} />
            <Route path="/:lang/offer" element={user ? <Offer /> : <Navigate to={`/${language}/login`} />} />
            <Route path="/:lang/calendar" element={user ? <Calendar /> : <Navigate to={`/${language}/login`} />} />
            <Route path="/:lang/account" element={user ? <Account /> : <Navigate to={`/${language}/login`} />} />
            <Route
              path="/:lang/creator/:poster"
              element={user ? <Creator /> : <Navigate to={`/${language}/login`} />}
            />
            <Route
              path="/:lang/creator/theme/:poster"
              element={user ? <Creator /> : <Navigate to={`/${language}/login`} />}
            />
            <Route path="/:lang/catalog/*" element={user ? <Catalog /> : <Navigate to={`/${language}/login`} />} />

            <Route path="/:lang/guide" element={user ? <Guide /> : <Navigate to={`/${language}/login`} />} />
            <Route path="/:lang/dataPrivacy" element={<DataPrivacy />} />
            <Route path="/:lang/stats" element={user ? <Stats /> : <Navigate to={`/${language}/login`} />} />
            {user &&
              (user.uid === "hgwaMbxg3qWnQyqS44AtyTrkSA93" ||
                user.uid === "yALsGjEPaRcTIkBslb8TZrvgY6u1" ||
                user.uid === "6vVYzE860LS6Ua4nIIfCSul7feD2" ||
                user.uid === "ait7T01TWaPDqx3a4YsogOQrL4O2") && (
                <>
                  <Route path="/:lang/stats" element={user ? <Stats /> : <Navigate to="/login" />} />
                  <Route
                    path="/:lang/posterCreator"
                    element={user ? <PosterCreator /> : <Navigate to={`/${language}/login`} />}
                  />
                  <Route
                    path="/:lang/stats/:id"
                    element={user ? <UserAccount /> : <Navigate to={`/${language}/login`} />}
                  />
                  <Route
                    path="/:lang/posterCreator/:id"
                    element={user ? <PosterCreator /> : <Navigate to={`/${language}/login`} />}
                  />
                  <Route
                    path="/:lang/posterCreator/theme"
                    element={user ? <PosterCreator /> : <Navigate to={`/${language}/login`} />}
                  />
                  <Route
                    path="/:lang/posterCreator/theme/:id"
                    element={user ? <PosterCreator /> : <Navigate to={`/${language}/login`} />}
                  />
                </>
              )}

            <Route path="/*" element={<Navigate to={`/${language}/login`} />} />
          </Routes>
        )}
      </BrowserRouter>
    </TeamProvider>
  );
}

export default App;
