import translation from "../locales/translate.json";
import { useLanguageContext } from "../../../context/LanguageContext";
import { props } from "../../../types/translationTypes";

type UserData = {
  [key: string]: string;
};
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

const useElements = (faxData: UserData | null) => {
  const { language } = useLanguageContext();
  const translate: translationProps = translation;

  const companyData = [
    {
      value: faxData?.NIP,
      title: translate.vatId[language],
      className: "NIP",
      placeHolder: translate.vatId[language],
    },
    {
      value: faxData?.companyName,
      title: translate.companyName[language],
      className: "companyName",
      placeHolder: translate.companyName[language],
    },
  ];

  const elements = [
    {
      value: faxData?.firstName,
      title: translate.firstName[language],
      className: "firstName",
      placeHolder: translate.firstName[language],
    },
    {
      value: faxData?.lastName,
      title: translate.lastName[language],
      className: "lastName",
      placeHolder: translate.lastName[language],
    },
    {
      value: faxData?.address,
      title: translate.adress[language],
      className: "address",
      placeHolder: translate.adress[language],
    },
    {
      value: faxData?.postCode,
      title: translate.postalCode[language],
      className: "postCode",
      placeHolder: translate.postalCode[language],
    },
    {
      value: faxData?.city,
      title: translate.city[language],
      className: "city",
      placeHolder: translate.city[language],
    },
  ];

  return { companyData, elements };
};

export default useElements;
