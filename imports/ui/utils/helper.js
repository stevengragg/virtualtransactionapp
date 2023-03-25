// import moment from "moment";

import { APPROVED, CANCELLED, COMPLETED, DENIED, FOR_SCHEDULING, PENDING, SCHEDULED, WAITING_FOR_PAYMENT } from "/imports/both/constants";

/**
 * Combine all css class string passed in this function
 *
 * @param {String} classes
 * @returns String
 *
 */

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

/**
 * Return the RGV value equivalent of hexadecimal
 *
 * @param {String} h
 * @returns String
 *
 */

export const hexToRGB = (h) => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }
  return `${+r},${+g},${+b}`;
};

/**
 * Format the value to currency or money
 *
 * @param {String | Number} value
 * @returns String
 *
 */

export const formatValue = (value) =>
  Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 3,
    notation: "compact",
  }).format(value);

/**
 * Format the value to thousands
 *
 * @param {String | Number} value
 * @returns String
 *
 */

export const formatThousands = (value) =>
  Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 3,
    notation: "compact",
  }).format(value);

/**
 * Returns a greeting string
 *
 * @returns String
 *
 */

// export const greetings = () => {
//   const hour = moment().hour();

//   if (hour > 16) {
//     return "Good evening";
//   }

//   if (hour > 11) {
//     return "Good afternoon";
//   }

//   return "Good morning";
// };

export const yearsBack = (back) => {
  const year = new Date().getFullYear();
  return Array.from({ length: back }, (v, i) => year - back + i + 1);
};

export const extractPageTitle = (path) => {
  switch (path) {
    case "/dashboard":
      return "Dashboard";
    case "/requests":
      return "Requests";
    case "/requests/:id":
      return "Manage Request";
    case "/settings":
      return "Settings";
    default:
      return "Entry";
  }
};

export const extractColorOfStatus = (status) => {
  switch (status) {
    case PENDING:
      return "bg-yellow-700 text-white";
    case FOR_SCHEDULING:
      return "bg-green-700 text-white";
    case DENIED:
      return "bg-red-700 text-white";
    case COMPLETED:
      return "bg-blue-700 text-white";
    case SCHEDULED:
      return "bg-orange-700 text-white";
    case WAITING_FOR_PAYMENT:
      return "bg-purple-700 text-white";
    case CANCELLED:
      return "bg-gray-700 text-white";
    default:
      return "bg-gray-500";
  }
};
