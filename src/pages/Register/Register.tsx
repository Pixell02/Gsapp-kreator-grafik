import { Link } from "react-router-dom";
import RegisterForm from "../../components/form-elements/RegisterForm";
import translation from "./register.json";
import "../../App.css";
import { useLanguageContext } from "../../context/LanguageContext";
import { translationProps } from "../../types/translationTypes";

function Register() {
  const { language } = useLanguageContext();
  const translate: translationProps = translation;

  return (
    <div className="page-container login-container">
      <div className="content-wrap">
        <div className="form-align-center">
          <RegisterForm
            name={translate.register[language]}
            footer={
              <span>
                {translate.haveAccount[language]}
                <Link to={`/${language}/login`}>{translate.login[language]}</Link>
              </span>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
