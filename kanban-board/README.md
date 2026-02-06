# Drag & Drop Kanban Board

A fully interactive Kanban board built with vanilla HTML, CSS, and JavaScript. Features drag-and-drop functionality, card management, and persistent storage.

## Features

### Core Functionality
- **3 Columns**: To Do, In Progress, Done
- **Drag & Drop**: Seamlessly move cards between columns using HTML5 Drag and Drop API
- **Card Management**:
  - ✅ Add new cards
  - ✏️ Edit existing cards
  - 🗑️ Delete cards
- **Data Persistence**: All changes are automatically saved to localStorage
- **Sample Data**: Pre-loaded with example tasks to demonstrate functionality

### User Interface
- Beautiful gradient background design
- Smooth animations and transitions
- Responsive layout (adapts to mobile devices)
- Real-time card count indicators
- Modal-based card editing
- Hover effects and visual feedback

### Testing Suite
Built-in test console that validates:
- ✅ LocalStorage read/write operations
- ✅ Drag and Drop API support
- ✅ State management integrity
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Data persistence across sessions

## Getting Started

### Installation
1. Download all files to a folder:
   - `index.html`
   - `styles.css`
   - `script.js`

2. Open `index.html` in your web browser

That's it! No build process or dependencies required.

### Usage

#### Adding a Card
1. Click the **"+ Add New Card"** button in the header
2. Fill in the card details:
   - Title (required)
   - Description (optional)
   - Column (select destination column)
3. Click **"Save"**

#### Editing a Card
1. Click the **✏️ edit icon** on any card
2. Modify the card details in the modal
3. Click **"Save"**

#### Deleting a Card
1. Click the **🗑️ delete icon** on any card
2. Confirm the deletion in the popup

#### Moving Cards
1. Click and hold on any card
2. Drag it to the desired column
3. Release to drop

#### Running Tests
1. Scroll to the bottom of the page
2. Click the **"Run Tests"** button
3. View test results in the test console

## Technical Details

### Architecture
- **Object-Oriented Design**: KanbanBoard class manages all functionality
- **Event-Driven**: Uses event listeners for user interactions
- **State Management**: Centralized state in the cards array
- **Separation of Concerns**: HTML structure, CSS styling, and JS logic are separated

### Key Methods

#### Card Operations
- `addCard(title, description, column)` - Creates a new card
- `updateCard(id, title, description, column)` - Updates existing card
- `deleteCard(id)` - Removes a card
- `moveCard(id, newColumn)` - Moves card to different column

#### Storage
- `saveToLocalStorage()` - Persists data to browser storage
- `loadFromLocalStorage()` - Retrieves data on page load

#### Rendering
- `renderCard(card)` - Renders a single card
- `renderAllCards()` - Re-renders entire board
- `updateCardCounts()` - Updates column counters

### Browser Compatibility
- Modern browsers with HTML5 support
- Chrome, Firefox, Safari, Edge (latest versions)
- Requires JavaScript enabled
- Uses localStorage (not supported in private/incognito mode in some browsers)

## File Structure
```
kanban-board/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # Application logic and functionality
└── README.md          # Documentation
```

## Data Storage

All data is stored in the browser's localStorage under the key `kanbanCards`. The data structure is:

```javascript
[
  {
    id: "unique-id",
    title: "Card Title",
    description: "Card Description",
    column: "todo" | "in-progress" | "done"
  }
]
```

## Testing

The application includes a comprehensive test suite that validates:

1. **LocalStorage Test**: Verifies read/write capabilities
2. **Drag API Test**: Checks browser support for drag and drop
3. **State Management Test**: Validates state integrity
4. **CRUD Test**: Tests all card operations
5. **Persistence Test**: Ensures data survives page refreshes

Access the test runner via the "Run Tests" button at the bottom of the page.

## Customization

### Adding More Columns
1. Add new column HTML in `index.html`
2. Update the columns array in `updateCardCounts()` method
3. Add corresponding styles in `styles.css`

### Styling
Modify `styles.css` to change:
- Color scheme (currently purple gradient)
- Card appearance
- Animations and transitions
- Layout and spacing

### Functionality
Extend `script.js` to add features like:
- Card priorities/labels
- Due dates
- Search/filter
- Card assignments
- Export to JSON/CSV

## Known Limitations

- Data is stored locally (not synced across devices)
- Private/incognito mode may have localStorage restrictions
- No backend/database integration
- Single user only (no collaboration features)

## Future Enhancements

Potential improvements:
- Backend integration with REST API
- User authentication
- Card priorities and tags
- Due dates and reminders
- Card search and filtering
- Keyboard shortcuts
- Card archiving
- Activity history
- Export/import functionality
- Dark mode toggle

## License

Free to use and modify for personal and commercial projects.

---

**Enjoy organizing your tasks with this Kanban board!** 🎯