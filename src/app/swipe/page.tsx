"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Check, MapPin, User, CheckCircle2, PlaneTakeoff } from 'lucide-react'

const travelPreferences = [
  { id: 1, category: 'Accommodation', option: 'Luxury Hotel', image: '/placeholder.svg?height=400&width=300' },
  { id: 2, category: 'Accommodation', option: 'Budget Hostel', image: '/placeholder.svg?height=400&width=300' },
  { id: 3, category: 'Activities', option: 'Museum Tours', image: '/placeholder.svg?height=400&width=300' },
  { id: 4, category: 'Activities', option: 'Outdoor Adventures', image: '/placeholder.svg?height=400&width=300' },
  { id: 5, category: 'Dining', option: 'Fine Dining', image: '/placeholder.svg?height=400&width=300' },
  { id: 6, category: 'Dining', option: 'Street Food', image: '/placeholder.svg?height=400&width=300' },
]

export default function Swipe() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [preferences, setPreferences] = useState<{ [key: string]: string }>({})
  const controls = useAnimation()
  const constraintsRef = useRef(null)

  const handleSwipe = (direction:any) => {
    const currentPreference = travelPreferences[currentCardIndex]
    if (direction === 'right') {
      setPreferences(prev => ({
        ...prev,
        [currentPreference.category]: currentPreference.option
      }))
    }
    
    controls.start({ x: direction === 'right' ? 1000 : -1000, opacity: 0 })
    setTimeout(() => {
      setCurrentCardIndex(prev => (prev + 1) % travelPreferences.length)
      controls.start({ x: 0, opacity: 1 })
    }, 300)
  }

  const generateItinerary = () => {
    console.log('Generating itinerary based on:', preferences)
    // Here you would typically call your backend API to generate the itinerary
  }

  useEffect(() => {
    controls.start({ opacity: 1, x: 0 })
  }, [currentCardIndex, controls])

  const currentCard = travelPreferences[currentCardIndex]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <MapPin className="h-8 w-8 text-yellow-400" />
              <span className="ml-2 text-2xl font-bold text-gray-800">SwipeTrip</span>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium ml-4">
                <User className="h-5 w-5 mr-1" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0 w-full max-w-6xl mb-8">
          <Card className="w-full lg:w-2/3 bg-white rounded-xl shadow-lg overflow-hidden">
            <CardContent className="p-0" ref={constraintsRef}>
              <motion.div
                drag="x"
                dragConstraints={constraintsRef}
                onDragEnd={(event, info) => {
                  if (info.offset.x > 100) handleSwipe('right')
                  else if (info.offset.x < -100) handleSwipe('left')
                }}
                animate={controls}
                initial={{ opacity: 0 }}
                className="cursor-grab active:cursor-grabbing"
              >
                <div className="relative">
                  <img src={currentCard.image} alt={currentCard.option} className="w-full h-[calc(100vh-24rem)] object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                    <h3 className="text-white text-2xl font-semibold">{currentCard.category}</h3>
                    <p className="text-white text-xl mt-2">{currentCard.option}</p>
                  </div>
                </div>
              </motion.div>
            </CardContent>
            <CardFooter className="flex justify-between p-6 bg-white">
              <Button onClick={() => handleSwipe('left')} className="bg-white hover:bg-gray-100 text-red-500 rounded-full p-4 shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 border border-gray-200">
                <X className="w-8 h-8" />
                <span className="sr-only">Dislike</span>
              </Button>
              <Button onClick={() => handleSwipe('right')} className="bg-white hover:bg-gray-100 text-green-500 rounded-full p-4 shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 border border-gray-200">
                <Check className="w-8 h-8" />
                <span className="sr-only">Like</span>
              </Button>
            </CardFooter>
          </Card>

          <Card className="w-full lg:w-1/3 bg-white rounded-xl shadow-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {travelPreferences.map(pref => (
                  <li key={pref.id} className="flex items-center text-sm">
                    {preferences[pref.category] ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    ) : (
                      <div className="h-5 w-5 border-2 border-gray-300 rounded-full mr-2 flex-shrink-0" />
                    )}
                    <span className="text-gray-700">{pref.category}</span>
                    {preferences[pref.category] && (
                      <span className="ml-auto text-sm text-gray-500">{preferences[pref.category]}</span>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Button 
          onClick={generateItinerary} 
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
        >
          <PlaneTakeoff className="w-5 h-5 mr-2" />
          Generate Itinerary
        </Button>
      </main>
    </div>
  )
}