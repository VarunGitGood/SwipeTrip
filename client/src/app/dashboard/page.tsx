"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Skeleton } from "../../components/ui/skeleton";
import { MapPin, ArrowRight, Shuffle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Preferences } from ".";
import axios from "axios";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../../components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { Navbar } from "@/components/ui/navbar";

const totalSteps = 4;

export default function Dashboard() {
  const router = useRouter();
  useAuthRedirect();
  const [step, setStep] = useState(1);
  const [countries, setCountries] = useState([]);
  const [preferences, setPreferences] = useState<Preferences>({
    budget: "",
    location: "",
    travelExperience: "",
    tripPace: "",
    travelCompanions: "",
  });
  const [showDashboard, setShowDashboard] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name !== "budget" && name !== "location" && value.length > 300) {
      return;
    }
    setPreferences({ ...preferences, [name]: value });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const startSwiping = async () => {
    try {
      const result = await axios.patch(
        process.env.NEXT_PUBLIC_API_URL + "/user",
        { preferences },
        {
          withCredentials: true,
        }
      );
      console.log("User preferences updated:", result.data);
      router.push("/swipe");
    } catch (error) {
      console.error("Error updating user preferences:", error);
    }
  };

  const fetchPreferences = async () => {
    try {
      const result = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/user",
        {
          withCredentials: true,
        }
      );
      console.log("User preferences fetched:", result.data);
      if (result.data.preferences) {
        setShowDashboard(true);
        setPreferences(result.data.preferences);
      }
    } catch (error) {
      console.error("Error fetching user preferences:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCountries = async () => {
    const res = await axios.get("https://restcountries.com/v3.1/all");
    const data = res.data.map((country: any) => country.name.common);
    setCountries(data);
  };

  useEffect(() => {
    fetchPreferences();
    fetchCountries();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-32 w-full" />
        </div>
      );
    }

    return (
      <>
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
              <Label htmlFor="location">Where would you like to travel?</Label>
              <br></br>
              <Select
                onValueChange={(value) =>
                  setPreferences({ ...preferences, location: value })
                }
              >
                <SelectTrigger id="location">
                  <SelectValue placeholder="Choose an option" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <Label htmlFor="travelExperience">
              Describe your ideal travel experience. Do you prefer a relaxed and
              comfortable trip, or are you looking for more adventurous and
              active activities? Please provide a brief description (up to 300
              characters).
            </Label>
            <Textarea
              id="travelExperience"
              name="travelExperience"
              placeholder="Describe your ideal travel experience..."
              value={preferences.travelExperience}
              onChange={handleInputChange}
              maxLength={300}
              className="h-32 resize-none"
            />
            <p className="text-sm text-gray-500">
              {preferences.travelExperience &&
                preferences.travelExperience.length}
              /300 characters
            </p>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <Label htmlFor="tripPace">
              How would you describe your preferred pace for the trip? Do you
              enjoy a packed schedule with lots of activities, or do you prefer
              a more leisurely pace with plenty of downtime? Please describe
              your ideal balance.
            </Label>
            <Textarea
              id="tripPace"
              name="tripPace"
              placeholder="Describe your preferred trip pace..."
              value={preferences.tripPace}
              onChange={handleInputChange}
              maxLength={300}
              className="h-32 resize-none"
            />
            <p className="text-sm text-gray-500">
              {preferences.tripPace && preferences.tripPace.length}/300
              characters
            </p>
          </div>
        )}
        {step === 4 && (
          <div className="space-y-4">
            <Label htmlFor="travelCompanions">
              Who will you be traveling with? Are you traveling solo, with a
              partner, family, or friends? Let us know if there are any specific
              needs or preferences based on your travel companions (e.g.,
              kid-friendly activities, romantic spots, group activities)
            </Label>
            <Textarea
              id="travelCompanions"
              name="travelCompanions"
              placeholder="Describe your travel companions and any specific needs..."
              value={preferences.travelCompanions}
              onChange={handleInputChange}
              maxLength={300}
              className="h-32 resize-none"
            />
            <p className="text-sm text-gray-500">
              {preferences.travelCompanions &&
                preferences.travelCompanions.length}
              /300 characters
            </p>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              {isLoading ? (
                <Skeleton className="h-8 w-3/4 mx-auto" />
              ) : showDashboard ? (
                "Your Preferences"
              ) : (
                "Let's Get to Know You"
              )}
            </CardTitle>
            <div className="text-sm text-center text-gray-400">
              {isLoading ? (
                <Skeleton className="h-4 w-1/2 mx-auto" />
              ) : showDashboard ? (
                "Update your preferences below"
              ) : (
                "Answer a few questions to get started"
              )}
            </div>
            {!isLoading && (
              <>
                <div className="text-center text-sm text-gray-500 mt-2">
                  Step {step} of {totalSteps}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                  <div
                    className="bg-yellow-400 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${(step / totalSteps) * 100}%` }}
                  ></div>
                </div>
              </>
            )}
          </CardHeader>
          <CardContent>{renderContent()}</CardContent>
          <CardFooter className="flex justify-between">
            {!isLoading && (
              <Button
                onClick={step < totalSteps ? nextStep : startSwiping}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-white"
              >
                {step < totalSteps ? (
                  <>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Start Swiping <Shuffle className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
