import React from "react";
import { motion } from "framer-motion";
import { Plane, Sun, MapPin } from "lucide-react";

const LoadingAnimation = () => {
  const iconVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 360, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const textVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex space-x-8 mb-8">
        <motion.div
          variants={iconVariants}
          animate="animate"
          className="text-yellow-400"
        >
          <Plane size={48} />
        </motion.div>
        <motion.div
          variants={iconVariants}
          animate="animate"
          className="text-yellow-400"
        >
          <Sun size={48} />
        </motion.div>
        <motion.div
          variants={iconVariants}
          animate="animate"
          className="text-yellow-400"
        >
          <MapPin size={48} />
        </motion.div>
      </div>
      <motion.p
        variants={textVariants}
        animate="animate"
        className="text-xl font-semibold text-gray-700"
      >
        Planning your perfect trip...
      </motion.p>
    </div>
  );
};

export default LoadingAnimation;
