import React from "react";

const ConfirmationPayment = ({ selectedSoftList }) => {
  return (
    <div className="confirmationWrapper">
      <h3>Thank You</h3>
      <div>
        <p>Payment succesful, your order for:</p>
        <div className="selectedSoftware">
          {
            selectedSoftList.map((item, index) => (
              item.checked && <p key={index}>{`"${item.label}"`}</p>
            ))
          }
        </div>
        <p>...is being processed...</p>
      </div>
    </div>
  )
}

export default ConfirmationPayment;