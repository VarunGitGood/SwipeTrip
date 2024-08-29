"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { MapPin, Plane, Sun, Umbrella } from "lucide-react";
import { useRouter } from "next/navigation";

const GoogleSVG = () => {
  return (
    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
      <path fill="none" d="M1 1h22v22H1z" />
    </svg>
  );
};

export default function Login() {
  const router = useRouter();
  const handleGoogleLogin = () => {
    console.log("Initiating Google login");
    router.push(process.env.NEXT_PUBLIC_API_URL + "/auth/google");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-yellow-400 flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-white mb-8 flex items-center"
      >
        <MapPin className="h-12 w-12 mr-2" />
        SwipeTrip
      </motion.div>

      <Card className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        <CardContent className="p-6">
          <p className="text-center text-gray-600 mb-6">
            Log in with your Google account to start planning your next
            adventure.
          </p>
          <Button
            onClick={handleGoogleLogin}
            className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex items-center justify-center"
          >
            <GoogleSVG />
            Sign in with Google
          </Button>
        </CardContent>
      </Card>

      <div className="mt-12 flex justify-center">
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="text-white text-6xl mx-4"
        >
          <Plane />
        </motion.div>
        <motion.div
          animate={{
            y: [0, 10, 0],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="text-white text-6xl mx-4"
        >
          <Sun />
        </motion.div>
        <motion.div
          animate={{
            y: [0, -5, 5, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="text-white text-6xl mx-4"
        >
          <Umbrella />
        </motion.div>
      </div>
    </div>
  );
}
