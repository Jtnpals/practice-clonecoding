import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="bg-slate-400 py-10 px-5 grid gap-10  min-h-screen">
      <div className="bg-white p-6 rounded-2xl shadow-xl">
        <span className="font-semibold text-3xl">Select Item</span>
        <div className="flex justify-between">
          <span className="text-gray-500">Gray Chair</span>
          <span>$19</span>
        </div>
        <div className="flex justify-between my-2">
          <span className="text-gray-500">Gray Chair</span>
          <span>$19</span>
        </div>
        <div className="flex justify-between mt-2 pt-2 border-t-2 border-dashed">
          <span>Total</span>
          <span>$10</span>
        </div>
        <button className="block mt-5 focus:text-red-500 active:bg-yellow-500 hover:text-black bg-blue-500 text-white p-3 text-center rounded-xl w-1/2 mx-auto hover:bg-teal-500">
          Checkout
        </button>
      </div>
      <div className="bg-white overflow-hidden rounded-2xl shadow-xl">
        <div className="bg-blue-500 p-6 pb-14">
          <span className="text-white text-2xl">Profile</span>
        </div>
        <div className="rounded-3xl bg-white relative -top-5 p-6">
          <div className="flex relative -top-10 items-end justify-between">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Orders</span>
              <span className="font-medium">340</span>
            </div>
            <div className="h-24 w-24 bg-red-400 rounded-full"></div>
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Spent</span>
              <span className="font-medium">$340</span>
            </div>
          </div>
          <div className="relative flex flex-col items-center -mt-8 -mb-5">
            <span className="text-lg font-medium">Tony Molly</span>
            <span className="text-sm text-gray-500">USA</span>
          </div>
        </div>
      </div>
      <div className="bg-white p-10 rounded-2xl shadow-xl">
        <div className="flex mb-5 justify-between items-center">
          <span>⬅</span>
          <div className="space-x-3">
            <span>★ 4.9</span>
            <span className="shadow-xl p-2 rounded-md">♡</span>
          </div>
        </div>
        <div className="bg-zinc-400 h-72 mb-5"></div>
        <div className="flex flex-col">
          <span className="font-medium text-xl mb-1.5">Swoon Lounge</span>
          <span className="text-xs text-gray-500">Chair</span>
          <div className="mt-3 mb-5 flex justify-between items-center">
            <div className="space-x-3">
              <button className="w-5 h-5 rounded-full bg-yellow-500 focus:ring-2 ring-offset-2 ring-yellow-500 transition"></button>
              <button className="w-5 h-5 rounded-full bg-indigo-500 ring-2 ring-offset-2"></button>
              <button className="w-5 h-5 rounded-full bg-teal-500 ring-2 ring-offset-2"></button>
            </div>
            <div className="flex items-center space-x-5">
              <button className="p-1.5 bg-blue-200 flex rounded-lg justify-center items-center w-10 font-medium text-xl text-gray-500">
                -
              </button>
              <span>1</span>
              <button className="p-1.5 bg-blue-200 flex rounded-lg justify-center items-center w-10 font-medium text-xl text-gray-500">
                +
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-2xl">$450</span>
            <button className="bg-blue-500 py-2 px-8 text-xs text-center text-white rounded-lg">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
