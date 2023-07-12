import React from "react";
import logo from "../../../img/2.png";
import CodeInput from "./CodeInput";
import { useEffect } from "react";
import { useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import translate from "../locales/translate.json";

export default function ProductsContainer(props) {

  const {language} = useContext(LanguageContext)
  
  const services = [
  { id: 3, name: translate.matchDay[language], price: "7000" },
  { id: 4, name: translate.eventAnnouncement[language], price: "7000" },
  { id: 5, name: translate.gool[language], price: "7000" },
  { id: 6, name: translate.startingXI[language], price: "7000" },
  { id: 7, name: translate.gool[language], price: "7000" },
  { id: 8, name: translate.crest[language], price: "5000" },
  { id: 9, name: translate.players[language], price: "15000" },
];
  
  useEffect(() => {
    
    if (props.promoCode.products >= 3) {
      const updatedProducts = props.products.map((product) => {
        const matchingService = services.find((item) => item.id === props.promoCode.products && item.name === product.name);
        if (matchingService) {
          return {
            ...product,
            unitPrice: matchingService.price * (1 - props.promoCode.percentage / 100)
          };
        }
        return product;
      });
      if (JSON.stringify(updatedProducts) !== JSON.stringify(props.products)) {
        props.setProducts(updatedProducts);
      }
    } else {
      if (props.promoCode.products === 2 && props.radioType === "other") {
        const updatedProducts = props.products.map((product) => {
          const matchingService = services.find((service) => service.name === product.name);
          if (matchingService) {
            return {
              ...product,
              unitPrice: matchingService.price * (1 - props.promoCode.percentage / 100)
            };
          }
          return product;
        });
        if (JSON.stringify(updatedProducts) !== JSON.stringify(props.products)) {
          props.setProducts(updatedProducts);
        }
      }
    }
  }, [props.promoCode.code, props.radioType, props.products, props.setProducts]);
  
   // Zależności dla hooka useEffect
  
  useEffect(() => {
    if (props.promoCode.products === 1 && props.radioType === "Licencja MAX 1 miesiąc") {
      const updatedProducts = [...props.products];
      const product = updatedProducts[0];
      if (product.name === "Licencja MAX 1 miesiąc") { // Zastąp "desired_product_name" nazwą pożądanego produktu
        product.unitPrice = 5000 * (1 - props.promoCode.percentage / 100);
      }
      props.setProducts(updatedProducts);
    }
  },[props.promoCode, props.radioType])

  return (
    <>
      <div className="logo-block">
        <img src={logo} className="logo-image" />
      </div>
      <div className="price-container">
        <h1>{props.paymentData.totalAmount / 100}zł</h1>
      </div>
      <div className="package-container">
        <label>
          <input
            type="radio"
            value="5000"
            name="Licencja MAX 1 miesiąc"
            onChange={(e) => {
              props.handleCheckboxChange(e);
              props.setRadioType(e.target.name);
            }}
            checked={props.radioType === "Licencja MAX 1 miesiąc"}
            defaultChecked
          />
          <span>{translate.month[language]}</span>
        </label>

        <label>
          <input
            type="radio"
            value="0"
            name="other"
            onChange={(e) => {
              props.handleCheckboxChange(e);
              props.setUnitPrice(e.target.value);
              props.setRadioType(e.target.name);
            }}
            checked={props.radioType === "other"}
          />
          <span>{translate.services[language]}</span>
        </label>
      </div>
      <label>
        <input type="radio" />
      </label>
      {props.radioType && props.radioType === "other" && (
        <>
          <div className="services-container mt-5 d-flex flex-column ">
            {services.map((service, i) => (
              <div key={i} className="service-content d-flex flex-row">
                <div className="checkbox-container">
                  <label style={{ height: "50px", width: "50px" }}>
                    <input
                      type="checkbox"
                      onChange={props.handleCheckboxChange}
                      name={service.name}
                      value={service.price}
                    />
                    <span></span>
                  </label>
                </div>
                <div className="service-name-container">
                  <div>{service.name}</div>
                </div>
                <div className="service-price-container">
                  <div>{service.price / 100}zł</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <CodeInput
        usedCode={props.usedCode}
        setUsedCode={props.setUsedCode}
        handleUseCode={props.handleUseCode}
        alert={props.alert}
      />
    </>
  );
}
