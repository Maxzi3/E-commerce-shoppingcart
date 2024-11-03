import React from "react";
const Contact = () => {
  return (
    <div className="flex md:flex-row flex-col text-secondary gap-10 justify-center py-10 ">
      <div>
        <div className=" bg-gray-500 p-10 md:h-56 h-48 w-11/12 text-white rounded-lg shadow-lg md:mx-0 mx-auto">
          <h2 className="md:pt-10 font-bold text-xl">
            Have Questions or Complaints?
          </h2>
          <p>
            Feel free to{" "}
            <a
              className="underline underline-offset-4 text-blue-800 cursor-pointer"
              href="https://wa.me/2349026575211"
              target="_blank"
            >
              Contact Us
            </a>{" "}
            today. We are here to help!
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center p-10  bg-gray-500 rounded-lg shadow-lg w-11/12 md:w-1/2 md:mx-0 mx-auto text-white/80">
        <h1 className="md:text-2xl text-xl font-bold  mb-4">
          Message Us, we will be with you shortly
        </h1>
        <form className="w-full max-w-lg">
          <div className="mb-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-lg font-semibold mb-2">
                Name
              </label>
              <input
                className="border border-gray-300 outline-none p-3 w-full mb-4 rounded-md"
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-lg font-semibold mb-2">
              Email
            </label>
            <input
              className="border border-gray-300 outline-none p-3 w-full mb-4 rounded-md"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="text-lg font-semibold mb-2">
              Phone
            </label>
            <input
              className="border border-gray-300 outline-none p-3 w-full mb-4 rounded-md"
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="text-lg font-semibold mb-2">
              Message
            </label>
            <textarea
              className="border border-gray-300 outline-none p-3 w-full h-32 rounded-md"
              id="message"
              name="message"
              placeholder="Write your message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-black text-white hover:bg-white hover:text-orange-600 font-semibold py-2 px-4 rounded-md"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
