"use client"
// components/Footer.tsx
import Image from "next/image";
import React, { useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  LocationOn,
  Phone,
  Email,
  Send,
} from "@mui/icons-material";
import { IconButton, TextField, Button, Box, Typography } from "@mui/material";

const ShortFooter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would typically add your subscription logic
      console.log('Subscribed with:', email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About Section */}
          <div className="flex flex-col items-center md:items-start">
            <a href="#" className="mb-4 transition-transform hover:scale-105">
              <Image
                src="https://i.ibb.co/5ggRm6QC/nonggor.png"
                alt="Logo"
                width={160}
                height={60}
                unoptimized
                className="drop-shadow-lg"
              />
            </a>
            <Typography variant="body2" className="text-gray-300 text-center md:text-left max-w-xs">
              Your trusted partner for quality services and innovative solutions.
            </Typography>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <Typography variant="h6" className="border-b-2 border-blue-500 pb-2 inline-block">
              Contact Us
            </Typography>
            <div className="space-y-3">
              <Box display="flex" alignItems="flex-start" gap={1}>
                <LocationOn className="text-blue-400 mt-0.5" />
                <Typography variant="body2" className="text-gray-300">
                  Rampura TV Center Road, Dhaka, Bangladesh
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Phone className="text-blue-400" />
                <Typography
                  variant="body2"
                  component="a"
                  href="tel:09617179137"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  09617-179137
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Email className="text-blue-400" />
                <Typography
                  variant="body2"
                  component="a"
                  href="mailto:nonggor.business@gmail.com"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  nonggor.business@gmail.com
                </Typography>
              </Box>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <Typography variant="h6" className="border-b-2 border-blue-500 pb-2 inline-block">
              Follow Us
            </Typography>
            <Box display="flex" gap={2}>
              <IconButton
                href="#"
                className="bg-gray-700 hover:bg-blue-600 transition-all duration-300 hover:shadow-lg"
                aria-label="Facebook"
              >
                <Facebook className="text-white" />
              </IconButton>
              <IconButton
                href="#"
                className="bg-gray-700 hover:bg-blue-400 transition-all duration-300 hover:shadow-lg"
                aria-label="Twitter"
              >
                <Twitter className="text-white" />
              </IconButton>
              <IconButton
                href="#"
                className="bg-gray-700 hover:bg-pink-600 transition-all duration-300 hover:shadow-lg"
                aria-label="Instagram"
              >
                <Instagram className="text-white" />
              </IconButton>
              <IconButton
                href="#"
                className="bg-gray-700 hover:bg-blue-700 transition-all duration-300 hover:shadow-lg"
                aria-label="LinkedIn"
              >
                <LinkedIn className="text-white" />
              </IconButton>
            </Box>
            <Typography variant="body2" className="text-gray-300 mt-4">
              Connect with us for updates and news
            </Typography>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <Typography variant="h6" className="border-b-2 border-blue-500 pb-2 inline-block">
              Newsletter
            </Typography>
            <Typography variant="body2" className="text-gray-300">
              Subscribe to get special offers and updates
            </Typography>
            <Box component="form" onSubmit={handleSubscribe} className="space-y-3">
              <Box display="flex" gap={0.5}>
                <TextField
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  variant="outlined"
                  size="small"
                  fullWidth
                  className="bg-white rounded-l-lg"
                  InputProps={{
                    className: "text-gray-800",
                  }}
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<Send />}
                  className="bg-blue-600 hover:bg-blue-700 rounded-r-lg"
                  size="small"
                >
                  Join
                </Button>
              </Box>
              {subscribed && (
                <Typography variant="body2" className="text-green-400 animate-pulse">
                  Thank you for subscribing!
                </Typography>
              )}
            </Box>
          </div>
        </div>

        {/* Copyright and Bottom Links */}
        <Box
          className="border-t border-gray-700 mt-10 pt-6"
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body2" className="text-gray-400">
            © {new Date().getFullYear()}, Istiak Hasan. All rights reserved.
          </Typography>
          <Box display="flex" gap={3} mt={{ xs: 2, md: 0 }}>
            <Typography
              variant="body2"
              component="a"
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </Typography>
            <Typography
              variant="body2"
              component="a"
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </Typography>
            <Typography
              variant="body2"
              component="a"
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Sitemap
            </Typography>
          </Box>
        </Box>
      </div>
    </footer>
  );
};

export default ShortFooter;