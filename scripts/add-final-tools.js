const fs = require('fs');

const currentTools = JSON.parse(fs.readFileSync('./data/tools.json', 'utf8'));

const finalTools = [
  // AI Avatar Generators (5)
  {
    slug: "heygen",
    name: "HeyGen",
    category: "ai-avatar-generators",
    tagline: "Create AI avatar videos in minutes",
    description: "HeyGen is the leading platform for creating AI avatar videos, allowing you to generate talking-head videos without filming. Choose from 100+ realistic avatars or create a custom digital twin of yourself, then generate videos by simply typing or pasting a script.\n\nThe platform excels at creating professional video content at scale—sales outreach, training videos, social media content, and more. HeyGen offers video translation (your avatar speaking in 40+ languages with lip-sync), video templates, and API access for automation. The quality is remarkably realistic, with natural expressions and movements.\n\nWhat sets HeyGen apart is ease of use combined with professional results. You can create a polished video in 5 minutes that would take hours to film and edit traditionally. It's become essential for creators, marketers, and educators who need scalable video content.",
    features: ["100+ avatars", "Custom avatar creation", "40+ languages", "Video translation", "API access", "Templates", "Voice cloning", "Brand kit"],
    pricing: "Free tier with watermark. Creator $29/mo, Business $89/mo, Enterprise custom",
    url: "https://heygen.com",
    bestFor: "Creators and businesses producing talking-head videos at scale",
    pros: ["Realistic avatars", "Fast video creation", "Excellent translation", "Easy to use"],
    cons: ["Free tier very limited", "Can feel uncanny", "Expensive for heavy use"],
    rating: 4.7,
    metaTitle: "HeyGen Review 2026: AI Avatar Video Generator for Creators",
    metaDescription: "HeyGen creates AI avatar videos with voice cloning and translation. 100+ avatars, custom digital twins. Review of features."
  },
  {
    slug: "synthesia",
    name: "Synthesia",
    category: "ai-avatar-generators",
    tagline: "Enterprise AI video platform with avatars",
    description: "Synthesia is built for enterprises creating training videos, internal communications, and knowledge bases at scale. The platform offers 140+ diverse avatars, or you can create custom avatars that match your brand. Synthesia focuses on professional use cases rather than social media content.\n\nThe platform includes a full video editor, screen recording, media library, and team collaboration features. Synthesia's strength is producing polished corporate videos without cameras, studios, or video editing skills. You can update videos by changing text, making it ideal for frequently updated content like product training.\n\nWhat distinguishes Synthesia is enterprise focus. It's used by Fortune 500 companies for compliance training, onboarding, and internal updates. The platform prioritizes reliability, data security, and features that matter to large organizations.",
    features: ["140+ avatars", "Custom avatars", "Video templates", "Screen recording", "Brand kit", "Team collaboration", "60+ languages", "SCORM export"],
    pricing: "Starter $29/mo, Creator $89/mo, Enterprise custom with SSO and security",
    url: "https://synthesia.io",
    bestFor: "Enterprises creating training and internal communication videos",
    pros: ["Professional quality", "Enterprise features", "Diverse avatars", "Frequent updates"],
    cons: ["Expensive for individuals", "Less casual than HeyGen", "Learning curve"],
    rating: 4.6,
    metaTitle: "Synthesia Review 2026: Enterprise AI Avatar Video Platform",
    metaDescription: "Synthesia creates professional avatar videos for training and communications. 140+ avatars, team features. Enterprise review."
  },
  {
    slug: "d-id",
    name: "D-ID",
    category: "ai-avatar-generators",
    tagline: "Speaking portraits from photos",
    description: "D-ID specializes in bringing still images to life, allowing you to turn any photo into a talking avatar. Upload a photo of yourself, a historical figure, or any character, and D-ID animates it to speak your script with realistic facial movements and expressions.\n\nThe platform is popular for creative projects, education (bringing historical figures to life), and personalized marketing. D-ID offers face swap, voice cloning, and API access for developers building avatar features into apps. The Creative Reality Studio provides templates and editing tools.\n\nWhat makes D-ID unique is its photo-to-video approach. Instead of choosing from pre-made avatars, you can animate any image, opening creative possibilities that more rigid platforms don't offer.",
    features: ["Photo animation", "Face swap", "Voice cloning", "Creative templates", "API access", "100+ languages", "Emotion control", "Developer tools"],
    pricing: "Trial $5.90 for 20 credits. Lite $49/mo, Pro $196/mo, Advanced $336/mo, Enterprise custom",
    url: "https://d-id.com",
    bestFor: "Creators animating photos and building custom avatar applications",
    pros: ["Animate any photo", "Creative flexibility", "Strong API", "Unique use cases"],
    cons: ["Can feel less polished than HeyGen", "Credit system confusing", "Pricing gets expensive"],
    rating: 4.3,
    metaTitle: "D-ID Review 2026: Animate Photos into Speaking Avatars",
    metaDescription: "D-ID turns photos into talking avatars. Animate any image with voice and expressions. API access. Review of features."
  },
  {
    slug: "colossyan",
    name: "Colossyan",
    category: "ai-avatar-generators",
    tagline: "AI video for workplace learning",
    description: "Colossyan focuses specifically on workplace learning and training videos, offering avatars and features designed for L&D teams. The platform includes conversation features (multiple avatars interacting), branching scenarios for interactive training, and SCORM export for LMS integration.\n\nColossyan offers diverse avatars with professional attire and settings, auto-translation to 70+ languages, and screen recording for software tutorials. The platform is built for corporate training workflows, with templates for onboarding, compliance, product training, and soft skills development.\n\nWhat distinguishes Colossyan is its L&D focus. It's not trying to be everything to everyone—it's laser-focused on making workplace training videos easier to create and more engaging than talking-head recordings or PowerPoint-style screencasts.",
    features: ["Conversation mode", "Branching scenarios", "70+ languages", "Auto-translation", "SCORM export", "Screen recording", "Diverse avatars", "L&D templates"],
    pricing: "Starter $35/mo, Pro $120/mo, Enterprise custom with SSO",
    url: "https://colossyan.com",
    bestFor: "L&D teams and HR departments creating training videos",
    pros: ["Excellent for training", "Conversation features", "SCORM integration", "L&D-focused templates"],
    cons: ["Narrowly focused on training", "Limited for creative use", "More expensive than alternatives"],
    rating: 4.4,
    metaTitle: "Colossyan Review 2026: AI Video Platform for Training",
    metaDescription: "Colossyan creates training videos with AI avatars. Conversation mode, branching, SCORM export. Built for L&D teams. Review."
  },
  {
    slug: "elai-io",
    name: "Elai.io",
    category: "ai-avatar-generators",
    tagline: "AI video generation from text and presentations",
    description: "Elai.io offers a unique feature set combining avatar videos with PowerPoint/PDF conversion. Upload a presentation, and Elai converts it into a video with an AI avatar presenting each slide. This makes it ideal for repurposing existing training materials into engaging video format.\n\nThe platform offers 80+ avatars, voice cloning, and article-to-video conversion. Elai's templates cover use cases from sales training to product demos, with features like translations, subtitles, and branded templates. The interface is straightforward, making it accessible for non-technical users.\n\nWhat sets Elai apart is presentation conversion. While other platforms focus on script-based videos, Elai excels at transforming existing documents and slides into video content, saving time for educators and trainers who already have prepared materials.",
    features: ["PPT to video", "Article to video", "80+ avatars", "Voice cloning", "Translations", "Auto-subtitles", "Templates", "Brand kit"],
    pricing: "Free tier 1 min/mo. Basic $29/mo, Advanced $125/mo, Enterprise custom",
    url: "https://elai.io",
    bestFor: "Educators and trainers converting presentations into video content",
    pros: ["Unique PPT conversion", "Article to video", "Easy to use", "Good value"],
    cons: ["Avatar quality varies", "Free tier very limited", "Less polished than leaders"],
    rating: 4.2,
    metaTitle: "Elai.io Review 2026: Convert Presentations to AI Avatar Videos",
    metaDescription: "Elai.io converts PowerPoint and articles into avatar videos. 80+ avatars, voice cloning. Review for educators and trainers."
  },

  // AI Subtitle & Caption Tools (5)
  {
    slug: "otter-ai",
    name: "Otter.ai",
    category: "ai-subtitle-generators",
    tagline: "AI meeting transcription and live captions",
    description: "Otter.ai is the leading platform for meeting transcription, offering real-time transcription, speaker identification, and automated summaries. It's designed for professionals who attend meetings, interviews, or lectures and need accurate transcripts with minimal effort.\n\nOtter integrates with Zoom, Google Meet, and Teams, automatically joining meetings and generating transcripts. The AI identifies different speakers, creates chapters, and extracts action items. Recent updates include OtterPilot for Sales (CRM integration) and custom vocabulary for industry-specific terms.\n\nWhat sets Otter apart is meeting intelligence. It's not just transcription—it's a tool for making meetings more productive with searchable transcripts, automated summaries, and collaboration features that turn conversations into actionable documentation.",
    features: ["Real-time transcription", "Speaker identification", "Automated summaries", "Meeting assistant", "Zoom/Teams integration", "Action item extraction", "Custom vocabulary", "Collaboration tools"],
    pricing: "Free tier 600 min/mo. Pro $16.99/mo, Business $30/user/mo, Enterprise custom",
    url: "https://otter.ai",
    bestFor: "Professionals needing automated meeting transcription and summaries",
    pros: ["Excellent accuracy", "Meeting integrations", "Speaker identification", "Action item extraction"],
    cons: ["Free tier limited to 30 min/recording", "Best features in paid tiers", "Not ideal for video subtitles"],
    rating: 4.6,
    metaTitle: "Otter.ai Review 2026: AI Meeting Transcription & Live Captions",
    metaDescription: "Otter.ai transcribes meetings with speaker ID and summaries. Zoom/Teams integration. Review for business professionals."
  },
  {
    slug: "rev",
    name: "Rev",
    category: "ai-subtitle-generators",
    tagline: "Professional captions and transcription services",
    description: "Rev combines AI transcription with human services, offering both automated and professional-grade captions. For creators who need broadcast-quality accuracy, Rev's human transcriptionists deliver 99% accuracy, while the AI service provides fast, affordable transcription for less critical content.\n\nRev's automated captions integrate with major video platforms and editing software. The service offers burned-in captions (embedded in video), SRT files, and transcript exports. Rev is known for reliability and professional quality, making it popular with video professionals and podcasters.\n\nWhat distinguishes Rev is the hybrid approach. You can use AI for drafts and human review for finals, or choose based on budget and accuracy needs. This flexibility makes Rev suitable for both casual creators and professional productions.",
    features: ["AI + human transcription", "SRT/VTT export", "Burned-in captions", "99% accuracy (human)", "Multiple languages", "Speaker labels", "Timestamps", "Platform integrations"],
    pricing: "AI captions $0.25/min, Human captions $1.50/min, Transcripts $1.50/min",
    url: "https://rev.com",
    bestFor: "Video creators needing professional-quality captions and transcripts",
    pros: ["Hybrid AI/human service", "Professional accuracy", "Reliable service", "Multiple export formats"],
    cons: ["More expensive than pure AI", "Pay per minute", "Human service has turnaround time"],
    rating: 4.7,
    metaTitle: "Rev Review 2026: Professional AI & Human Caption Services",
    metaDescription: "Rev offers AI and human transcription/captions with 99% accuracy. SRT export, multiple languages. Professional review."
  },
  {
    slug: "submagic",
    name: "Submagic",
    category: "ai-subtitle-generators",
    tagline: "AI captions designed for social media",
    description: "Submagic specializes in creating engaging, viral-style captions for TikTok, Instagram Reels, and YouTube Shorts. Unlike traditional subtitle tools, Submagic adds eye-catching animations, emoji reactions, and trendy styling that captures attention on social platforms.\n\nThe platform auto-generates captions with speaker highlighting, keyword emphasis, and dynamic animations. Submagic analyzes your video and automatically adds trending emojis, zooms on key moments, and applies popular caption styles. You can customize colors, fonts, and animations or use preset viral templates.\n\nWhat makes Submagic unique is its social-first design. It's not about accuracy alone—it's about making your captions engaging and thumb-stopping, which is critical for short-form content that competes for attention.",
    features: ["Viral caption styles", "Auto emoji insertion", "Speaker highlighting", "Keyword emphasis", "Zoom effects", "Caption animations", "Trendy templates", "B-roll generation"],
    pricing: "Free tier 10 videos/mo. Starter $20/mo, Pro $50/mo unlimited",
    url: "https://submagic.co",
    bestFor: "Social media creators making TikTok, Reels, and Shorts",
    pros: ["Perfect for social media", "Engaging animations", "Auto emoji", "Trending styles"],
    cons: ["Overkill for traditional videos", "Can feel gimmicky", "Limited customization depth"],
    rating: 4.4,
    metaTitle: "Submagic Review 2026: AI Captions for Social Media Videos",
    metaDescription: "Submagic creates viral-style captions for TikTok and Reels. Animations, emojis, keyword emphasis. Social media review."
  },
  {
    slug: "simon-says",
    name: "Simon Says",
    category: "ai-subtitle-generators",
    tagline: "AI transcription for video editors",
    description: "Simon Says is built specifically for video editors, offering transcription that integrates directly into Adobe Premiere Pro, Final Cut Pro, and DaVinci Resolve. Transcribe your footage, and Simon Says creates subtitle tracks, searchable transcripts, and markers—all importable into your editing timeline.\n\nThe platform offers speaker separation, multiple language support, and assembly cut features that automatically create a rough edit based on your transcript selections. Simon Says also provides translation to 100+ languages and professional caption formatting for broadcast standards.\n\nWhat distinguishes Simon Says is editor-focused workflow. Instead of exporting SRT files and manually syncing, you get native integration that makes transcription and captioning feel like built-in features of your editing software.",
    features: ["NLE integration", "Speaker separation", "Assembly cuts", "100+ languages", "Translation", "Searchable transcripts", "Markers and metadata", "Broadcast formatting"],
    pricing: "Pay-as-go $0.10/min, Standard $15/mo 300 min, Pro $30/mo 720 min, Unlimited $100/mo",
    url: "https://simonsaysai.com",
    bestFor: "Video editors working in Premiere, Final Cut, or DaVinci Resolve",
    pros: ["Deep NLE integration", "Assembly cut feature", "Professional workflow", "Broadcast quality"],
    cons: ["More expensive than alternatives", "Best features require Pro+", "Learning curve for workflow"],
    rating: 4.5,
    metaTitle: "Simon Says Review 2026: AI Transcription for Video Editors",
    metaDescription: "Simon Says integrates AI transcription into Premiere and Final Cut. Assembly cuts, speaker separation. Editor-focused review."
  },
  {
    slug: "happyscribe",
    name: "Happy Scribe",
    category: "ai-subtitle-generators",
    tagline: "Automated transcription and subtitling in 120+ languages",
    description: "Happy Scribe offers automated transcription and subtitling with human review options, supporting 120+ languages and multiple file formats. The platform is designed for content creators, journalists, and researchers who need accurate transcripts in multiple languages.\n\nHappy Scribe's subtitle editor allows real-time editing with timecode adjustment, speaker labeling, and export to all major formats (SRT, VTT, EBU-STL). The platform offers both machine and human transcription, with the ability to order professional review for critical content. Translation between languages is seamless.\n\nWhat sets Happy Scribe apart is language coverage and editing tools. The platform is particularly strong for multilingual content and offers professional-grade editing capabilities without overwhelming casual users.",
    features: ["120+ languages", "Subtitle editor", "Speaker identification", "Translation", "Multiple export formats", "Human review option", "Timestamps", "API access"],
    pricing: "Pay-as-go $0.20/min, Self-Service $29/mo 5h, Business $99/mo 20h, Human from $1.70/min",
    url: "https://happyscribe.com",
    bestFor: "Multilingual creators and researchers needing transcription in many languages",
    pros: ["Massive language support", "Professional editing tools", "Human review option", "Clean interface"],
    cons: ["More expensive than competitors", "Free tier very limited", "Human service has wait times"],
    rating: 4.3,
    metaTitle: "Happy Scribe Review 2026: AI Transcription in 120+ Languages",
    metaDescription: "Happy Scribe offers automated subtitles and transcripts in 120+ languages. Human review, professional editing. Multilingual review."
  }
];

const allTools = [...currentTools, ...finalTools];
fs.writeFileSync('./data/tools.json', JSON.stringify(allTools, null, 2));
console.log(`✓ Added ${finalTools.length} more tools. Total: ${allTools.length}`);
console.log('\n=== Tool Count by Category ===');
const counts = {};
allTools.forEach(t => {
  counts[t.category] = (counts[t.category] || 0) + 1;
});
Object.entries(counts).sort().forEach(([cat, count]) => {
  console.log(`${cat}: ${count} tools`);
});
