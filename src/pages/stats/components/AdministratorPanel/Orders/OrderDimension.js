import React from "react";

const OrderDimension = ({ history, dataFiltered }) => {
  return (
    <tr>
      <td className="dimension">{history.orderId}</td>

      {dataFiltered
        ?.filter((user) => user.uid === history.uid)
        .map((user) => (
          <>
            <td className="dimension">
              <ul>
                <li>{history.buyer?.firstName}</li>
                <li>{history.buyer?.lastName}</li>
                <li>{history.buyer?.delivery?.street}</li>
                <li>
                  {history.buyer?.delivery?.postalCode +
                    " " +
                    history.buyer?.delivery?.city}
                </li>
              </ul>
            </td>
            <td className="dimension">
              <div>{`${user?.team?.firstName} ${
                user?.team?.secondName
              } (${user.uid.substring(0, 10)}...)`}</div>
            </td>
          </>
        ))}
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
