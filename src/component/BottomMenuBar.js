'use client';
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import AppsIcon from "@mui/icons-material/Apps";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";

export default function BottomMenuBar({ cartCount = 0 }) {
  const pathName = usePathname();
  const [openSidebar, setOpenSidebar] = useState(false);
   const cartItems = useSelector((state) => state.cart);
  const menuItems = [
      { path: "/categories", icon: <AppsIcon />, label: "Categories" },
    { path: "/", icon: <HomeIcon />, label: "Home" },
    { path: "/cart", icon: <ShoppingCartIcon />, label: "Cart", showBadge: true },
    { path: "/account", icon: <AccountCircleIcon />, label: "Account" },
  ];
  const sidebarMenu = [
    { path: "/", icon: <HomeIcon />, label: "Home" },
    { path: "/about", icon: <AppsIcon />, label: "About" },
    { path: "/shop", icon: <ShoppingCartIcon />, label: "shop"},
    { path: "/cart", icon: <AccountCircleIcon />, label: "Cart" },
    { path: "/contact", icon: <AccountCircleIcon />, label: "Contact" },
  ];
console.log(cartItems?.cart,"abcd");
  return (
    <>
      {/* Bottom Menu Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
        <div className="flex justify-around items-center p-2">
          {/* Menu icon for sidebar */}
          <button
            onClick={() => setOpenSidebar(true)}
            className="flex flex-col items-center px-4 py-2 rounded-lg text-gray-600 hover:text-blue-500 transition-colors"
          >
            <i className="ri-menu-line text-xl"></i>
            <span className="text-xs mt-1">Menu</span>
          </button>

          {menuItems.map((item) => {
            const isActive = pathName === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-500"
                }`}
              >
                <div className="relative">
                  {item.icon}
                  {item.showBadge && cartItems?.cart?.length > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems?.cart?.length > 99 ? "99+" : cartItems?.cart?.length}
                    </span>
                  )}
                </div>
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Sidebar Drawer */}
      <Drawer anchor="left" open={openSidebar} onClose={() => setOpenSidebar(false)}>
        <div className="w-64 flex flex-col h-full">
          <div className="p-4 text-lg font-semibold text-blue-600 border-b">
            Menu
          </div>
          <List>
            {sidebarMenu?.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setOpenSidebar(false)}
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
}
