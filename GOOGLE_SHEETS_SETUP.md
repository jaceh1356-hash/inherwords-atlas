# Google Sheets Integration Setup

This guide will help you set up Google Sheets integration to store form submissions from the "Share Your Story" page.

## Step 1: Google Cloud Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to APIs & Services > Library
   - Search for "Google Sheets API"
   - Click and enable it

## Step 2: Create Service Account

1. Go to IAM & Admin > Service Accounts
2. Click "Create Service Account"
3. Enter details:
   - Name: `InHerWords Form Handler`
   - Description: `Service account for handling story submissions`
4. Grant permissions:
   - Role: `Editor` (or more specific Sheets permissions)
5. Create and download the JSON key file
6. Keep this file secure - never commit it to version control

## Step 3: Create Google Sheet

1. Create a new Google Sheet
2. Give it a name like "InHerWords Story Submissions"
3. Share the sheet with your service account email (found in the JSON file)
4. Give it "Editor" permissions
5. Copy the Sheet ID from the URL

## Step 4: Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in the values from your service account JSON file:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`: The "client_email" field
   - `GOOGLE_PRIVATE_KEY`: The "private_key" field (keep the \n characters)
   - `GOOGLE_SHEET_ID`: From the Google Sheet URL

## Step 5: Test

1. Start your development server: `npm run dev`
2. Go to `/submit` page
3. Fill out and submit a story
4. Check your Google Sheet - it should appear as a new row!

## Sheet Structure

The API will automatically create these columns:
- Timestamp
- Title  
- Story
- Category
- Age Range
- Country
- City
- Anonymous
- Agreed to Terms
- Status

## Security Notes

- Never commit your `.env.local` file
- Keep your service account JSON file secure
- Consider using more restrictive permissions in production
- The Google Sheet should only be shared with necessary people
