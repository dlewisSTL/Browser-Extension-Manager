# Browser Extension Manager

A responsive browser extension management interface built as a solution to the Frontend Mentor Browser Extensions Manager UI challenge.

Users can view, filter, activate, deactivate, remove, and restore browser extensions while switching between light and dark themes.

---

## Table of Contents

- [Overview](#overview)
  - [The Challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My Process](#my-process)
  - [Built with](#built-with)
  - [Technical Highlights](#technical-highlights)
  - [What I Learned](#what-i-learned)
  - [Continued Development](#continued-development)
  - [Useful Resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

---

# Overview

## The Challenge

The goal of this project was to build a responsive browser extension management interface that allows users to:

- View a list of browser extensions
- Filter extensions by All, Active, and Inactive status
- Activate and deactivate extensions
- Remove extensions through a confirmation modal
- Undo recently removed extensions
- Switch between light and dark themes
- Persist extension data, filter preferences, and theme preferences between sessions
- View a responsive layout across desktop, tablet, and mobile devices

## Screenshot

![Browser Extension Manager UI](./images/screenshot.jpg)

## Links

- Solution URL: [GitHub Repository](https://github.com/dlewisSTL/Browser-Extension-Manager)
- Live Site URL: [Live Demo](https://browser-extension-manager-eight-eta.vercel.app)

---

# My Process

## Built with

- Semantic HTML5 markup
- CSS custom properties
- CSS Flexbox
- CSS Grid
- Responsive design
- Vanilla JavaScript
- DOM manipulation
- Local Storage API
- Fetch API
- JSON data handling
- CSS animations and transitions
- Accessible interactive controls

## Technical Highlights

- Built a dynamic extension manager using vanilla JavaScript
- Loaded extension data from a local JSON file using the Fetch API
- Dynamically generated extension cards from application data
- Implemented Active, Inactive, and All filtering
- Added persistent extension state using Local Storage
- Added persistent theme preferences using Local Storage
- Added persistent filter preferences using Local Storage
- Implemented a confirmation modal before removing an extension
- Added an Undo system for recently removed extensions
- Added animated extension removal transitions
- Implemented keyboard support for closing the modal with Escape
- Added accessible modal labeling using ARIA attributes
- Added live toast notifications using aria-live
- Used aria-pressed to communicate the selected filter state
- Added responsive layouts for desktop, tablet, and mobile screens

---

## What I Learned

This project helped strengthen my understanding of building interactive frontend applications with vanilla JavaScript while paying close attention to accessibility, state, and UI behavior.

Some of the main concepts I practiced:

### Application State Management

I created and managed application state for:

- Extension data
- Active/inactive extension status
- Current filter
- Selected extension for removal
- Recently removed extension
- Recently removed extension index
- Undo timeout
- Modal focus state

Keeping this state organized helped separate the application's data from the UI.

### UI State Synchronization

I practiced keeping application state, visual UI state, and accessibility state synchronized.

This included:

- Updating the active filter visually
- Updating `aria-pressed` values
- Persisting the selected filter
- Restoring the selected filter when the page loads
- Re-rendering the extension list when state changes

### DOM Manipulation

I dynamically generated extension cards from JSON data and connected each card to its corresponding application state.

This included:

- Creating extension cards
- Updating toggle states
- Removing extensions
- Restoring removed extensions
- Displaying empty states
- Updating filter results

### Local Storage

I used the Local Storage API to persist:

- Extension state
- Selected filter
- Light/dark theme preference

This allows the application to maintain its state when the user returns to the page.

### Modal and Focus Management

I implemented a confirmation modal for extension removal and practiced managing focus when the modal opens and closes.

The modal includes:

- Accessible dialog semantics
- aria-modal
- aria-labelledby
- Focus movement to the confirmation button
- Focus restoration after closing
- Escape-key support

### Toast Notifications and Undo

I created a temporary toast notification that appears after an extension is removed.

The toast:

- Identifies the removed extension
- Provides an Undo button
- Automatically disappears after five seconds
- Restores the extension to its previous position when Undo is selected

### Responsive CSS

I used CSS Grid, Flexbox, custom properties, media queries, and responsive sizing to create layouts that adapt across:

- Desktop
- Tablet
- Mobile

---

## Continued development

Future improvements I would like to explore:

- Add more advanced keyboard focus management for the modal
- Further improve accessibility testing with screen readers
- Add additional UI animations and micro-interactions
- Improve the extension data model for larger collections
- Rebuild the application using React and TypeScript to compare the architecture with the vanilla JavaScript implementation
- Explore deploying the application with a modern frontend hosting platform

---

## Useful resources

- [Frontend Mentor](https://www.frontendmentor.io/) - Provided the design challenge and project requirements.

- [MDN Web Docs](https://developer.mozilla.org/) - Used as a reference for JavaScript, DOM APIs, Fetch, and browser functionality.

- [JavaScript.info](https://javascript.info/) - Helpful reference for JavaScript concepts and patterns.

---

## AI Collaboration

I used ChatGPT as an AI development assistant throughout this project.

AI was used for:

- Debugging JavaScript issues
- Reviewing HTML, CSS, and JavaScript
- Discussing accessibility improvements
- Reviewing application structure
- Exploring code organization and refactoring opportunities
- Troubleshooting UI behavior
- Discussing semantic HTML and ARIA attributes
- Reviewing the final project before completion

The development process remained hands-on, with AI acting as a collaboration and problem-solving tool rather than replacing implementation.

---

# Author

- Website - [Derek Lewis](https://derek-lewis.com/)
- Frontend Mentor - [@dlewisSTL](https://www.frontendmentor.io/profile/dlewisSTL)
