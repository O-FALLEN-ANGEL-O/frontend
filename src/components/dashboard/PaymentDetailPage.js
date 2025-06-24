import React from 'react';

const PaymentDetailPage = ({ year, payments }) => {
  // Function to calculate the total amount for a specific year
  const calculateTotalAmountForYear = (payments) => {
    let totalAmount = 0;

    // Calculate total amount for the year
    payments.forEach((payment) => {
      totalAmount += payment.amount || 0;
    });

    return totalAmount;
  };

  // Calculate total amount for the specified year
  const totalAmountForYear = calculateTotalAmountForYear(payments);

  return (
    <div>
      <h2>Payment Details for {year}</h2>
      <p>
        Total Amount: {totalAmountForYear}
      </p>
    </div>
  );
};

export default PaymentDetailPage;
