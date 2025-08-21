import { CartButton } from "./cart";
import { HeaderLinks } from "./headerLinks";

export function Header() {
  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-6xl flex flex-row bg-white items-center  gap-5 md:gap-15 border-b py-5 px-5 md:py-0 border-gray-200 w-full">
        <div className="order-2 md:order-1">
          <img src="/images/logo.svg" alt="sneakers logo" />
        </div>

        <div className="order-1 md:order-2">
          <HeaderLinks />
        </div>

        <div className="ml-auto order-3 flex flex-row gap-4 md:gap-8 items-center">
          <div>
            <CartButton />
          </div>

          <img
            src="/images/image-avatar.png"
            alt="profile picture"
            className="border border-2 rounded-full border-orange-500 md:w-10 md:h-10 w-8 h-8 cursor-pointer"
          />
        </div>
      </div>
    </header>
    </>
  );
}
