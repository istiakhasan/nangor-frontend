"use server";

import { cookies } from "next/headers";

export async function addToCart(product) {
  const cookieStore = cookies();
  const cart = JSON.parse(cookieStore.get("cart")?.value || "[]");

  const existing = cart.find((c) => c.id === product?.id);

  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  cookieStore.set("cart", JSON.stringify(cart), {
    path: "/",
    httpOnly: false,
  });

  return cart;
}
