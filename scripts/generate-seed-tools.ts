import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

const categories = [
  "ai-video-editors",
  "ai-voiceover-tools",
  "ai-image-generators",
  "ai-music-generators",
  "ai-thumbnail-makers",
  "ai-writing-assistants",
  "ai-avatar-generators",
  "ai-subtitle-generators",
  "ai-social-media-tools",
  "ai-podcast-tools",
  "ai-seo-tools",
  "ai-animation-tools"
];

const toolsPerCategory = 5;

async function generateToolsForCategory(category: string): Promise<any[]> {
  console.log(`Generating tools for ${category}...`);
  
  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    system: `You are an expert reviewer of AI tools for content creators. Generate accurate, detailed tool entries for real, active products in the specified category.

Each tool entry must follow this exact JSON schema:
{
  "slug": "tool-name",
  "name": "Tool Name",
  "category": "category-slug",
  "tagline": "One-line description",
  "description": "2-3 detailed paragraphs about the tool, its features, who it's for, and what makes it unique. Be factual and specific.",
  "features": ["feature1", "feature2", "feature3", "feature4"],
  "pricing": "Accurate pricing info with free tier and paid plans",
  "url": "https://realtool.com",
  "bestFor": "Specific use case or creator type",
  "pros": ["real strength 1", "real strength 2", "real strength 3"],
  "cons": ["real limitation 1", "real limitation 2"],
  "rating": 4.5,
  "metaTitle": "[Tool] Review 2026: [Key Feature] for Creators",
  "metaDescription": "Under 160 chars summary with tool name and use case"
}

Important: Use REAL tools with ACCURATE information. Research current features and pricing. Make descriptions helpful and conversational.`,
    messages: [{
      role: 'user',
      content: `Generate ${toolsPerCategory} real, popular AI tools in the "${category}" category. Return ONLY a valid JSON array of tool objects. No markdown, no explanations.`
    }]
  });
  
  const text = message.content[0].type === 'text' ? message.content[0].text : '';
  return JSON.parse(text);
}

async function main() {
  const allTools: any[] = [];
  
  for (const category of categories) {
    try {
      const tools = await generateToolsForCategory(category);
      allTools.push(...tools);
      // Rate limit: wait 2 seconds between requests
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Error generating tools for ${category}:`, error);
    }
  }
  
  // Write to data/tools.json
  const dataPath = path.join(process.cwd(), 'data', 'tools.json');
  fs.writeFileSync(dataPath, JSON.stringify(allTools, null, 2));
  
  console.log(`\nGenerated ${allTools.length} tools across ${categories.length} categories.`);
  console.log(`Saved to ${dataPath}`);
}

main();
