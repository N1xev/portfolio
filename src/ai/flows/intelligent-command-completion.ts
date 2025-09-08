
'use server';

/**
 * @fileOverview An intelligent command completion AI agent.
 *
 * - intelligentCommandCompletion - A function that suggests and auto-completes commands for terminal navigation.
 * - IntelligentCommandCompletionInput - The input type for the intelligentCommandCompletion function.
 * - IntelligentCommandCompletionOutput - The return type for the intelligentCommandCompletion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentCommandCompletionInputSchema = z.object({
  userInput: z
    .string()
    .describe('The current user input in the terminal.'),
  navigationHistory: z
    .array(z.string())
    .describe('The history of commands the user has entered.'),
});
export type IntelligentCommandCompletionInput = z.infer<
  typeof IntelligentCommandCompletionInputSchema
>;

const IntelligentCommandCompletionOutputSchema = z.object({
  suggestedCommands: z
    .array(z.string())
    .describe('An array of suggested commands based on the user input and navigation history.'),
});
export type IntelligentCommandCompletionOutput = z.infer<
  typeof IntelligentCommandCompletionOutputSchema
>;

export async function intelligentCommandCompletion(
  input: IntelligentCommandCompletionInput
): Promise<IntelligentCommandCompletionOutput> {
  return intelligentCommandCompletionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentCommandCompletionPrompt',
  input: {schema: IntelligentCommandCompletionInputSchema},
  output: {schema: IntelligentCommandCompletionOutputSchema},
  prompt: `You are an AI assistant that suggests commands for a terminal-based portfolio application.

You will suggest commands based on the user's input and their navigation history.

Available commands are: projects, skills, about, clear, sitch.

Navigation History:
{{#each navigationHistory}}
- {{{this}}}
{{/each}}

Current Input: {{{userInput}}}

Suggest the most relevant commands based on the current input and navigation history. Return the suggestions as a JSON array of strings.  Take into account the commands the user has already entered and avoid suggesting the same commands again.
Commands should be the FULL commands, not just the autocompleted part.
If the user has provided some input, autocomplete that command if possible.  If the user input does not match any known command, provide a command you think makes sense in this context.
If there is no input, and no navigation history, just provide the list of available commands.
`,
});

const intelligentCommandCompletionFlow = ai.defineFlow(
  {
    name: 'intelligentCommandCompletionFlow',
    inputSchema: IntelligentCommandCompletionInputSchema,
    outputSchema: IntelligentCommandCompletionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
