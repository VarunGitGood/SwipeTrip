import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

const PROMPT = `
    LIMIT TO 2 days only 
    I will be providing to you 1. The preferences of the user for travelling_2. The stuff the user wants to do for this trip (like sightseeing, adventure sports, type of hotel etc.)_3. Location_4. Budget_I want you to generate a JSON object which will have the following structure:
    {"itineraries": [{"day": number,"activities": [{"name": string,"description": string,"time": string,"location": string,},],"costForDay": number}]}_This is just an example. You can generate the JSON object based on the preferences and other details provided below._So here is the following data:`;

@Injectable()
export class GeminiService {
  private generativeModel;
  private googleGenerativeAI;

  constructor() {
    this.googleGenerativeAI = new GoogleGenerativeAI(
      process.env.GOOGLE_API_KEY,
    );
    this.generativeModel = this.googleGenerativeAI.getGenerativeModel({
      model: 'gemini-1.5-pro-exp-0801',
      generationConfig: { responseMimeType: 'application/json' },
    });
  }

  async generateText(prompt: string): Promise<string> {
    try {
      const tokens = await this.generativeModel.countTokens(PROMPT + prompt);
      console.log('Tokens:', tokens.totalTokens);
      const response = await this.generativeModel.generateContent(
        PROMPT + prompt,
      );
      const text = await response.response.text();
      return text;
    } catch (error) {
      console.error('Error generating text:', error);
      return '';
    }
  }
}
