# How to Add Pins to the Map (For Non-Developers)

## Quick Steps:
1. Open the Google Sheet (same one where stories are submitted)
2. Go to the "Map Pins" tab
3. Add a new row with the story information
4. Set Status to "published"
5. Save - the pin appears on the map automatically!

## Google Sheet Setup:

### Column Headers (already set up for you):
- **Title** - What shows when someone clicks the pin
- **Latitude** - North/South position (get from Google Maps)
- **Longitude** - East/West position (get from Google Maps)  
- **Type** - Either "story" or "organization"
- **Category** - Choose from: healthcare, workplace, education, reproductive, empowerment, mental-health, support
- **Status** - Must be "published" for pin to show on map

### Example Row:
| Title | Latitude | Longitude | Type | Category | Status |
|-------|----------|-----------|------|----------|---------|
| Women's Rights in Boston | 42.3601 | -71.0589 | story | workplace | published |

## How to Find Latitude & Longitude:
1. Go to [Google Maps](https://maps.google.com)
2. Search for the location
3. Right-click on the exact spot
4. Click "What's here?"
5. Copy the two numbers (example: 42.3601, -71.0589)
6. First number = Latitude, Second number = Longitude

## Pin Types:
- **story** - Personal stories from individuals
- **organization** - Support organizations or resources

## Categories:
- **healthcare** - Health and medical related
- **workplace** - Job and career related  
- **education** - School and learning related
- **reproductive** - Reproductive rights and health
- **empowerment** - General empowerment stories
- **mental-health** - Mental health related
- **support** - Support organizations and resources

## Status Options:
- **published** - Pin shows on the map
- **draft** - Pin is hidden (use this to prepare pins before publishing)
- **review** - Marks pins that need review

## Tips:
- You can edit any existing pin by changing its row
- To remove a pin, change Status from "published" to "draft"
- The map updates automatically within a few minutes
- If you make a mistake, just edit the cell and save again

## Need Help?
- Make sure Status is exactly "published" (lowercase)
- Double-check latitude/longitude numbers
- Categories must match exactly (lowercase, use hyphens for spaces)
- Type must be exactly "story" or "organization"
