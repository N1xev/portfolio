'use server';

import { intelligentCommandCompletion } from '@/ai/flows/intelligent-command-completion';

export async function getCommandSuggestions(
  userInput: string,
  navigationHistory: string[]
): Promise<string[]> {
  try {
    const result = await intelligentCommandCompletion({
      userInput,
      navigationHistory,
    });
    return result.suggestedCommands;
  } catch (error) {
    console.error('Error fetching command suggestions:', error);
    // In case of an error, return an empty array or handle it as needed.
    return [];
  }
}
