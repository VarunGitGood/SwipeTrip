import { Button } from "./button";
import { MapPin, User } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <MapPin className="h-8 w-8 text-yellow-400" />
            <span className="ml-2 text-2xl font-bold text-gray-800">
              SwipeTrip
            </span>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium ml-4"
            >
              <User className="h-5 w-5 mr-1" />
              Profile
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
