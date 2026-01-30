# Phase 2: UI Components

This document describes the planned second phase — implementing visual UI components for the GOD MODE floating window.

**Status**: 📋 Planned

---

## Overview

**Goal**: Create the visual UI layer for GOD MODE — a floating window with tabs, panels, and interactive controls that users interact with directly.

**Problem**: Phase 1 established types and state management, but without visual components users cannot see or interact with GOD MODE. The library currently provides only a "headless" API.

**Solution**: Build a set of React components that render the GOD MODE window:

- **GodModeWindow** — the main floating window with drag/resize, tab bar, and controls
- **Tab panels** — content components for each tab (Query, Context, Search, Conversation, Issues)
- **Theming** — customizable styles that blend into any application

**Benefit for humanity**: Lowering the barrier between user feedback and structured development tasks. Non-technical users can interact with the AI to articulate issues, reducing miscommunication between users and developers.

---

## Planned TASKs

### TASK 1: Floating Window Component

**Title**: `Create draggable, resizable floating window component`

**Priority**: Critical

**Description**:
Build the main `GodModeWindow` component — a floating overlay with drag-and-drop positioning, 8-direction resize, and window controls (pin, minimize, close).

**Tasks**:

- [ ] Create `src/components/GodModeWindow.tsx`
- [ ] Implement drag-and-drop via mouse/touch events
- [ ] Implement 8-direction resize (corners + edges)
- [ ] Add window control buttons (Pin, Minimize, Close)
- [ ] Use React Portal for proper z-index layering
- [ ] Integrate with `GodModeProvider` context for state
- [ ] Apply viewport constraints from utility functions
- [ ] Support CSS-in-JS styles with theming

**Acceptance criteria**:

- [ ] Window can be moved by dragging the title bar
- [ ] Window can be resized from all 8 edges/corners
- [ ] Window stays within viewport bounds
- [ ] Position and size persist via GodModeProvider
- [ ] Window renders above all application content

**Labels**: `ui`, `window`, `drag-drop`, `resize`

---

### TASK 2: Tab System

**Title**: `Implement tab bar and tab navigation`

**Priority**: Critical

**Description**:
Build the tab bar component with icon+label display, keyboard navigation, and configurable visibility.

**Tasks**:

- [ ] Create `src/components/TabBar.tsx`
- [ ] Render tabs based on `GodModeConfig.tabs` configuration
- [ ] Display bilingual labels based on preferred language
- [ ] Implement Ctrl+Tab / Ctrl+Shift+Tab navigation
- [ ] Highlight active tab with visual indicator
- [ ] Support tab tooltips with descriptions
- [ ] Responsive layout for narrow windows

**Acceptance criteria**:

- [ ] Only configured tabs are displayed
- [ ] Active tab is visually distinct
- [ ] Keyboard navigation cycles through tabs
- [ ] Labels display in correct language

**Labels**: `ui`, `tabs`, `navigation`

---

### TASK 3: Query Panel

**Title**: `Create AI query panel for component metadata`

**Priority**: High

**Description**:
Build the Query tab panel that allows users to ask AI questions about application components.

**Tasks**:

- [ ] Create `src/components/QueryPanel.tsx`
- [ ] Text input field for queries
- [ ] Display component metadata from `ComponentRegistry`
- [ ] Language detection for query input
- [ ] Results display with component cards
- [ ] Loading and error states

**Acceptance criteria**:

- [ ] Users can type queries about components
- [ ] Results display relevant component metadata
- [ ] Bilingual query support works correctly

**Labels**: `ui`, `query`, `panel`

---

### TASK 4: Context Panel

**Title**: `Create component context information panel`

**Priority**: High

**Description**:
Build the Context tab panel that displays detailed information about the currently selected or focused component.

**Tasks**:

- [ ] Create `src/components/ContextPanel.tsx`
- [ ] Display component metadata (name, description, category, tags, version, status)
- [ ] Show component file path with link formatting
- [ ] Display component status badge (stable, beta, deprecated, experimental)
- [ ] Empty state when no component is selected

**Acceptance criteria**:

- [ ] Panel displays all available metadata
- [ ] Status is visually indicated with badges/colors
- [ ] Handles missing/optional metadata gracefully

**Labels**: `ui`, `context`, `panel`

---

### TASK 5: Search Panel

**Title**: `Create extended component search panel`

**Priority**: Medium

**Description**:
Build the Search tab panel for finding components across the application registry.

**Tasks**:

- [ ] Create `src/components/SearchPanel.tsx`
- [ ] Search input with debounced querying
- [ ] Search by name, description, tags, and category
- [ ] Filter by category and status
- [ ] Results list with component previews
- [ ] Click-to-select component integration

**Acceptance criteria**:

- [ ] Search returns relevant results from `ComponentRegistry`
- [ ] Filters narrow down results correctly
- [ ] Results are clickable and provide component details

**Labels**: `ui`, `search`, `panel`

---

### TASK 6: Theming & Styling

**Title**: `Create theming system for GOD MODE UI`

**Priority**: Medium

**Description**:
Build a theming system that allows the GOD MODE window to blend into any application's visual style.

**Tasks**:

- [ ] Define theme interface (colors, fonts, spacing, borders)
- [ ] Create default light and dark themes
- [ ] Implement CSS-in-JS approach (inline styles or CSS modules)
- [ ] Add theme prop to GodModeProvider
- [ ] Ensure no CSS conflicts with host application
- [ ] Scope all styles to GOD MODE container

**Acceptance criteria**:

- [ ] Window looks good with default theme
- [ ] Custom themes can override all visual properties
- [ ] No CSS side effects on host application

**Labels**: `ui`, `theming`, `styling`

---

## Effort Estimation

| TASK                 | Complexity | Priority | Dependencies   |
| -------------------- | ---------- | -------- | -------------- |
| 1. Floating Window   | High       | Critical | Phase 1        |
| 2. Tab System        | Medium     | Critical | TASK 1         |
| 3. Query Panel       | Medium     | High     | TASK 1, TASK 2 |
| 4. Context Panel     | Low        | High     | TASK 1, TASK 2 |
| 5. Search Panel      | Medium     | Medium   | TASK 1, TASK 2 |
| 6. Theming & Styling | Medium     | Medium   | TASK 1         |

**Execution order**:

1. TASK 1 (window foundation)
2. TASK 2 (tab navigation)
3. TASK 6 (theming — affects all panels)
4. TASK 3, TASK 4 (in parallel — independent panels)
5. TASK 5 (search — may reference other panels)

---

**Back to [README](../../README.md)**
