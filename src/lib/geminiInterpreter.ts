// Gemini API Integration for Human Language to Linux Command Interpretation

import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

export interface GeminiCommandResult {
  command: string;
  args: string[];
  flags?: string[];
  confidence: number;
  explanation?: string;
}

export class GeminiInterpreter {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;
  private apiKey: string;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('Google Gemini API key is required');
    }
    this.apiKey = apiKey;
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  /**
   * Convert human language input to Linux command using Gemini API
   */
  async interpretHumanLanguage(input: string): Promise<GeminiCommandResult> {
    try {
      const prompt = this.buildPrompt(input);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return this.parseGeminiResponse(text, input);
    } catch (error) {
      console.error('Gemini API Error:', error);
      // Fallback to basic parsing if API fails
      return this.fallbackParsing(input);
    }
  }

  /**
   * Build the prompt for Gemini API
   */
  private buildPrompt(input: string): string {
    return `You are a Linux command expert. Convert the following human language request into a valid Linux command.

Human Request: "${input}"

Rules:
1. Return ONLY the Linux command with appropriate flags and arguments
2. Use standard Linux commands (ls, cd, mkdir, rm, cp, mv, grep, find, etc.)
3. Include necessary flags (-l, -a, -r, -f, etc.) when appropriate
4. Format your response as JSON with this exact structure:
{
  "command": "command_name",
  "args": ["arg1", "arg2"],
  "flags": ["-flag1", "-flag2"],
  "confidence": 0.95,
  "explanation": "Brief explanation of what this command does"
}

5. If the request is unclear, set confidence lower than 0.5
6. Always return valid JSON - no extra text or explanations outside the JSON

Examples:
Input: "show me all files including hidden ones in long format"
Output: {"command": "ls", "args": ["."], "flags": ["-la"], "confidence": 0.95, "explanation": "List all files including hidden ones in long format"}

Input: "create a folder called myproject"
Output: {"command": "mkdir", "args": ["myproject"], "flags": [], "confidence": 0.98, "explanation": "Create a new directory named myproject"}

Input: "remove file.txt forcefully"
Output: {"command": "rm", "args": ["file.txt"], "flags": ["-f"], "confidence": 0.92, "explanation": "Remove file.txt forcefully without confirmation"}

Now convert this request: "${input}"`;
  }

  /**
   * Parse Gemini API response
   */
  private parseGeminiResponse(response: string, originalInput: string): GeminiCommandResult {
    try {
      // Clean up the response - extract JSON if there's extra text
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      const parsed = JSON.parse(jsonMatch[0]);
      
      // Validate the response structure
      if (!parsed.command || !Array.isArray(parsed.args)) {
        throw new Error('Invalid response structure');
      }

      return {
        command: parsed.command,
        args: parsed.args || [],
        flags: parsed.flags || [],
        confidence: parsed.confidence || 0.5,
        explanation: parsed.explanation
      };
    } catch (error) {
      console.error('Error parsing Gemini response:', error);
      return this.fallbackParsing(originalInput);
    }
  }

  /**
   * Fallback parsing method when API fails
   */
  private fallbackParsing(input: string): GeminiCommandResult {
    const lowerInput = input.toLowerCase().trim();
    
    // Basic keyword-based fallback
    if (lowerInput.includes('list') || lowerInput.includes('show') || lowerInput.includes('ls')) {
      return {
        command: 'ls',
        args: ['.'],
        flags: lowerInput.includes('hidden') ? ['-a'] : [],
        confidence: 0.3,
        explanation: 'Basic fallback parsing for listing files'
      };
    }
    
    if (lowerInput.includes('create') && lowerInput.includes('folder')) {
      return {
        command: 'mkdir',
        args: ['new_folder'],
        flags: [],
        confidence: 0.3,
        explanation: 'Basic fallback parsing for creating folder'
      };
    }
    
    if (lowerInput.includes('remove') || lowerInput.includes('delete')) {
      return {
        command: 'rm',
        args: ['file'],
        flags: [],
        confidence: 0.3,
        explanation: 'Basic fallback parsing for removing files'
      };
    }

    // Default fallback
    return {
      command: 'echo',
      args: [input],
      flags: [],
      confidence: 0.1,
      explanation: 'Unable to interpret command - echoing input instead'
    };
  }

  /**
   * Test the API connection
   */
  async testConnection(): Promise<boolean> {
    try {
      const result = await this.interpretHumanLanguage('list files');
      return result.confidence > 0.5;
    } catch (error) {
      console.error('Gemini connection test failed:', error);
      return false;
    }
  }
}

// Singleton instance
let geminiInterpreter: GeminiInterpreter | null = null;

/**
 * Get or create the Gemini interpreter instance
 */
export function getGeminiInterpreter(): GeminiInterpreter | null {
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY || 
                 process.env.GOOGLE_GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    console.warn('Google Gemini API key not configured');
    return null;
  }

  if (!geminiInterpreter) {
    geminiInterpreter = new GeminiInterpreter(apiKey);
  }

  return geminiInterpreter;
}

/**
 * Interpret human language using Gemini API with fallback
 */
export async function interpretWithGemini(input: string): Promise<GeminiCommandResult> {
  const interpreter = getGeminiInterpreter();
  
  if (!interpreter) {
    // Return a fallback result when API is not configured
    return {
      command: 'echo',
      args: [`Gemini API not configured. Please set GOOGLE_GEMINI_API_KEY in your .env file. Original input: ${input}`],
      flags: [],
      confidence: 0.0,
      explanation: 'API not configured'
    };
  }

  try {
    return await interpreter.interpretHumanLanguage(input);
  } catch (error) {
    console.error('Gemini interpretation failed:', error);
    return {
      command: 'echo',
      args: [`Gemini API error: ${error instanceof Error ? error.message : 'Unknown error'}. Original input: ${input}`],
      flags: [],
      confidence: 0.0,
      explanation: 'API error occurred'
    };
  }
}
