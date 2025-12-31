
import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const getAgentAdvice = async (toolName: string, framework: string): Promise<string> => {
  const ai = getAIClient();
  const prompt = `As a world-class QA Automation Architect, explain how a tester can transform the tool "${toolName}" into a fully autonomous "Automated Agent" for a project using the "${framework}" framework. Provide a step-by-step technical strategy including CI/CD integration and self-healing logic. Keep it concise but highly actionable.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text || "Could not generate advice at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The AI agent is currently offline. Please try again later.";
  }
};
