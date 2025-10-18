# TODO: Make Lists and Tasks Pages Responsive

## Approved Plan
- Improve text wrapping in Lists cards to prevent overflow on small screens.
- Add horizontal scrolling to the Tasks table for better mobile experience.

## Steps
1. Edit Test/resources/js/pages/Lists/index.tsx: Add responsive text wrapping classes to card content (e.g., break-words for description).
2. Edit Test/resources/js/pages/Tasks/index.tsx: Ensure the table container has proper overflow-x-auto for horizontal scrolling on small screens.
3. Test the changes by running the app and resizing the browser window to verify responsiveness.

## Completed
- [x] Added `break-words` class to description paragraph in Lists/index.tsx for better text wrapping.
- [x] Added `overflow-x-auto` to the table container and `min-w-[600px]` to the table in Tasks/index.tsx for horizontal scrolling.
