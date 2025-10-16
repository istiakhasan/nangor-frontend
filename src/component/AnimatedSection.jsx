// app/component/AnimatedSection.jsx
"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function AnimatedSection({ children }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false, // 👈 runs every time it enters the viewport
    threshold: 0.15, // trigger when 15% visible
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={controls}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
