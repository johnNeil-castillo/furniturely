import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "./StripeCheckout";
import "../../../stripe.css";

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
  return (
    <div className="container text-center">
      <h4 className="mb-4">Complete your purchase</h4>
      <Elements stripe={promise}>
        <div>
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
