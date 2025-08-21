import { useState } from "react";
import { useModal } from "../components/cart";
import type { Sneakers } from "./cart-context";

import { useCart } from "./cart-context";

export function Body() {
  const { addItem } = useCart();
  const [count, setCount] = useState(0);
  const { open } = useModal();

  const sneakers: Sneakers[] = [
    {
      id: "sneakers 1",
      cartImage: "/images/image-product-1.jpg",
      imageThumbnails: [
        "/images/image-product-1.jpg",
        "/images/image-product-2.jpg",
        "/images/image-product-3.jpg",
        "/images/image-product-4.jpg",
      ],
      company: "Sneaker Company",
      name: "Fall Limited Edition Sneakers",
      description:
        "This low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
      price: {
        sign: "$",
        price: 125.0,
        oldPrice: 250.0,
      },
    },
  ];

  const [selectedThumbnail, setSelectedThumbnail] = useState(0);

  const nextImage = () => {
    if (sneakers[0].imageThumbnails.length === 0) return;
    setSelectedThumbnail((i) => (i + 1) % sneakers[0].imageThumbnails.length);
  };

  const prevImage = () => {
    if (sneakers[0].imageThumbnails.length === 0) return;
    setSelectedThumbnail(
      (i) =>
        (i - 1 + sneakers[0].imageThumbnails.length) %
        sneakers[0].imageThumbnails.length
    );
  };

  return (
    <div className="flex flex-col md:flex-row pt-18 md:pt-35  md:py-15 md:px-55 py-0 px-0 ">
      <div className="flex flex-col gap-5">
        {/* MAIN IMAGE */}
        <div className="relative md:w-95 md:h-95 md:rounded-lg overflow-hidden">
          <div>
            <img
              src={sneakers[0].imageThumbnails[selectedThumbnail]} // main image comes from thumbnails
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute md:hidden flex flex-row justify-between w-full items-center top-1/2">
            <button
              onClick={prevImage}
              className="bg-gray-200 px-3 py-2 rounded-full opacity-80"
            >
              <img src="/images/icon-previous.svg" />
            </button>
            <button
              onClick={nextImage}
              className="bg-gray-200 px-3 py-2 rounded-full opacity-80"
            >
              <img src="/images/icon-next.svg" />
            </button>
          </div>
        </div>

        {/* THUMBNAILS */}
        <div className="hidden md:flex flex-row gap-5">
          {sneakers[0].imageThumbnails.map((thumb, index) => (
            <img
              key={index}
              onClick={() => setSelectedThumbnail(index)}
              src={thumb}
              className={`w-20 h-20 rounded cursor-pointer border-2 ${
                selectedThumbnail === index
                  ? "border-orange-500 opacity-50"
                  : "border-transparent"
              }`}
            />
          ))}
        </div>
      </div>

      {/* TEXT INFO */}
      <div className="flex flex-col md:pl-30 md:pt-15 py-10 px-5 gap-5">
        <p className="uppercase text-gray-500 text-xs font-semibold">
          {sneakers[0].company}
        </p>
        <h1 className="font-bold text-3xl md:text-5xl">{sneakers[0].name}</h1>
        <p className="text-sm md:text-lg text-gray-500">
          {sneakers[0].description}
        </p>
        <div className="flex items-center md:items-start md:flex-col justify-between">
          <div className="flex flex-row items-center gap-4">
            <h2 className="font-bold text-3xl">
              {sneakers[0].price.sign}
              {sneakers[0].price.price.toFixed(2)}
            </h2>
            <div className="bg-black text-white text-base font-bold py-1 px-2 rounded-lg">
              <p>50%</p>
            </div>
          </div>
          <p className="text-base line-through text-gray-500 font-semibold">
            {sneakers[0].price.sign}
            {sneakers[0].price.oldPrice}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex flex-row bg-gray-200 md:w-35 p-5 py-2 justify-between items-center rounded-lg font-bold text-xl">
            <button
              className="text-2xl text-orange-500 "
              onClick={() => setCount((count) => Math.max(count - 1, 0))}
            >
              -
            </button>
            <span>{count}</span>
            <button
              className="text-2xl text-orange-500 "
              onClick={() => setCount(count + 1)}
            >
              +
            </button>
          </div>
          <button
            onClick={() => {
              addItem(sneakers[0], count);
              setCount(0);
              open();
            }}
            disabled={count === 0}
            className={`flex flex-row rounded-lg items-center justify-center gap-2 px-10 py-2 ${
              count === 0
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-500"
            }`}
          >
            <img src="/images/icon-cart.svg" className="w-4 h-4" />
            <p className="text-sm font-semibold">Add to Cart</p>
          </button>
        </div>
      </div>
    </div>
  );
}
