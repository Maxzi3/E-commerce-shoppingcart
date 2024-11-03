import React from 'react'

const Checkout = () => {
  return (
    <div>
      <form className="p-6 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Full Name</label>
          <input type="text" className="w-full p-2 border rounded-lg" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Address</label>
          <input type="text" className="w-full p-2 border rounded-lg" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Payment Method</label>
          <select className="w-full p-2 border rounded-lg">
            <option>Credit Card</option>
            <option>PayPal</option>
          </select>
        </div>
        <button className="bg-green-500 text-white py-2 px-4 rounded">
          Complete Order
        </button>
      </form>
    </div>
  );
}

export default Checkout
