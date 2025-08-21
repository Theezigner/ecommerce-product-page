import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export function HeaderLinks() {
  return (
    <>
      <ul className="flex flex-row gap-8 items-center text-sm text-gray-500">
        <NavLinks />
        <div className="items-center gap-4">
          <Hamburger />
        </div>
      </ul>
    </>
  );
}

function NavLinks() {
  // const navigate = useNavigate();

  return (
    <>
      <ul className="hidden md:flex flex-row gap-8 items-center text-sm text-gray-500">
        <NavLink
        to="/collection"
        className={({ isActive }) =>
            `w-fit cursor-pointer ${
            isActive ? "text-black border-b-2 border-orange-500 py-10" : "hover:text-black hover:border-b-2 hover:border-orange-500 py-10"
            }`
        }
        >
        Collection
        </NavLink>
        <NavLink
        to="/men"
        className={({ isActive }) =>
            `w-fit cursor-pointer ${
            isActive ? "text-black border-b-2 border-orange-500 py-10" : "hover:text-black hover:border-b-2 hover:border-orange-500 py-10"
            }`
        }
        >
        Men
        </NavLink>
        <NavLink
        to="/women"
        className={({ isActive }) =>
            `w-fit cursor-pointer ${
            isActive ? "text-black border-b-2 border-orange-500 py-10" : "hover:text-black hover:border-b-2 hover:border-orange-500 py-10"
            }`
        }
        >
        Women
        </NavLink>

        <NavLink
        to="/about"
        className={({ isActive }) =>
            `w-fit cursor-pointer ${
            isActive ? "text-black border-b-2 border-orange-500 py-10" : "hover:text-black hover:border-b-2 hover:border-orange-500 py-10"
            }`
        }
        >
        About
        </NavLink>
        <NavLink
        to="/contact"
        className={({ isActive }) =>
            `w-fit cursor-pointer ${
            isActive ? "text-black border-b-2 border-orange-500 py-10" : "hover:text-black hover:border-b-2 hover:border-orange-500 py-10"
            }`
        }
        >
        Contact
        </NavLink>
      </ul>
    </>
  );
}

function Hamburger() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div 
        className="md:hidden cursor-pointer"  
        aria-haspopup="menu"
        aria-expanded={open}
        tabIndex={0} // makes div focusable
        // onBlur={(e) => {
        // // close only if focus moves completely outside
        // if (!e.currentTarget.contains(e.relatedTarget)) {
        //     setOpen(false)
        // }}}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="space-y-1 w-4 h-4 grid place-items-center rounded "
      >
        <span className="bg-black block h-0.5 w-4"></span>
        <span className="bg-black block h-0.5 w-4"></span>
        <span className="bg-black block h-0.5 w-4"></span>
      </button>


        <aside
            className={[
            "fixed top-0 left-0 w-64 h-screen  bg-white p-5 shadow-xl ring-1 ring-black/5 z-50",
            "origin-left transform-gpu transition-all duration-300 ease-out",
            open
                ? "opacity-100 scale-x-100 translate-x-0 pointer-events-auto"
                : "opacity-0 scale-x-0 translate-x-0 pointer-events-none"
            ].join(" ")}
            role="menu"
            aria-hidden={!open}
        >
          <div onClick={() => setOpen(false)} className="font-bold pb-10 text-base">
            <p>X</p>
          </div>
          <ul className="flex flex-col gap-5 text-sm text-black font-semibold">
            <li
              onClick={() => navigate("/collection")}
              className="w-fit hover:text-black hover:border-b-2 hover:border-orange-500  cursor-pointer"
            >
              Collection
            </li>
            <li
              onClick={() => navigate("/men")}
              className="w-fit hover:text-black hover:border-b-2 hover:border-orange-500  cursor-pointer"
            >
              Men
            </li>
            <li
              onClick={() => navigate("/women")}
              className="w-fit hover:text-black hover:border-b-2 hover:border-orange-500  cursor-pointer"
            >
              Women
            </li>
            <li
              onClick={() => navigate("/about")}
              className="w-fit hover:text-black hover:border-b-2 hover:border-orange-500  cursor-pointer"
            >
              About
            </li>
            <li
              onClick={() => navigate("/contact")}
              className="w-fit hover:text-black hover:border-b-2 hover:border-orange-500  cursor-pointer"
            >
              Contact
            </li>
          </ul>
        </aside>
    </div>
  );
}
