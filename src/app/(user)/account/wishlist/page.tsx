import { CircleCheckBig, ShoppingCart, Trash } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  return (
    <section className="md:px-15 mx-auto my-10 w-full max-w-screen-xl px-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Wishlist</h1>
        <Link
          href="/"
          type="button"
          className="rounded-lg border border-primary bg-primary bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:text-primary focus:z-10 focus:text-primary-foreground focus:ring-2 focus:ring-primary-foreground dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-primary-foreground"
        >
          Add All to Cart
        </Link>
      </div>

      <div>
        <div className="my-10 flex flex-wrap items-center justify-center gap-8">
          <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white pl-2 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 md:max-w-xl md:flex-row">
            <img
              className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src="/images/deal-1.jpg"
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                R1 Concepts® - eLINE Series Plain Brake Rotors
              </h5>
              <p className="mb-1">
                Price : <del className="text-sm text-primary">$21.00</del>{" "}
                <span className="text-base font-semibold text-gray-600">
                  $230
                </span>
              </p>
              <p className="mb-1 flex items-center font-bold">
                {" "}
                <CircleCheckBig className="mr-2 h-4 w-4 font-semibold text-green-600" />
                In Stock{" "}
              </p>
              <p className="mb-1">
                Date Added :{" "}
                <span className="text-base font-semibold text-gray-600">
                  August 15, 2024
                </span>
              </p>

              {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laudantium magni illo, accusantium, mollitia et quisquam consectetur</p> */}
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <Link
                  href="/"
                  type="button"
                  className="rounded-s-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-primary-foreground hover:text-primary focus:z-10 focus:text-primary-foreground focus:ring-2 focus:ring-primary-foreground dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-primary-foreground"
                >
                  <ShoppingCart />
                </Link>
                <Link
                  href="/"
                  type="button"
                  className="border-b border-t border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-primary-foreground hover:text-primary focus:z-10 focus:text-primary-foreground focus:ring-2 focus:ring-primary-foreground dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-primary-foreground"
                >
                  Show Similar Product
                </Link>
                <Link
                  href="/"
                  type="button"
                  className="rounded-e-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-primary-foreground hover:text-primary focus:z-10 focus:text-primary-foreground focus:ring-2 focus:ring-primary-foreground dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-primary-foreground"
                >
                  <Trash />
                </Link>
              </div>
            </div>
          </div>
          {/* First End */}

          <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white pl-2 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 md:max-w-xl md:flex-row">
            <img
              className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src="/images/deal-1.jpg"
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                R1 Concepts® - eLINE Series Plain Brake Rotors
              </h5>
              <p className="mb-1">
                Price : <del className="text-sm text-primary">$21.00</del>{" "}
                <span className="text-base font-semibold text-gray-600">
                  $230
                </span>
              </p>
              <p className="mb-1 flex items-center font-bold">
                {" "}
                <CircleCheckBig className="mr-2 h-4 w-4 font-semibold text-green-600" />
                In Stock{" "}
              </p>
              <p className="mb-1">
                Date Added :{" "}
                <span className="text-base font-semibold text-gray-600">
                  August 15, 2024
                </span>
              </p>

              {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laudantium magni illo, accusantium, mollitia et quisquam consectetur</p> */}
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <Link
                  href="/"
                  type="button"
                  className="rounded-s-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-primary-foreground hover:text-primary focus:z-10 focus:text-primary-foreground focus:ring-2 focus:ring-primary-foreground dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-primary-foreground"
                >
                  <ShoppingCart />
                </Link>
                <Link
                  href="/"
                  type="button"
                  className="border-b border-t border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-primary-foreground hover:text-primary focus:z-10 focus:text-primary-foreground focus:ring-2 focus:ring-primary-foreground dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-primary-foreground"
                >
                  Show Similar Product
                </Link>
                <Link
                  href="/"
                  type="button"
                  className="rounded-e-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-primary-foreground hover:text-primary focus:z-10 focus:text-primary-foreground focus:ring-2 focus:ring-primary-foreground dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-primary-foreground"
                >
                  <Trash />
                </Link>
              </div>
            </div>
          </div>
          {/* Second list end */}

          <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white pl-2 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 md:max-w-xl md:flex-row">
            <img
              className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src="/images/deal-1.jpg"
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                R1 Concepts® - eLINE Series Plain Brake Rotors
              </h5>
              <p className="mb-1">
                Price : <del className="text-sm text-primary">$21.00</del>{" "}
                <span className="text-base font-semibold text-gray-600">
                  $230
                </span>
              </p>
              <p className="mb-1 flex items-center font-bold">
                {" "}
                <CircleCheckBig className="mr-2 h-4 w-4 font-semibold text-green-600" />
                In Stock{" "}
              </p>
              <p className="mb-1">
                Date Added :{" "}
                <span className="text-base font-semibold text-gray-600">
                  August 15, 2024
                </span>
              </p>

              {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laudantium magni illo, accusantium, mollitia et quisquam consectetur</p> */}
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <Link
                  href="/"
                  type="button"
                  className="rounded-s-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-primary-foreground hover:text-primary focus:z-10 focus:text-primary-foreground focus:ring-2 focus:ring-primary-foreground dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-primary-foreground"
                >
                  <ShoppingCart />
                </Link>
                <Link
                  href="/"
                  type="button"
                  className="border-b border-t border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-primary-foreground hover:text-primary focus:z-10 focus:text-primary-foreground focus:ring-2 focus:ring-primary-foreground dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-primary-foreground"
                >
                  Show Similar Product
                </Link>
                <Link
                  href="/"
                  type="button"
                  className="rounded-e-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-primary-foreground hover:text-primary focus:z-10 focus:text-primary-foreground focus:ring-2 focus:ring-primary-foreground dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-primary-foreground"
                >
                  <Trash />
                </Link>
              </div>
            </div>
          </div>
          {/* Third End */}

          <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white pl-2 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 md:max-w-xl md:flex-row">
            <img
              className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src="/images/deal-1.jpg"
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                R1 Concepts® - eLINE Series Plain Brake Rotors
              </h5>
              <p className="mb-1">
                Price : <del className="text-sm text-primary">$21.00</del>{" "}
                <span className="text-base font-semibold text-gray-600">
                  $230
                </span>
              </p>
              <p className="mb-1 flex items-center font-bold">
                {" "}
                <CircleCheckBig className="mr-2 h-4 w-4 font-semibold text-green-600" />
                In Stock{" "}
              </p>
              <p className="mb-1">
                Date Added :{" "}
                <span className="text-base font-semibold text-gray-600">
                  August 15, 2024
                </span>
              </p>

              {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laudantium magni illo, accusantium, mollitia et quisquam consectetur</p> */}
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <Link
                  href="/"
                  type="button"
                  className="rounded-s-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-primary-foreground hover:text-primary focus:z-10 focus:text-primary-foreground focus:ring-2 focus:ring-primary-foreground dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-primary-foreground"
                >
                  <ShoppingCart />
                </Link>
                <Link
                  href="/"
                  type="button"
                  className="border-b border-t border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-primary-foreground hover:text-primary focus:z-10 focus:text-primary-foreground focus:ring-2 focus:ring-primary-foreground dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-primary-foreground"
                >
                  Show Similar Product
                </Link>
                <Link
                  href="/"
                  type="button"
                  className="rounded-e-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-primary-foreground hover:text-primary focus:z-10 focus:text-primary-foreground focus:ring-2 focus:ring-primary-foreground dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-primary-foreground"
                >
                  <Trash />
                </Link>
              </div>
            </div>
          </div>
          {/* Fourth End */}
        </div>
      </div>
    </section>
  );
}
