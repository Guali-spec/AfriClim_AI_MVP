import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RecommendationService {
  private genAI;
  private modelName: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY')?.trim();
    if (!apiKey) {
      throw new Error('Missing GEMINI_API_KEY in environment.');
    }
    const rawModel =
      this.configService.get<string>('GEMINI_MODEL')?.trim() ||
      'models/gemini-2.5-flash';
    this.modelName = rawModel.startsWith('models/')
      ? rawModel
      : `models/${rawModel}`;
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async generateRecommendations(data: {
    city: string;
    temperature: number;
    rainfall: number;
    humidity: number;
    score: number;
    level: string;
  }) {
    try {
      const model = this.genAI.getGenerativeModel({
        model: this.modelName,
      });

      const prompt = `
You are a climate risk and resilience expert.

City: ${data.city}
Temperature: ${data.temperature} C
Rainfall: ${data.rainfall} mm
Humidity: ${data.humidity}%
Risk Score: ${data.score}/100
Risk Level: ${data.level}

Generate 4 short, practical, actionable climate resilience recommendations.
Be specific and realistic for African urban environments.
Return ONLY a valid JSON array of strings.
`;

      const result = await model.generateContent(prompt);

      const response = await result.response;
      const text = response.text();

      // Nettoyage si Gemini ajoute du markdown
      const cleaned = text.replace(/```json|```/g, '').trim();

      const parsed = JSON.parse(cleaned);

      return {
        items: parsed,
      };
    } catch (error) {
      console.error('Gemini Error:', error);

      // Fallback securise
      return {
        items:
          data.level === 'HIGH'
            ? [
                'Strengthen drainage infrastructure',
                'Deploy emergency response teams',
                'Implement early warning systems',
                'Increase public awareness campaigns',
              ]
            : [
                'Monitor weather patterns',
                'Encourage sustainable urban planning',
                'Promote community resilience training',
              ],
      };
    }
  }
}
