import React, { useState } from "react";
import carData from "../data/carData.json";
import { useSearchParams } from "react-router-dom";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [searchParams] = useSearchParams();
  const carId = parseInt(searchParams.get("carId")); // Convert carId to number
  
  // Assuming carData.json has a "carData" array inside the object
  const car = carData.carData.find((c) => c.id === carId);

  return (
    <main className="mx-auto p-6 rounded-lg flex flex-row gap-8 items-start">
        <div>
      {/* Billing Info */}
      <section className="mb-6 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-2">Billing Info</h2>
        <p className="text-gray-500 mb-4">Please enter your billing info</p>
        <div className="space-y-3">
          <input className="w-full p-3 border rounded" type="text" placeholder="Your name" />
          <input className="w-full p-3 border rounded" type="text" placeholder="Phone number" />
          <input className="w-full p-3 border rounded" type="text" placeholder="Address" />
          <input className="w-full p-3 border rounded" type="text" placeholder="Town or city" />
        </div>
      </section>

      {/* Rental Info */}
      <section className="mb-6 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-2">Rental Info</h2>
        <p className="text-gray-500 mb-4">Please select your rental date</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-1">Pick-Up</h3>
            <select className="w-full p-3 border rounded mb-2">
              <option>Select your city</option>
            </select>
            <input className="w-full p-3 border rounded mb-2" type="date" />
            <input className="w-full p-3 border rounded" type="time" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Drop-Off</h3>
            <select className="w-full p-3 border rounded mb-2">
              <option>Select your city</option>
            </select>
            <input className="w-full p-3 border rounded mb-2" type="date" />
            <input className="w-full p-3 border rounded" type="time" />
          </div>
        </div>
      </section>

      {/* Payment Method */}
      <section className="mb-6 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-2">Payment Method</h2>
        <p className="text-gray-500 mb-4">Please enter your payment method</p>
        <div className="space-y-3">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="payment"
              value="creditCard"
              checked={paymentMethod === "creditCard"}
              onChange={() => setPaymentMethod("creditCard")}
            />
            <span>Credit Card</span>
          </label>
          {paymentMethod === "creditCard" && (
            <div className="grid grid-cols-2 gap-3">
              <input className="w-full p-3 border rounded" type="text" placeholder="Card number" />
              <input className="w-full p-3 border rounded" type="text" placeholder="Expiration Date (MM/YY)" />
              <input className="w-full p-3 border rounded" type="text" placeholder="Card holder" />
              <input className="w-full p-3 border rounded" type="text" placeholder="CVC" />
            </div>
          )}
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="payment"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={() => setPaymentMethod("paypal")}
            />
            <span>PayPal</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="payment"
              value="bitcoin"
              checked={paymentMethod === "bitcoin"}
              onChange={() => setPaymentMethod("bitcoin")}
            />
            <span>Bitcoin</span>
          </label>
        </div>
      </section>

      {/* Confirmation */}
      <section className="mb-6 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-2">Confirmation</h2>
        <p className="text-gray-500 mb-4">We are getting to the end. Just a few clicks and your rental is ready!</p>
        <label className="flex items-center space-x-2">
          <input type="checkbox" />
          <span>I agree with receiving marketing emails. No spam, promised!</span>
        </label>
        <label className="flex items-center space-x-2 mt-2">
          <input 
            type="checkbox" 
            checked={agreeTerms} 
            onChange={() => setAgreeTerms(!agreeTerms)}
          />
          <span>I agree with the terms and conditions and privacy policy.</span>
        </label>
        <button 
          className={`w-full py-2 rounded mt-4 ${agreeTerms ? "bg-green-600 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
          disabled={!agreeTerms}
        >
          Rent Now
        </button>
      </section>
    </div>


      {/* Rental Summary */}
      <div>
      <section className="mb-6 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-2">Rental Summary</h2>
        <p className="text-gray-500 mb-4">Prices may change depending on rental length and car type.</p>
        
        {car ? (
          <div className="p-4 border rounded-lg bg-gray-100">
            <img className="w-24 h-16 object-cover rounded mb-2" src={car.image} alt={car.name} />
            <h3 className="text-lg font-medium">{car.name}</h3>
            <p className="text-sm text-gray-500">★★★★☆ {car.rating} ({Math.floor(car.rating * 100)}+ Reviews)</p>
            <p className="text-lg font-semibold mt-2">Subtotal: ${car.price.discounted}</p>
            <p className="text-lg">Tax: $0</p>
            <input className="w-full p-2 border rounded mt-2" type="text" placeholder="Apply promo code" />
            <button className="w-full bg-blue-600 text-white py-2 rounded mt-2">Apply</button>
            <h3 className="text-xl font-semibold mt-2">Total Rental Price: ${car.price.discounted}</h3>
          </div>
        ) : (
          <p className="text-gray-500">No car selected.</p>
        )}
      </section>
      </div>
    </main>
  );
};

export default Payment;