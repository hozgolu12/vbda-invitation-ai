
import { pipeline } from "@huggingface/transformers";

// Cache the model to avoid reloading it
let textGenerationPipeline: any = null;

export const generatePersonalizedHook = async (
  name: string,
  achievement: string,
  organization: string,
  role: string
): Promise<string> => {
  try {
    console.log("Generating personalized hook...");
    
    if (!textGenerationPipeline) {
      console.log("Loading text generation model...");
      // Use a small model suitable for text generation in the browser
      textGenerationPipeline = await pipeline(
        "text-generation",
        "TinyLlama/TinyLlama-1.1B-Chat-v1.0", 
        { device: "webgpu" }
      );
      console.log("Model loaded successfully");
    }

    // Create a prompt that instructs the model to generate a personalized hook
    const prompt = `Write a single short personalized hook for an email invitation to ${name} who is a ${role} at ${organization} and recently achieved ${achievement}. The hook should compliment their achievement and relate it to why they're being invited to the Viksit Bharat event. Keep it under 100 characters and don't include salutations.`;
    
    console.log("Sending prompt to model:", prompt);
    
    // Generate text
    const result = await textGenerationPipeline(prompt, {
      max_length: 150,
      temperature: 0.7,
      top_p: 0.95,
    });
    
    // Extract the generated text from the result
    let generatedText = result[0].generated_text;
    
    // Remove the original prompt from the response
    generatedText = generatedText.replace(prompt, '').trim();
    
    // Clean up any artifacts like extra quotes or markers
    generatedText = generatedText.replace(/^["']|["']$/g, '').trim();
    
    console.log("Generated hook:", generatedText);
    return generatedText;
  } catch (error) {
    console.error("Error generating personalized hook:", error);
    return "Your recent achievements are impressive and we'd love your insights at our event.";
  }
};
