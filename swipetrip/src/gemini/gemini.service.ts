import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

const PROMPT = `
    I will be providing to you 
    1. The preferences of the user for travelling
    2. The stuff the user wants to do for this trip (like sightseeing, adventure sports, type of hotel etc.)
    3. Location
    4. Budget

    I want you to generate a JSON object which will have the following structure:
    {
  "itineraries": [
    {
      "day": 1,
      "activities": [
        {
          "name": "Visit the Eiffel Tower",
          "description": "Experience the stunning views of Paris from the top.",
          "time": "10:00 AM",
          "location": "Eiffel Tower, Paris"
        },
        {
          "name": "Lunch at Le Jules Verne",
          "description": "Enjoy gourmet French cuisine with a view.",
          "time": "12:30 PM",
          "location": "Le Jules Verne, Eiffel Tower"
        }
      ],
      "costForDay": 150
    }
]}
    This is just an example. You can generate the JSON object based on the preferences and other details provided below.
    So here is the following data:
`;

@Injectable()
export class GeminiService {
  private generativeModel;
  private googleGenerativeAI;

  constructor() {
    this.googleGenerativeAI = new GoogleGenerativeAI(
      process.env.GOOGLE_API_KEY,
    );
    this.generativeModel = this.googleGenerativeAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });
  }

  async generateText(prompt: string): Promise<string> {
    const response = await this.generativeModel.generateContent(
      PROMPT + prompt,
    );
    const text = await response.response.text();
    return text;
  }
}
