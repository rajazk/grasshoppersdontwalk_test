import React, { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from "@stripe/react-stripe-js";

const StripeForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isPaymentSubmit, setIsPaymentSubmit] = useState(false);
  const [isSlectedSubject, setIsSlectedSubject] = useState(false);

  const { data, setPaymentSubmit, checkedList } = props;


  useEffect(() => {
   const isSelectedItem =  checkedList.some(item => item.checked === true)
   setIsSlectedSubject(isSelectedItem)
  }, [checkedList])

  const handleSubmit = async event => {
    event.preventDefault();


    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    setIsPaymentSubmit(true);
    // Use your card Element with other Stripe.js APIs
    const payload = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement)
      }
    });

    if (payload.error) {
      setIsPaymentSubmit(false);
      console.log("error", payload);
    } else {
      setPaymentSubmit(true);
      console.log("success", payload);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="paymentForm"
    >
      <div className="bankDetails">
        <h2>Pay Now</h2>
        <div className="bankDetailsWp">
          <label>
            Card number
            <CardNumberElement />
          </label>

          <div className="dateWp">
            <label>
              Card expiry
              <CardExpiryElement />
            </label>
            <label>
              CVC
              <CardCvcElement />
            </label>
          </div>
        </div>

        <div className="formButton">
          <button type="submit" disabled={!isSlectedSubject || !stripe || isPaymentSubmit}>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default StripeForm;