#!/bin/bash
# Helper script to add deploy hook after you create it in Vercel dashboard

if [ -z "$1" ]; then
  echo "Usage: ./scripts/add-deploy-hook.sh <DEPLOY_HOOK_URL>"
  echo ""
  echo "Steps to get your deploy hook URL:"
  echo "1. Go to: https://vercel.com/jwitcoff-9120s-projects/autonomous-ai-tools-site/settings/git"
  echo "2. Scroll to 'Deploy Hooks'"
  echo "3. Create hook named 'Autonomous Rebuild' for 'main' branch"
  echo "4. Copy the webhook URL"
  echo "5. Run: ./scripts/add-deploy-hook.sh <URL>"
  exit 1
fi

DEPLOY_HOOK_URL=$1

echo "Adding deploy hook to Vercel environment variables..."
vercel env add DEPLOY_HOOK_URL production <<< "$DEPLOY_HOOK_URL"

echo ""
echo "✓ Deploy hook added!"
echo ""
echo "The autonomous cron job will now trigger Vercel rebuilds after generating new tools."
echo "Next run: Daily at 8 AM PST"
