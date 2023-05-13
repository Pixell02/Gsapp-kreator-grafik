import React from 'react'
import logo from "../../../img/2.png";
const services = [
    { id: 1, name: "grafika indywidualna Dzień meczowy", price: "7000" },
    { id: 2, name: "grafika indywidualna Zapowiedź meczu", price: "7000" },
    { id: 3, name: "grafika indywidualna GOOOL", price: "7000" },
    { id: 3, name: "grafika indywidualna Skład wyjściowy", price: "7000" },
    { id: 4, name: "grafika indywidualna wynik", price: "7000" },
    { id: 5, name: "wycinanie herbów z tła (cała liga)", price: "5000" },
    { id: 6, name: "wycinanie zawodników z tła ( do 25 osób)", price: "15000" },
  ];

export default function ProductsContainer(props) {
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
          <span>1 miesiąc</span>
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
          <span>Usługi</span>
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
                    <input type="checkbox" onChange={props.handleCheckboxChange} name={service.name} value={service.price} />
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
  )
  }
  </>
  )
}
