import { Link } from "react-router-dom";
import LoginPage from "../../components/form-elements/FormPage";
import "../../App.css";
import MainFooter from "../../components/main-content-elements/Footer";
import translation from "./login.json";
import { useLanguageContext } from "../../context/LanguageContext";
import { translationProps } from "../../types/translationTypes";

function Login() {
  const { language } = useLanguageContext();
  const translate: translationProps = translation;
  return (
    <div className="page-container login-container">
      <div className="content-wrap">
        <div className="form-align-center">
          <LoginPage
            name={translate.login[language]}
            footer={
              <span>
                {translate.noAccount[language]}
                <Link to={`/${language}/register`} className="bold-text">
                  {" "}
                  {translate.register[language]}
                </Link>
              </span>
            }
          />
        </div>
        <MainFooter />
      </div>
    </div>
  );
}

export default Login;
