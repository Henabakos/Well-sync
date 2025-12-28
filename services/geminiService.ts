
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, Goal, Recommendation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generatePersonalizedRecommendations(
  profile: UserProfile,
  goals: Goal[]
): Promise<Recommendation[]> {
  const prompt = `
    Based on the following user profile and goals, generate exactly 3 personalized wellness recommendations (1 for nutrition, 1 for fitness, 1 for mental wellness).
    User Profile:
    - Age: ${profile.age}
    - Gender: ${profile.gender}
    - BMI: ${profile.bmi.toFixed(1)}
    - Activity Level: ${profile.activityLevel}
    - Stress Level: ${profile.stressLevel}/5
    - Priorities: ${profile.wellnessPriorities.join(', ')}
    - Restrictions: ${profile.dietaryRestrictions.join(', ')}

    Current Goals:
    ${goals.map(g => `- ${g.title} (Target: ${g.targetValue} ${g.unit} by ${g.targetDate})`).join('\n')}

    Please provide recommendations that are safe, practical for someone in Ethiopia (Addis Ababa timezone/context), and non-diagnostic.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              type: { type: Type.STRING, enum: ["nutrition", "fitness", "mental_wellness"] },
              content: { type: Type.STRING },
              confidenceScore: { type: Type.NUMBER },
              explanation: { type: Type.STRING },
              actionItems: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["id", "type", "content", "confidenceScore", "explanation", "actionItems"]
          }
        }
      }
    });

    const text = response.text || "[]";
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Recommendation Error:", error);
    return [];
  }
}

export async function estimateMealNutrition(description: string) {
  const prompt = `Estimate the nutritional content for the following meal: "${description}". 
  Provide estimated Calories, Protein (g), Carbs (g), and Fat (g). Return only JSON.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            calories: { type: Type.NUMBER },
            protein: { type: Type.NUMBER },
            carbs: { type: Type.NUMBER },
            fat: { type: Type.NUMBER }
          },
          required: ["calories", "protein", "carbs", "fat"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Nutrition Error:", error);
    return { calories: 0, protein: 0, carbs: 0, fat: 0 };
  }
}
