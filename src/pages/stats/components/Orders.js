import React from 'react'

export default function Orders(props) {
  return (
    <div className="order-container mt-5 ml-5">
        <p>Zamówienia</p>
        <div className="table-container">
          <table className="table">
            <tr>
              <th>id</th>
              <th>Logo drużyny</th>
              <th>Nazwa drużyny(id)</th>
              <th>Status</th>
              <th>Opcje</th>
            </tr>
            <tr>
              <td>123123</td>
              <td><img src='asdasd' /></td>
              <td>Twoja drużyna(hgwa...)</td>
              <td>Do przyjęcia</td>
              <td><button className='btn btn-primary order-btn' >Przyjmij</button></td>
            </tr>
          </table>
        </div>
    </div>
  )
}
