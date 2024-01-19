import translation from "../locales/translate.json";
import { useLanguageContext } from "../../../context/LanguageContext";
import { props } from "../../../types/translationTypes";
import useUserData from "../hooks/useUserData";
import { countries } from "./countries";
import Select, { GroupBase, OptionsOrGroups } from "react-select";
import FaxInput from "./FaxInput";
import { useState } from "react";
import useElements from "../hooks/useElements";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import useActiveButton from "../hooks/useActiveButton";

type translationProps = {
  billing: props;
  country: props;
  firstName: props;
  lastName: props;
  adress: props;
  postalCode: props;
  city: props;
  companyData: props;
  companyName: props;
  vatId: props;
  save: props;
};

type Options = {
  label?: string;
  value: string;
};

const FaxData = () => {
  const { language } = useLanguageContext();
  const translate: translationProps = translation;
  const countryOptions: Options[] = countries;
  const [isChecked, setIsChecked] = useState(false);
  const { faxData, handleValueChange, handleOptionChange } = useUserData(isChecked);
  const { companyData, elements } = useElements(faxData);
  const { isActive } = useActiveButton(faxData, isChecked);
  const { user } = useAuthContext();

  const handleSave = async () => {
    const docRef = doc(db, "userData", user.uid);
    await setDoc(docRef, faxData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave();
  };

  return (
    <form onSubmit={handleSubmit} className="fax-container">
      <p className="form-title">{translate.billing[language]}</p>
      <div className="inner-content-country-label">
        <div className="label-content">
          <label className="country">
            {translate.country[language]}
            <span style={{ color: "red" }}>*</span>
          </label>
          <Select
            value={{
              label: faxData?.country as string,
              value: faxData?.country as string,
            }}
            options={countryOptions as OptionsOrGroups<Options, GroupBase<Options>>}
            onChange={handleOptionChange}
          />
          {elements.map((item) => (
            <FaxInput {...item} handleChange={handleValueChange} />
          ))}
        </div>
        <div className="checkbox-container" style={{ marginBottom: "20px" }}>
          <label>
            <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
            <span>{translate.companyData[language]}</span>
          </label>
        </div>
        {isChecked && (
          <>
            {companyData.map((item) => (
              <FaxInput {...item} handleChange={handleValueChange} />
            ))}
          </>
        )}
      </div>
      <div className="btn-container">
        <button disabled={!isActive} className="btn btn-primary save-btn" type="submit">
          {translate.save[language]}
        </button>
      </div>
    </form>
  );
};

export default FaxData;
