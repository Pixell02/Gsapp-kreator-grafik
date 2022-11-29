import React from "react";
import FormPage from "./form-elements/FormPage";
import Header from "./Header";

function Register() {
    return (
        <div className="content-wrap">
        <Header />
        <div className="form-align-center">
        <FormPage
        name = "Zarejestruj się" footer = {
        <span>Masz już konto? 
          <a href="/login">Zaloguj się</a>
        </span>
        } />
        </div>
        </div>
    );
}

export default Register;