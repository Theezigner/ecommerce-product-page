import { useNavigate } from "react-router-dom";

export function Collections() {
    const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col  md:pt-26 pt-20 w-full h-screen md:flex-row text-white">
        <div className="relative group hover:text-orange-400 border border-white" onClick={() => navigate("/women")}>
          <img
            src="/images/image-product-1.jpg"
            alt="Summer"
            className="md:h-157 w-full h-41 md:w-89 max-w-lg object-cover"
          />
          <div className="absolute inset-0 bg-black/70 group-hover:bg-black/70 transition" />
          <p className="text-3xl font-semibold absolute top-1 left-1 md:top-1/2 md:left-1/3">
            Summer
          </p>
        </div>
        <div className="relative group hover:text-orange-400 border border-white" onClick={() => navigate("/women")}>
          <img
            src="/images/image-product-2.jpg"
            alt="Winter"
            className="md:h-157 w-full h-41 md:w-89 max-w-lg object-cover"
          />
          <div className="absolute inset-0 bg-black/70 group-hover:bg-black/70 transition" />
          <p className="text-3xl font-semibold absolute top-1 left-1 md:top-1/2 md:left-1/3">
            Winter
          </p>
        </div>
        <div className="relative group hover:text-orange-400 border border-white" onClick={() => navigate("/women")}>
          <img
            src="/images/image-product-3.jpg"
            alt="Fall"
            className="md:h-157 w-full h-41 md:w-89 max-w-lg object-cover"
          />
          <div className="absolute inset-0 bg-black/70 group-hover:bg-black/70 transition" />
          <p className="text-3xl font-semibold absolute top-1 left-1 md:top-1/2 md:left-1/3">
            Fall
          </p>
        </div>
        <div className="relative group hover:text-orange-400 border border-white" onClick={() => navigate("/women")}>
          <img
            src="/images/image-product-4.jpg"
            alt="Spring"
            className="md:h-157 w-full h-41 md:w-89 max-w-lg object-cover"
          />
          <div className="absolute inset-0 bg-black/70 group-hover:bg-black/70 transition" />
          <p className="text-3xl font-semibold absolute top-1 left-1 md:top-1/2 md:left-1/3">
            Spring
          </p>
        </div>
      </div>
    </>
  );
}
