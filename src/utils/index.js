import { toast } from "react-hot-toast";
const STORAGE_KEY = "recent_items";
const EXPIRY_DAYS = 7;

export function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const seconds = Math.floor((now - past) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const { label, seconds: intervalSeconds } of intervals) {
    const count = Math.floor(seconds / intervalSeconds);
    if (count > 0) {
      return `${count} ${label}${count > 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
}

export function getTimeLeft(type) {
  const now = new Date();
  let target;

  switch (type) {
    case "daily":
      target = new Date(now);
      target.setHours(24, 0, 0, 0);
      break;
    case "weekly": {
      target = new Date(now);
      const day = target.getDay();
      const diff = 7 - day;
      target.setDate(now.getDate() + diff);
      target.setHours(0, 0, 0, 0);
      break;
    }
    case "monthly":
      target = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      break;
    default:
      target = new Date();
  }

  const diff = target.getTime() - now.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  return {
    day: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    mins: String(mins).padStart(2, "0"),
    secs: String(secs).padStart(2, "0"),
  };
}

export const getParamString = (object = {}) => {
  const params = new URLSearchParams();

  Object.entries(object).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, value);
    }
  });

  return params.toString();
};

export const formatCurrency = (amount, currency = "USD", locale = "en-US") => {
  const numberingSystem =
    locale === "hi" ? "deva" : locale === "gu" ? "gujr" : "latn";
  locale =
    currency === "USD"
      ? "en-US"
      : currency === "EUR"
      ? "fr-FR"
      : locale === "hi"
      ? "hi-IN"
      : locale === "gu"
      ? "gu-IN"
      : "en-IN";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    numberingSystem: numberingSystem,
  }).format(amount);
};

export const getSellPercentage = (mrp, price) => {
  return 100 - Math.floor((price * 100) / mrp);
};

export const addCartToLocalstorage = (item) => {
  const cartData = JSON.parse(localStorage.getItem("cartData") || "[]");
  const exists = cartData.some(
    (cartItem) => cartItem.productId?._id === item.productId?._id
  );

  if (!exists) {
    const updatedCart = [...cartData, item];
    localStorage.setItem("cartData", JSON.stringify(updatedCart));
    toast.success("Cart added successfully.");
  } else {
    toast.info("Item is already in the cart.");
  }
};

export const deleteCartItemFromLocalstorage = (id) => {
  const cartData = JSON.parse(localStorage.getItem("cartData")).filter(
    (d) => d.productId._id !== id
  );
  localStorage.setItem("cartData", JSON.stringify(cartData));
  toast.success("Cart deleted successfully.");
};

export const editCartItemFromLocalstorage = (item) => {
  const cartData = JSON.parse(localStorage.getItem("cartData")).map((d) =>
    d.productId._id === item.productId._id ? item : d
  );
  localStorage.setItem("cartData", JSON.stringify(cartData));
  toast.success("Cart updated successfully.");
};

export const removeCartFromLocalstorage = () => {
  localStorage.removeItem("cartData");
};

export const addWishlistToLocalstorage = (item) => {
  const wishlistData = JSON.parse(localStorage.getItem("wishlistData") || "[]");
  const exists = wishlistData.some(
    (wishlistItem) => wishlistItem.productId?._id === item.productId?._id
  );

  if (!exists) {
    const updatedWishlist = [...wishlistData, item];
    localStorage.setItem("wishlistData", JSON.stringify(updatedWishlist));
    toast.success("Wishlist added successfully.");
  } else {
    deleteWishlistItemFromLocalstorage(item.productId._id);
  }
};

export const deleteWishlistItemFromLocalstorage = (id) => {
  const wishlistData = JSON.parse(localStorage.getItem("wishlistData")).filter(
    (d) => d.productId._id !== id
  );
  localStorage.setItem("wishlistData", JSON.stringify(wishlistData));
  toast.success("Wishlist deleted successfully.");
};

export const removeWishlistFromLocalstorage = () => {
  localStorage.removeItem("wishlistData");
};

export function isDateNotPast(item) {
  const saleItem = item?.length && item?.find((i) => i?.saleStatus);
  const now = new Date();
  const targetDate = new Date(saleItem?.endSaleOn);
  if (targetDate.getTime() > now.getTime() && saleItem.saleStatus) {
    return saleItem?.discountPrice;
  }
  return item[0]?.price;
}

export function isDateNotPastBoolean(item) {
  const saleItem = item?.length && item?.find((i) => i?.saleStatus);
  const now = new Date();
  const targetDate = new Date(saleItem?.endSaleOn);
  return targetDate.getTime() > now.getTime() && saleItem?.saleStatus;
}

export function getPercent(items) {
  let saleItem = items?.length && items?.find((i) => i?.saleStatus);
  const now = new Date();
  const targetDate = new Date(saleItem?.endSaleOn);
  if (targetDate.getTime() > now.getTime() && saleItem?.saleStatus) {
    return Math.round((saleItem?.discountPrice * 100) / saleItem?.mrp);
  }
  return (items[0].price * 100) / items[0].mrp;
}

export function addRecentItems(newItems) {
  const recentItems = getRecentItemsRaw();
  const timestamp = Date.now();

  // Filter out duplicates based on `id` from existing + new items
  const combined = [
    ...newItems.map((item) => ({ value: item, timestamp })),
    ...recentItems,
  ];

  const uniqueMap = new Map();
  for (const { value, timestamp } of combined) {
    // Always keep latest occurrence (new items overwrite old ones)
    uniqueMap.set(value._id, { value, timestamp });
  }

  const uniqueItems = Array.from(uniqueMap.values());

  localStorage.setItem(STORAGE_KEY, JSON.stringify(uniqueItems));
}

export function getRecentItems() {
  return getRecentItemsRaw().map((i) => i.value);
}

function getRecentItemsRaw() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];

  const now = Date.now();
  const expiryMs = EXPIRY_DAYS * 24 * 60 * 60 * 1000;

  const parsed = JSON.parse(data) || [];
  const valid = parsed.filter(({ timestamp }) => now - timestamp <= expiryMs);

  // Clean expired
  localStorage.setItem(STORAGE_KEY, JSON.stringify(valid));

  return valid;
}

export function clearRecentItems() {
  localStorage.removeItem(STORAGE_KEY);
}
