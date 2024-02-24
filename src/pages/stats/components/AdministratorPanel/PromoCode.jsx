import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase/config";
import { useCollection } from "../../../../hooks/useCollection";
import usePromoCode from "../hooks/usePromoCode";
import "./promoCode.css";

export default function PromoCode() {
  const { promoCode, handleChange, handleSave } = usePromoCode();
  const { documents: codes } = useCollection("promoCode");
  const handleDeleteDoc = (id) => {
    const docRef = doc(db, "promoCode", id);
    deleteDoc(docRef);
  };

  return (
    <div className="d-flex w-100 flex-row">
      <div className="promoCode-container w-75">
        <p>Kody promocyjne</p>
        <div className="d-flex flex-row">
          <div className="ml-2">
            <label>kod (opcjonalne)</label>
            <input
              type="text"
              className="code"
              value={promoCode.code}
              onChange={(e) => handleChange(e)}
              placeholder="kod promocyjny"
            />
          </div>
          <div className="ml-2">
            <label>ilość %</label>
            <input
              type="number"
              placeholder="ilość %"
              className="percentage"
              onChange={(e) => handleChange(e)}
              value={promoCode.percentage}
            />
          </div>
          <div className="ml-2">
            <label>Sztuki</label>
            <input
              type="number"
              placeholder="sztuk"
              className="amount"
              onChange={(e) => handleChange(e)}
              value={promoCode.amount}
            />
          </div>
          <div className="ml-2">
            <label>Ważność po użyciu (w miesiącach)</label>
            <input
              type="number"
              placeholder="ważność"
              className="expireDate"
              onChange={(e) => handleChange(e)}
              value={promoCode.expireDate}
            />
          </div>
          <button onClick={() => handleSave()} className="btn">
            Generuj
          </button>
        </div>
        <div className="promoCode-content overflow-auto h-50">
          <div className="code-container">
            <div className="code-value">kod</div>
            <div className="percentage-value">ilość %</div>
            <div className="amount-value">ilość</div>
            <div className="expire-date">Okres ważności</div>
            <div className="delete-btn-container">Usuń</div>
          </div>
          {codes &&
            codes.map((item) => (
              <div className="code-container">
                <div className="code-value">{item.code}</div>
                <div className="percentage-value">{item.percentage}%</div>
                <div className="amount-value">{item.amount}</div>
                <div className="expire-date">{item.expireDate ? item.expireDate : null}</div>
                <div className="delete-btn-container">
                  <button className="btn" onClick={() => handleDeleteDoc(item.id)}>
                    -
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
