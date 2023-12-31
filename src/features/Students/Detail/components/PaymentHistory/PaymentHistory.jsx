import React from "react";
import "./PaymentHistory.scss";
import { formatter } from "../../../../../assets/scripts";
import moment from "moment";

const PaymentHistory = ({ history }) => {
  return (
    <div className="payment_history">
      <h2>To'lov tarixi</h2>
      <ul>
        <li>
          <span>Sana</span>
          <span>Miqdor</span>
          <span>Usul</span>
          <span>Izoh</span>
        </li>
        {history?.length ? (
          history?.map((payment, index) => (
            <li key={index}>
              <span className="date">
                {moment(payment?.date).format("DD-MM-YYYY")}
              </span>
              <span className="qauntity">
                {formatter.format(payment?.quantity)}
              </span>
              <span>{payment?.method}</span>
              <span>{payment?.info}</span>
            </li>
          ))
        ) : (
          <p>To'lovlar yo'q</p>
        )}
      </ul>
    </div>
  );
};

export default PaymentHistory;
