import React, { useState, useEffect } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { STRIPE_PUBLISHABLE_KEY } from './config/config';
import StripeForm from "./components/StripeForm";
import { checkboxes } from "./utils/constants";
import ConfirmationPayment from "./components/ConfirmationPayment";
import CheckBoxList from "./components/checkBoxList/CheckBoxList";
import Header from "./components/header/Header";
import "./app.scss";

function App() {

  const [stripePromise, setStripePromise] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  const [checkedList, setCheckedList] = useState(checkboxes());
  const [isSubmit, setIsSubmit] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState([]);

  useEffect(() => {
    const loadStripe = require("@stripe/stripe-js").loadStripe;
    const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
    setStripePromise(stripePromise);

    axios.get('http://localhost:3001')
      .then(data => {
        setPaymentData(data.data)
      })
  }, [])

  const handleCheck = (event) => {
    const updatedList = [...checkedList];
    const { name } = event.target;

    const index = updatedList.findIndex(item => item.name === name);
    updatedList[index].checked = !updatedList[index].checked;
    setCheckedList(updatedList);
  };

  const handleSubmit = (payment) => {
    setIsSubmit(payment);
    setSelectedSubject(checkedList);
    setCheckedList(checkboxes());
  }

  return (
    <div className="App">
      <Header />
      <div className="formWrapper">
        <div className="formContent">
          <h2 className="heading">Get our most popular software documentation</h2>
          <CheckBoxList handleCheck={handleCheck} checkedList={checkedList} />

          {
            !isSubmit ?
              (<Elements stripe={stripePromise}>
                <StripeForm data={paymentData} setPaymentSubmit={handleSubmit} checkedList={checkedList} />
              </Elements>)
              : (<ConfirmationPayment selectedSoftList={selectedSubject} />)
          }
        </div>
      </div>
    </div>
  );
}

export default App;
