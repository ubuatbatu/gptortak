# Mira OS Virtual File System

This repository contains the file system and core structure for **Mira OS**, a fullscreen web‑application that emulates an operating system with a Windows‑like virtual file system. Mira OS includes locked root folders (`Desktop`, `Documents`, `Apps`, `System`, `Recycle`) and built‑in system applications such as Notepad, Viewer, VideoPlayer, FileManager, Terminal, MiraBrowser, DevStudio, and Settings.

## File System Overview

- `Desktop` – Contains user desktop shortcuts and files.
- `Documents` – User's document storage.
- `Apps/SystemApps` – Contains built‑in system applications (Notepad, Viewer, VideoPlayer, FileManager, Terminal, MiraBrowser, DevStudio, Settings).
- `System` – Stores configuration (`config/`), icon resources (`icons/`), desktop layout data (`desktop/`), installed apps metadata (`apps/`) and theme files (`themes/`).
- `Recycle` – Contains deleted items (recycle bin).

The root directories are immutable and cannot be deleted or renamed; users can only interact with their contents.

## System Applications

- **Notepad** – A basic text editor for creating and editing notes.
- **Viewer** – Image and photo viewer supporting common formats.
- **VideoPlayer** – Video playback for common video formats.
- **FileManager** – Lets users browse the virtual file system. It displays the current path in a breadcrumb bar at the top and shows the number of items in the current directory in a status bar at the bottom. Supports standard keyboard shortcuts and context menus for copy, cut, paste, rename, delete, and new folder operations.
- **Terminal** – Provides a command‑line interface for advanced operations.
- **MiraBrowser** – Embedded browser for browsing the web.
- **DevStudio** – A lightweight IDE for creating HTML/CSS/JSON/JavaScript projects with syntax highlighting and basic error detection.
- **Settings** – Controls system settings such as desktop scale, personalization, and whether root directory icons appear on the desktop.

## File Manager Details

The File Manager is designed for an intuitive user experience:

- Top breadcrumb bar shows the current directory path and allows quick navigation.
- Bottom status bar displays the number of items in the current directory and selected items.
- Supports drag‑and‑drop, multi‑select, and keyboard shortcuts (e.g., `Ctrl+C` to copy, `Ctrl+V` to paste, `Ctrl+Z` to undo).
- Context menu provides quick actions for files and folders.

## Settings Application

The Settings application manages configuration and personalization:

- Adjust desktop scale and icon sizes.
- Toggle whether root directories (Desktop, Documents, Apps, System, Recycle) appear on the desktop.
- Manage themes and appearance (stored under `System/themes`).
- Persist user preferences in JSON files under `System/config`.


