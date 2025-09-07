'use server';

/**
 * @fileOverview Animated project description flow using GenAI.
 *
 * - generateAnimatedProjectDescription - A function that generates an animated project description.
 * - AnimatedProjectDescriptionInput - The input type for the generateAnimatedProjectDescription function.
 * - AnimatedProjectDescriptionOutput - The return type for the generateAnimatedProjectDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnimatedProjectDescriptionInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('The project description to be displayed with an animated typing effect.'),
});
export type AnimatedProjectDescriptionInput = z.infer<typeof AnimatedProjectDescriptionInputSchema>;

const AnimatedProjectDescriptionOutputSchema = z.object({
  animatedText: z
    .string()
    .describe('The project description with animated typing effect formatting.'),
});
export type AnimatedProjectDescriptionOutput = z.infer<typeof AnimatedProjectDescriptionOutputSchema>;

export async function generateAnimatedProjectDescription(
  input: AnimatedProjectDescriptionInput
): Promise<AnimatedProjectDescriptionOutput> {
  return animatedProjectDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'animatedProjectDescriptionPrompt',
  input: {schema: AnimatedProjectDescriptionInputSchema},
  output: {schema: AnimatedProjectDescriptionOutputSchema},
  prompt: `Simulate an animated typing effect for the following text:\n\n{{projectDescription}}\n\nReturn the text as if it were being typed out in a terminal, character by character. Just add a blinking underscore at the end of the text to simulate a cursor. The rest should be plain text.
`,
});

const animatedProjectDescriptionFlow = ai.defineFlow(
  {
    name: 'animatedProjectDescriptionFlow',
    inputSchema: AnimatedProjectDescriptionInputSchema,
    outputSchema: AnimatedProjectDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
