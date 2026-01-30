# god-mode

Unified floating DevMode window with AI conversation, GitHub issue generation, screen capture & annotations for React apps.

## About

**god-mode** is a React library that provides an interactive development assistant embedded directly into your application. It enables developers and users to discuss improvements with an AI companion and automatically generate structured GitHub issues — all without leaving the app.

### Key Features

- **Floating DevMode Window** — Draggable, resizable window with tabbed interface (Query, Context, Search, Conversation, Issues)
- **AI Conversation** — Natural language dialogue for discussing improvements and formulating tasks
- **GitHub Issue Generation** — Automatic creation of structured issue drafts with templates, labels, and priorities
- **Screen Capture & Annotations** — Screenshot capture with drawing tools (arrows, circles, rectangles, text, highlights)
- **Bilingual Support** — Automatic Russian/English language detection with localized UI
- **State Persistence** — Window state, conversations, and drafts persist in localStorage
- **Keyboard Shortcuts** — Configurable shortcuts (default: Ctrl+Shift+G to toggle, Escape to minimize)
- **Zero Runtime Dependencies** — Only peer dependencies on React 18+

### Concept

The user "travels" through the application with an AI companion, discusses what needs to be changed, and the system formulates a structured task for the development team or other AI agents ("Hive Mind").

## Quick Start

### Requirements

- Node.js >= 20
- React >= 18

### Installation

```bash
npm install god-mode
```

### Basic Usage

```tsx
import { GodModeProvider, useGodMode } from 'god-mode'

function App() {
  return (
    <GodModeProvider
      config={{
        github: { owner: 'my-org', repo: 'my-repo' },
        preferredLanguage: 'en',
        tabs: ['conversation', 'issues', 'search'],
        storageKeyPrefix: 'my_app_god_mode',
      }}
    >
      <MyApp />
      <GodModeToggle />
    </GodModeProvider>
  )
}

function GodModeToggle() {
  const { toggleWindow, isVisible } = useGodMode()
  return <button onClick={toggleWindow}>{isVisible ? 'Close' : 'Open'} GOD MODE</button>
}
```

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        GOD MODE Window                              │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  [Query] [Context] [Search] [Conversation] [Issues]          │  │
│  ├───────────────────────────────────────────────────────────────┤  │
│  │                                                               │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │                 Active Tab Content                      │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────┘  │
│  [Create Issue]  [Capture Screen]  [Settings]  [Minimize]  [Close] │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      Conversation Agent                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐ │
│  │  Context        │  │  AI Dialog      │  │  Issue Generator    │ │
│  │  Analyzer       │→→│  Engine         │→→│  (Draft Creator)    │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────────┘ │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        GitHub Integration                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐ │
│  │  OAuth Auth     │  │  Issue API      │  │  Screenshot         │ │
│  │  (Token)        │  │  (Create/Edit)  │  │  Upload             │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

### Issue Creation Flow

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Navigate   │ →  │   Discuss    │ →  │   Draft      │ →  │   Publish    │
│   the app    │    │   with AI    │    │   Issue      │    │   to GitHub  │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
       │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼
  "I see a bug in     "The button       Title:              POST /repos/
   this button"        doesn't change   "Fix: Button        owner/repo/
                       color on hover"   hover state"        issues
