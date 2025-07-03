# Dynamic Content Loading System

This website now uses a dynamic content loading system that pulls all content from `webnote.json`. This means you only need to update one file to change content across the entire site.

## How It Works

### 1. Content Source
All content is stored in `webnote.json` with the following structure:
```json
{
    "feature_note": {
        "feature_areatakeoff": {
            "title": "AreaTakeOff",
            "description_card": "Dynamic Area Takeoff Summary In Rhino Viewport",
            "description_page": "Live area takeoff in Rhino viewport...",
            "command": "LakeHouseAreaTakeOff"
        }
        // ... other features
    },
    "shared_note": {
        "slogan": "Make Architects Go-Home-Early Again.",
        "navigation": {
            "home": "Home",
            "feature": "Feature",
            "installation": "Installation",
            "contact": "Contact"
        }
    }
}
```

### 2. HTML Structure
HTML elements that should be dynamically updated need `data-feature` attributes:
```html
<h3 data-feature="feature_areatakeoff">AreaTakeOff</h3>
<p data-feature="feature_areatakeoff">Description</p>
```

### 3. JavaScript Loading
The `script.js` file automatically:
- Loads `webnote.json` when the page loads
- Updates navigation links
- Updates slogans and branding
- Updates feature cards on the features page
- Updates individual feature page content

## What Gets Updated Automatically

### Navigation
- All navigation links (Home, Feature, Installation, Contact)
- Footer navigation links

### Branding
- Hero slogan on homepage
- Footer brand description

### Feature Cards (feature.html)
- Feature titles
- Feature descriptions

### Feature Pages
- Page titles
- Feature descriptions
- Command names
- Document titles

## How to Update Content

1. **Edit `webnote.json`** - Change any content you want
2. **Save the file** - Changes are automatically applied
3. **Refresh the page** - New content loads immediately

## Benefits

- **Single Source of Truth**: All content in one file
- **Consistency**: No risk of content getting out of sync
- **Easy Maintenance**: Update once, applies everywhere
- **No HTML Editing**: Just edit JSON, no HTML changes needed
- **Fallback**: If JSON fails to load, original HTML content remains

## Troubleshooting

If content isn't updating:
1. Check browser console for errors
2. Verify `webnote.json` is valid JSON
3. Ensure HTML elements have correct `data-feature` attributes
4. Check that the server is serving `webnote.json` correctly

## Adding New Features

To add a new feature:
1. Add the feature data to `webnote.json`
2. Create the feature HTML page with `data-feature` attributes
3. Add the feature card to `feature.html` with `data-feature` attributes
4. The system will automatically load the content 