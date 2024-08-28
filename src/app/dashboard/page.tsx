"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, ArrowRight, Shuffle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Preferences } from ".";
import axios from "axios";

const totalSteps = 4;

export default function Dashboard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<Preferences>({
    budget: "",
    location: "",
    travelStyle: "",
    accommodation: "",
    activities: "",
  });

  const handleInputChange = (e: any) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: any, value: any) => {
    setPreferences({ ...preferences, [name]: value });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const startSwiping = async () => {
    try {
      console.log("Starting swiping with preferences:", preferences);
      const result = await axios.patch("/api/user", preferences);
      console.log("User preferences updated:", result.data);
      router.push("/swipe");
    } catch (error) {
      console.error("Error :", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <MapPin className="h-8 w-8 text-yellow-400" />
              <span className="ml-2 text-2xl font-bold text-gray-800">
                SwipeTrip
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              Let&apos;s Get to Know You
            </CardTitle>
            <p className=" text-sm text-center text-gray-400">
              These preferences can be changed later on
            </p>
            <div className="text-center text-sm text-gray-500 mt-2">
              Step {step} of {totalSteps}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
              <div
                className="bg-yellow-400 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              ></div>
            </div>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="budget">
                    What&apos;s your budget for this trip?
                  </Label>
                  <Input
                    id="budget"
                    name="budget"
                    placeholder="Enter your budget"
                    value={preferences.budget}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Where would you like to go?</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="Enter your desired location"
                    value={preferences.location}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <Label>What&apos;s your preferred travel style?</Label>
                <RadioGroup
                  onValueChange={(value) =>
                    handleSelectChange("travelStyle", value)
                  }
                  value={preferences.travelStyle}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="relaxed" id="relaxed" />
                    <Label htmlFor="relaxed">Relaxed</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="adventure" id="adventure" />
                    <Label htmlFor="adventure">Adventure</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cultural" id="cultural" />
                    <Label htmlFor="cultural">Cultural</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <Label>What type of accommodation do you prefer?</Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("accommodation", value)
                  }
                  value={preferences.accommodation}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select accommodation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="hostel">Hostel</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="resort">Resort</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            {step === 4 && (
              <div className="space-y-4">
                <Label>What activities are you most interested in?</Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("activities", value)
                  }
                  value={preferences.activities}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select preferred activities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sightseeing">Sightseeing</SelectItem>
                    <SelectItem value="outdoor">Outdoor Adventures</SelectItem>
                    <SelectItem value="food">
                      Food and Culinary Experiences
                    </SelectItem>
                    <SelectItem value="relaxation">
                      Relaxation and Wellness
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {step < totalSteps ? (
              <Button
                onClick={nextStep}
                className="bg-yellow-400 hover:bg-yellow-500 text-white"
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={startSwiping}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Start Swiping <Shuffle className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