```

## API Reference

### Components

#### `<GodModeProvider>`

React Context Provider that manages GOD MODE state, keyboard shortcuts, and localStorage persistence.

```tsx
<GodModeProvider config={godModeConfig}>{children}</GodModeProvider>
```

**Props:**

| Prop       | Type            | Description                     |
| ---------- | --------------- | ------------------------------- |
| `config`   | `GodModeConfig` | Configuration object (optional) |
| `children` | `ReactNode`     | Child components                |

#### `useGodMode()`

React hook to access GOD MODE state and actions. Must be used within `<GodModeProvider>`.

```tsx
const {
  windowState, // Current window state
  config, // Active configuration
  openWindow, // Open the window
  closeWindow, // Close the window
  minimizeWindow, // Minimize/restore the window
  toggleWindow, // Toggle open/closed
  setActiveTab, // Switch to a specific tab
  setPosition, // Update window position
  setSize, // Update window size
  togglePin, // Toggle pin state
  resetState, // Reset to defaults
  isVisible, // Whether window is visible
} = useGodMode()
```

### Configuration

```typescript
interface GodModeConfig {
  github?: {
    owner: string // Repository owner
    repo: string // Repository name
    defaultLabels?: string[] // Labels to apply to issues
  }
  position?: WindowPosition // Initial window position
  size?: Partial<WindowSize> // Initial window size
  tabs?: GodModeTab[] // Visible tabs
  shortcuts?: Partial<KeyboardShortcuts> // Keyboard shortcuts
  preferredLanguage?: 'ru' | 'en' // UI language
  persistState?: boolean // Save state to localStorage
  storageKeyPrefix?: string // localStorage key prefix
}
```

### Keyboard Shortcuts

| Shortcut         | Action                 |
| ---------------- | ---------------------- |
| `Ctrl+Shift+G`   | Toggle GOD MODE window |
| `Escape`         | Minimize window        |
| `Ctrl+Tab`       | Next tab               |
| `Ctrl+Shift+Tab` | Previous tab           |

### Types

The library exports comprehensive TypeScript types for:

- **Window management**: `WindowPosition`, `WindowSize`, `WindowState`, `WindowAnchor`
- **Tabs**: `GodModeTab`, `GodModeTabInfo`
- **Conversations**: `ConversationMessage`, `ConversationSession`, `ConversationRole`
- **Issues**: `IssueDraft`, `IssueTemplate`, `IssueType`, `IssuePriority`
- **Screenshots**: `IssueScreenshot`, `IssueAnnotation`, `IssueAnnotationType`
- **Components**: `ComponentMeta`, `ComponentRegistry`

### Utility Functions

| Function                             | Description                          |
| ------------------------------------ | ------------------------------------ |
| `detectLanguage(text)`               | Detects Russian or English language  |
| `createMessage(role, content)`       | Creates a conversation message       |
| `createSession(language)`            | Creates a conversation session       |
| `createIssueDraft(overrides)`        | Creates an issue draft with defaults |
| `validateIssueDraft(draft)`          | Validates draft with errors/warnings |
| `getDefaultLabels(type, priority)`   | Gets GitHub labels for issue         |
| `parseShortcut(shortcut)`            | Parses keyboard shortcut string      |
| `matchesShortcut(event, shortcut)`   | Checks if keyboard event matches     |
| `clamp(value, min, max)`             | Clamps number within range           |
| `constrainPosition(pos, size, w, h)` | Constrains position to viewport      |
| `constrainSize(size)`                | Constrains size within limits        |

## Project Structure

```
god-mode/
├── src/
│   ├── index.ts                    # Public API entry point
│   ├── types/
│   │   ├── common.ts              # QueryLanguage, ComponentMeta, ComponentRegistry
│   │   ├── god-mode.ts            # Window state, tabs, conversation types & utilities
│   │   └── issue-generator.ts     # Issue drafts, templates, validation
│   └── components/
│       └── GodModeProvider.tsx    # React Context Provider
├── tests/
│   └── god-mode.test.ts           # Test suite (81 tests)
├── examples/
│   └── basic-usage.tsx            # Integration example
├── scripts/                        # Release pipeline scripts
├── .github/workflows/
│   └── release.yml                # CI/CD pipeline
├── ANALYSIS.md                     # Project analysis (Russian)
├── CHANGELOG.md                    # Version history
└── docs/
    └── phases/                    # Development roadmap by phases
```

## Development

### Commands

| Command                     | Description                                  |
| --------------------------- | -------------------------------------------- |
| `npm test`                  | Run test suite                               |
| `npm run test:watch`        | Run tests in watch mode                      |
| `npm run lint`              | Run ESLint                                   |
| `npm run lint:fix`          | Fix ESLint issues                            |
| `npm run format`            | Format code with Prettier                    |
| `npm run format:check`      | Check formatting                             |
| `npm run typecheck`         | TypeScript type checking                     |
| `npm run check`             | Run all checks (lint + format + duplication) |
| `npm run check:duplication` | Detect code duplication                      |

### Testing

The project uses Vitest with jsdom environment. Tests cover:

- Language detection and component registry
- Window state management and localStorage persistence
- Tab validation and configuration
- Keyboard shortcut parsing and matching
- Conversation session creation and persistence
- Issue draft creation, validation, and templates
- Label and priority mapping
- Library package integrity

```bash
npm test
```

### Code Quality

- **ESLint** with TypeScript, Prettier, and complexity rules
- **Prettier** for consistent formatting
- **jscpd** for code duplication detection
- **husky** + **lint-staged** for pre-commit hooks
- **TypeScript** strict mode

## Roadmap

Development follows a phased approach. See [docs/phases/](docs/phases/) for detailed plans.

| Phase | Focus                                                  | Status      |
| ----- | ------------------------------------------------------ | ----------- |
| 1     | [Core Types & Provider](docs/phases/phase-1.md)        | ✅ Complete |
| 2     | [UI Components](docs/phases/phase-2.md)                | 📋 Planned  |
| 3     | [AI Conversation Agent](docs/phases/phase-3.md)        | 📋 Planned  |
| 4     | [GitHub Integration](docs/phases/phase-4.md)           | 📋 Planned  |
| 5     | [Screen Capture & Annotations](docs/phases/phase-5.md) | 📋 Planned  |

## Documentation

- [ANALYSIS.md](ANALYSIS.md) — Detailed project analysis (Russian)
- [docs/phases/](docs/phases/) — Development roadmap by phases

## Origin

This library was extracted from [isocubic](https://github.com/netkeep80/isocubic) (Phase 9: GOD MODE). The original implementation is part of a web-based parametric voxel editor, where GOD MODE serves as the interactive development system for the application.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Guidelines

- Follow code style (ESLint + Prettier)
- Cover new code with tests
- Update documentation when needed
- Write clear commit messages
- Add changeset for versioning

## License

Unlicense — see [LICENSE](LICENSE)

---

_Built for interactive development of modern React applications._
