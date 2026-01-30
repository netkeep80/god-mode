# Phase 5: Screen Capture & Annotations

This document describes the planned fifth phase — implementing screen capture and visual annotation tools for enriching GitHub issues with visual evidence.

**Status**: 📋 Planned

---

## Overview

**Goal**: Enable users to capture screenshots of the current application state and annotate them with visual markers to illustrate issues, feature requests, and improvements.

**Problem**: Text-only issue descriptions often fail to convey visual problems (misaligned elements, wrong colors, broken layouts). Users spend time trying to describe what they see instead of simply showing it.

**Solution**: Build screen capture and annotation tools:

- One-click viewport or component screenshot capture
- Drawing tools for annotations (arrows, circles, rectangles, text, highlights)
- Integration with issue drafts for automatic attachment
- Annotation persistence and management

**Benefit for humanity**: Making visual communication accessible in development workflows. A picture truly is worth a thousand words — annotated screenshots reduce ambiguity, accelerate bug resolution, and make reporting accessible to people who struggle with written descriptions.

---

## Planned TASKs

### TASK 1: Screen Capture Engine

**Title**: `Implement browser-based screen capture`

**Priority**: Critical

**Description**:
Build a screen capture library that can capture the current viewport or specific components using browser APIs.

**Tasks**:

- [ ] Create `src/lib/screen-capture.ts`
- [ ] Viewport capture via Canvas API with SVG foreignObject
- [ ] Component-specific capture by CSS selector or data-testid
- [ ] Canvas element direct capture (for WebGL/Three.js content)
- [ ] Configurable format (PNG, JPEG, WebP), quality, and scale
- [ ] Base64 encoding for storage and transmission
- [ ] `ScreenCaptureManager` class for managing screenshot collections
- [ ] Storage limits and cleanup

**Acceptance criteria**:

- [ ] Viewport screenshots capture visible content
- [ ] Component screenshots isolate specific elements
- [ ] Canvas content (WebGL) is captured correctly
- [ ] Screenshots are stored in configurable format
- [ ] Manager handles storage quota

**Labels**: `screenshot`, `capture`, `canvas-api`

---

### TASK 2: Annotation Canvas

**Title**: `Create annotation drawing canvas component`

**Priority**: Critical

**Description**:
Build an interactive canvas component for adding annotations on top of screenshots.

**Tasks**:

- [ ] Create `src/components/AnnotationCanvas.tsx`
- [ ] Arrow tool — directional arrows pointing at features
- [ ] Circle tool — circles highlighting areas
- [ ] Rectangle tool — rectangles framing areas
- [ ] Text tool — text labels with positioning
- [ ] Highlight tool — semi-transparent overlays
- [ ] Color picker with 8+ preset colors
- [ ] Stroke width control
- [ ] Undo/redo support
- [ ] Clear all annotations
- [ ] Scale-aware rendering (zoom support)

**Acceptance criteria**:

- [ ] All 5 annotation tools work correctly
- [ ] Colors and stroke widths are customizable
- [ ] Undo/redo restores previous states
- [ ] Annotations render at correct scale
- [ ] Touch devices are supported

**Labels**: `ui`, `annotation`, `canvas`, `drawing`

---

### TASK 3: Screenshot Integration with Issue Drafts

**Title**: `Integrate screenshot capture and annotation with issue draft panel`

**Priority**: High

**Description**:
Connect screen capture and annotation tools with the issue draft creation workflow.

**Tasks**:

- [ ] "Capture Screenshot" button in IssueDraftPanel
- [ ] Screenshot preview thumbnails in draft
- [ ] Click thumbnail to open annotation editor
- [ ] Delete screenshot from draft
- [ ] Multiple screenshots per draft
- [ ] Screenshot metadata (component, timestamp, resolution)
- [ ] Modal annotation editor over the window

**Acceptance criteria**:

- [ ] Screenshots can be captured from draft panel
- [ ] Thumbnails display in the draft
- [ ] Annotations can be added/edited after capture
- [ ] Screenshots are included in published issues

**Labels**: `integration`, `issues`, `screenshots`

---

### TASK 4: Screenshot Persistence

**Title**: `Implement screenshot storage and management`

**Priority**: Medium

**Description**:
Build persistence layer for screenshots with localStorage management and quota handling.

**Tasks**:

- [ ] Save annotated screenshots to localStorage
- [ ] Load screenshots on session restore
- [ ] Storage quota monitoring and warnings
- [ ] Automatic cleanup of old screenshots
- [ ] Export screenshots as files
- [ ] Import screenshots from files

**Acceptance criteria**:

- [ ] Screenshots persist across page reloads
- [ ] Storage quota is respected
- [ ] Old screenshots are cleaned up automatically
- [ ] Export/import works correctly

**Labels**: `storage`, `persistence`, `screenshots`

---

### TASK 5: Screenshot Upload for GitHub Issues

**Title**: `Implement screenshot upload for GitHub issue creation`

**Priority**: Medium

**Description**:
Enable uploading screenshots when creating GitHub issues, embedding them as inline images.

**Tasks**:

- [ ] Upload screenshots via GitHub Gist API or repo upload
- [ ] Generate markdown image references
- [ ] Embed images inline in issue body
- [ ] Handle upload failures gracefully
- [ ] Optimize image size before upload

**Acceptance criteria**:

- [ ] Screenshots appear as images in created issues
- [ ] Upload handles large images (compression)
- [ ] Failed uploads show clear error messages

**Labels**: `github`, `upload`, `screenshots`

---

## Effort Estimation

| TASK                      | Complexity | Priority | Dependencies             |
| ------------------------- | ---------- | -------- | ------------------------ |
| 1. Screen Capture Engine  | High       | Critical | Phase 1 (types)          |
| 2. Annotation Canvas      | High       | Critical | Phase 2 (window)         |
| 3. Screenshot Integration | Medium     | High     | TASK 1, TASK 2, Phase 4  |
| 4. Screenshot Persistence | Low        | Medium   | TASK 1                   |
| 5. Screenshot Upload      | Medium     | Medium   | TASK 1, Phase 4 (GitHub) |

**Execution order**:

1. TASK 1 (capture engine — foundation)
2. TASK 2 (annotation canvas — can run in parallel with TASK 1)
3. TASK 4 (persistence — extends capture engine)
4. TASK 3 (integration — connects capture with draft panel)
5. TASK 5 (upload — final step requiring GitHub API)

---

## Technical Considerations

### Browser API Compatibility

| Feature                     | Chrome | Firefox | Safari     | Edge |
| --------------------------- | ------ | ------- | ---------- | ---- |
| Canvas toDataURL            | ✅     | ✅      | ✅         | ✅   |
| SVG foreignObject           | ✅     | ✅      | ⚠️ Partial | ✅   |
| MediaDevices screen capture | ✅     | ✅      | ⚠️ Limited | ✅   |
| PointerEvents for drawing   | ✅     | ✅      | ✅         | ✅   |

**Fallback strategy**: Use Canvas API with SVG foreignObject as primary method, with html2canvas as optional polyfill for unsupported browsers.

---

**Back to [README](../../README.md)**
