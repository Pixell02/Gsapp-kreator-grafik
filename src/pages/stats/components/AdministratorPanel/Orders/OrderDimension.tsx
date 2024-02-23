import React from "react";
import { History } from "./hooks/useSortByDate";
import { User } from "../../context/UsersContext";

type props = {
  history: History;
  dataFiltered: User;
};

const OrderDimension = ({ history, dataFiltered }: props) => {
  return (
    <tr>
      <td className="dimension">{history.orderId}</td>

      <td className="dimension">
        <ul>
          <li>{history.buyer.firstName}</li>
          <li>{history.buyer.lastName}</li>
          <li>{history.buyer.delivery.street}</li>
          <li>{history.buyer.delivery.postalCode + " " + history.buyer.delivery.city}</li>
        </ul>
      </td>
      <td className="dimension">
        <div>{`${dataFiltered.email} (${dataFiltered.uid.substring(0, 10)}...)`}</div>
      </td>
      <td className="dimension">
        {history.type} <br />
        {history.products.map((product) => (
          <div>{product.name}</div>
        ))}
      </td>
      <td className="dimension">{history.date}</td>
    </tr>
  );
};

export default OrderDimension;
