// components/Footer.tsx
import Image from "next/image";
import React from "react";

const ShortFooter = () => {
  return (
    <footer className="bg-gray-800 py-6 text-center text-white mb-20 md:mb-0">
      <div className="container mx-auto flex flex-col items-center space-y-2">
        {/* Logo */}
        <a>
          <Image
            src="https://i.ibb.co/5ggRm6QC/nonggor.png"
            alt="Logo"
            width={140}
            height={50}
            unoptimized
          />
        </a>

        {/* Copyright */}
        <p className="text-sm">
          © 2025, Istiak Hasan. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default ShortFooter;
