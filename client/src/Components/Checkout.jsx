// Checkout.jsx

import React, { useState } from 'react';

function Checkout({ onPlaceOrder }) {
  // State variables to store user input
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');

  // Function to handle the order placement
  const handlePlaceOrder = () => {
    // Create an order object with user input
    const order = {
      name,
      address,
      paymentMethod,
    };

    // Call the onPlaceOrder function passed as a prop
    onPlaceOrder(order);
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Shipping Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label>Payment Method:</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
      </form>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
}

export default Checkout;





















// import React, { useState } from 'react';

// function Checkout() {
//   // State variables to store user input
//   const [name, setName] = useState('');
//   const [address, setAddress] = useState('');
//   const [paymentMethod, setPaymentMethod] = useState('creditCard');

//   // Function to handle the order placement
//   const placeOrder = () => {
//     // Implement order placement logic here
//     console.log('Order placed:', { name, address, paymentMethod });
//   };

//   return (
//     <div>
//       <h2>Checkout</h2>
//       <form>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Shipping Address:</label>
//           <input
//             type="text"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Payment Method:</label>
//           <select
//             value={paymentMethod}
//             onChange={(e) => setPaymentMethod(e.target.value)}
//           >
//             <option value="creditCard">Credit Card</option>
//             <option value="paypal">PayPal</option>
//           </select>
//         </div>
//       </form>
//       <button onClick={placeOrder}>Place Order</button>
//     </div>
//   );
// }

// export default Checkout;
