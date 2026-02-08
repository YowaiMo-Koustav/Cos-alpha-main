# CLI-OS (Cos Alpha) - Human-Language Browser Operating System

<div align="center">

![CLI-OS Logo](/public/favicon.ico)

**A revolutionary browser-based operating system that understands natural language**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[Live Demo](#) • [Report Bug](#) • [Request Feature](#)

</div>

## 📖 Table of Contents

- [About](#about)
- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
- [AI Integration](#ai-integration)
- [Themes](#themes)
- [File Editors](#file-editors)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🌟 About

**CLI-OS (Cos Alpha)** is a cutting-edge browser-based operating system that brings the power of Linux commands to your web browser, with a revolutionary twist: it understands natural language! Powered by Google Gemini AI, this virtual operating system allows you to interact with a complete file system using plain English commands.

### 🎯 Mission

To democratize command-line interfaces by making them accessible to everyone, regardless of their technical background. Whether you're a seasoned developer or a complete beginner, CLI-OS provides an intuitive way to perform file operations, system management, and text editing through natural language understanding.

### 🚀 What Makes It Special

- **🧠 Natural Language Processing**: Type commands in plain English and watch as AI converts them to valid Linux commands
- **💻 Complete Linux Environment**: Full implementation of essential Linux commands with proper flags and arguments
- **🎨 Beautiful Themes**: Multiple terminal themes including Matrix Green, Cyberpunk, and more
- **⌨️ Text Editors**: Built-in Nano and Vim editors with full functionality
- **📁 Virtual File System**: Persistent in-browser file system with directory structure
- **🔒 Privacy First**: Everything runs locally in your browser - no server required

## ✨ Features

### 🤖 AI-Powered Natural Language Processing

- **Smart Command Interpretation**: Converts natural language to Linux commands using Google Gemini AI
- **Contextual Understanding**: Understands complex commands with multiple parameters
- **Confidence Scoring**: Provides confidence levels for AI interpretations
- **Graceful Fallback**: Falls back to pattern matching if AI is unavailable

### 💻 Complete Command Suite

- **File Operations**: `ls`, `cd`, `mkdir`, `rm`, `cp`, `mv`, `touch`, `cat`, and more
- **Text Processing**: `echo`, `head`, `tail`, `wc`, `sort`, `uniq`, `grep`, `sed`, `awk`
- **System Information**: `ps`, `top`, `df`, `du`, `free`, `uname`, `whoami`
- **Archive Management**: `tar`, `zip`, `unzip`, `gzip`, `gunzip`
- **Network Tools**: `ping`, `wget`, `curl`, `netstat`
- **Process Management**: `kill`, `killall`, `jobs`, `bg`, `fg`

### 🎨 Customization

- **Multiple Themes**: Matrix Green, Cyberpunk, Monokai, Dracula, and more
- **Font Options**: Customizable terminal fonts and sizes
- **Color Schemes**: Full RGB color support with ANSI escape codes
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### ⌨️ Advanced Text Editing

- **Nano Editor**: Full-featured nano clone with intuitive keyboard shortcuts
- **Vim Editor**: Complete vim implementation with modes, commands, and plugins
- **Syntax Highlighting**: Color-coded syntax for various file types
- **Search & Replace**: Powerful text search and replacement capabilities

### 📁 Virtual File System

- **Persistent Storage**: File system persists across browser sessions
- **Directory Structure**: Complete Unix-like directory hierarchy
- **File Metadata**: Track creation, modification times, and file sizes
- **Permissions**: Simulated Unix file permissions system

## 🏗️ Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                    CLI-OS Architecture                      │
├─────────────────────────────────────────────────────────────┤
│  Frontend Layer                                             │
│  ├── React Components (Terminal, Editors, UI)               │
│  ├── State Management (React Hooks, Context)                │
│  └── Styling (Tailwind CSS, shadcn/ui)                      │
├─────────────────────────────────────────────────────────────┤
│  Core Logic Layer                                           │
│  ├── Command Parser & Executor                              │
│  ├── Virtual File System                                    │
│  ├── Theme System                                           │
│  └── Text Editors (Nano, Vim)                               │
├─────────────────────────────────────────────────────────────┤
│  AI Integration Layer                                       │
│  ├── Google Gemini API                                      │
│  ├── Natural Language Interpreter                           │
│  └── Fallback Pattern Matching                              │
├─────────────────────────────────────────────────────────────┤
│  Storage Layer                                              │
│  ├── Browser LocalStorage                                   │
│  ├── File System Persistence                                │
│  └── Theme & Settings Storage                               │
└─────────────────────────────────────────────────────────────┘
```

### Key Technologies

- **Frontend**: React 18, TypeScript, Vite
- **UI Framework**: shadcn/ui, Radix UI components
- **Styling**: Tailwind CSS with custom terminal themes
- **AI Integration**: Google Generative AI (Gemini)
- **State Management**: React Query, React Hooks
- **Build Tools**: Vite, ESLint, Vitest
- **Icons**: Lucide React

## 🛠️ Installation

### Prerequisites

- **Node.js**: Version 18.0 or higher
- **npm**: Version 9.0 or higher (or yarn/pnpm)
- **Modern Web Browser**: Chrome, Firefox, Safari, or Edge

### Step 1: Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/yourusername/cos-alpha.git

# Using SSH
git clone git@github.com:yourusername/cos-alpha.git

# Navigate to the project directory
cd cos-alpha
```

### Step 2: Install Dependencies

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

### Step 3: Environment Configuration

Create a `.env` file in the root directory:

```bash
# Google Gemini API Key (optional but recommended)
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here

# Get your API key from: https://makersuite.google.com/app/apikey
```

### Step 4: Start Development Server

```bash
# Start the development server
npm run dev

# The application will be available at:
# http://localhost:8080
```

### Alternative Installation Methods

#### Using Docker (Coming Soon)

```bash
# Build the Docker image
docker build -t cli-os .

# Run the container
docker run -p 8080:8080 cli-os
```

#### Using CDN (No Installation Required)

Simply open the following URL in your browser:
```
https://cli-os.vercel.app
```

## 🚀 Usage

### Getting Started

1. **Open the Application**: Navigate to `http://localhost:8080` in your browser
2. **Welcome Screen**: You'll see the CLI-OS logo and welcome message
3. **Start Typing**: Begin entering commands in natural language or traditional Linux format

### Basic Natural Language Commands

```bash
# File operations
"show me all files including hidden ones"
"create a folder called myproject"
"remove file.txt forcefully"
"copy file1.txt to backup/"

# Navigation
"go to the documents folder"
"show current directory"
"go back one level"

# System information
"show system information"
"display disk usage"
"list running processes"

# Text editing
"edit config.txt with nano"
"open myfile.txt in vim"
"create a new file called readme.md"
```

### Traditional Linux Commands

```bash
# Navigation
ls -la
cd /home/user
pwd

# File operations
mkdir projects
touch index.html
rm -rf old_folder
cp source.txt destination.txt
mv old_name.txt new_name.txt

# Text operations
echo "Hello World" > greeting.txt
cat file.txt
head -n 10 logfile.txt
tail -f access.log

# System info
ps aux
df -h
free -m
uname -a
```

### Advanced Features

#### Theme Customization

```bash
# List available themes
theme

# Apply a theme
theme matrix
theme cyberpunk
theme monokai

# Get current theme info
theme --current
```

#### File Editing

```bash
# Open Nano editor
nano filename.txt

# Open Vim editor
vim filename.txt

# Edit with natural language
"edit config.txt"
"open myscript.js in vim"
```

#### AI-Powered Commands

```bash
# Complex operations
"create a backup of all .txt files in a compressed archive"
"find all python files modified in the last 7 days"
"show me the 10 largest files in the current directory"
"rename all .jpeg files to .jpg"
```

## 📋 Commands Reference

### Navigation Commands

| Command | Description | Example |
|---------|-------------|---------|
| `ls` | List directory contents | `ls -la`, `ls *.txt` |
| `cd` | Change directory | `cd /home`, `cd ..` |
| `pwd` | Print working directory | `pwd` |
| `pushd` | Push directory to stack | `pushd /tmp` |
| `popd` | Pop directory from stack | `popd` |
| `dirs` | Display directory stack | `dirs` |

### File Operations

| Command | Description | Example |
|---------|-------------|---------|
| `touch` | Create empty file | `touch newfile.txt` |
| `mkdir` | Create directory | `mkdir -p projects/web` |
| `rm` | Remove files/directories | `rm -rf old_folder` |
| `cp` | Copy files/directories | `cp -r src/ backup/` |
| `mv` | Move/rename files | `mv old.txt new.txt` |
| `cat` | Display file contents | `cat file.txt` |
| `stat` | Show file status | `stat file.txt` |

### Text Processing

| Command | Description | Example |
|---------|-------------|---------|
| `echo` | Display text | `echo "Hello World"` |
| `head` | Show first lines | `head -n 20 file.txt` |
| `tail` | Show last lines | `tail -f logfile.txt` |
| `wc` | Word/line count | `wc -l file.txt` |
| `grep` | Search text | `grep "error" log.txt` |
| `sed` | Stream editor | `sed 's/old/new/g' file.txt` |
| `sort` | Sort lines | `sort file.txt` |
| `uniq` | Remove duplicates | `uniq file.txt` |

### System Information

| Command | Description | Example |
|---------|-------------|---------|
| `ps` | Process list | `ps aux` |
| `top` | System monitor | `top` |
| `df` | Disk usage | `df -h` |
| `du` | Directory size | `du -sh *` |
| `free` | Memory usage | `free -m` |
| `uname` | System info | `uname -a` |
| `whoami` | Current user | `whoami` |

### Archive Operations

| Command | Description | Example |
|---------|-------------|---------|
| `tar` | Archive utility | `tar -czf backup.tar.gz folder/` |
| `zip` | Create zip archive | `zip archive.zip files/` |
| `unzip` | Extract zip | `unzip archive.zip` |
| `gzip` | Compress files | `gzip file.txt` |
| `gunzip` | Decompress files | `gunzip file.txt.gz` |

## 🤖 AI Integration

### Google Gemini API

CLI-OS integrates with Google Gemini AI to provide intelligent natural language processing:

#### Setup

1. **Get API Key**: Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Configure Environment**: Add your API key to `.env` file
3. **Restart Application**: Reload the browser to apply changes

#### Features

- **Smart Interpretation**: Understands complex natural language commands
- **Context Awareness**: Maintains context across multiple commands
- **Confidence Scoring**: Provides reliability metrics for interpretations
- **Error Handling**: Graceful fallback to pattern matching

#### Examples

```bash
# Simple commands
"list all files" → ls -la
"create folder" → mkdir new_folder
"delete file" → rm filename.txt

# Complex commands
"find all python files with more than 100 lines"
→ find . -name "*.py" -exec wc -l {} + | awk '$1 > 100'

"backup my documents to a compressed archive"
→ tar -czf documents_backup.tar.gz ~/Documents/

"show system processes sorted by memory usage"
→ ps aux --sort=-%mem
```

#### Fallback System

When Gemini API is unavailable:
- **Pattern Matching**: Uses keyword-based parsing
- **Command Registry**: Maps common phrases to commands
- **Partial Matching**: Handles incomplete commands gracefully

## 🎨 Themes

### Available Themes

| Theme Name | Description | Colors |
|------------|-------------|--------|
| **Matrix** | Classic green phosphor terminal | Green on black |
| **Cyberpunk** | Neon cyberpunk aesthetic | Cyan/magenta on dark |
| **Monokai** | Popular dark theme | Orange/blue on dark |
| **Dracula** | Elegant dark theme | Purple/pink on dark |
| **Solarized** | Eye-friendly colors | Blue/green on dark |
| **GitHub** | Clean light theme | Black on white |
| **Nord** | Arctic-inspired theme | Blue/gray on dark |

### Theme Management

```bash
# List all themes
theme

# Apply a theme
theme matrix

# Get current theme
theme --current

# Reset to default
theme --reset
```

### Custom Themes

Create custom themes by modifying the theme configuration:

```typescript
// src/lib/themes.ts
export const customTheme: TerminalTheme = {
  id: 'custom',
  name: 'My Custom Theme',
  description: 'Personalized terminal theme',
  colors: {
    background: '220 20% 4%',
    foreground: '0 0% 98%',
    // ... other color definitions
  }
};
```

## ⌨️ File Editors

### Nano Editor

A user-friendly text editor with intuitive keyboard shortcuts:

#### Basic Usage

```bash
# Open/create file
nano filename.txt

# Navigation
- Arrow keys: Move cursor
- Ctrl + A: Beginning of line
- Ctrl + E: End of line
- Ctrl + Y: Previous page
- Ctrl + V: Next page

# Editing
- Ctrl + K: Cut line
- Ctrl + U: Paste line
- Ctrl + O: Save file
- Ctrl + X: Exit editor

# Search
- Ctrl + W: Search
- Ctrl + W + Enter: Find next
```

#### Features

- **Syntax Highlighting**: Color-coded syntax for various file types
- **Auto-indent**: Automatic indentation for code files
- **Search & Replace**: Find and replace text
- **Multiple Buffers**: Edit multiple files simultaneously
- **Undo/Redo**: Revert and reapply changes

### Vim Editor

A powerful modal text editor with extensive features:

#### Modes

1. **Normal Mode**: Navigation and commands (default)
2. **Insert Mode**: Text editing
3. **Visual Mode**: Text selection
4. **Command Mode**: Ex commands

#### Basic Commands

```bash
# Opening files
vim filename.txt
vim +10 filename.txt    # Open at line 10

# Normal Mode
h, j, k, l: Move cursor
w, b: Word navigation
gg, G: Beginning/end of file
dd: Delete line
yy: Yank line
p: Paste
/term: Search forward
?term: Search backward
:n: Next search result
:N: Previous search result

# Insert Mode
i: Insert before cursor
a: Insert after cursor
o: Open new line below
O: Open new line above
ESC: Return to normal mode

# Command Mode
:w: Save
:q: Quit
:wq: Save and quit
:q!: Force quit
:%s/old/new/g: Replace all
:set number: Show line numbers
:syntax on: Enable syntax highlighting
```

#### Advanced Features

- **Macros**: Record and playback command sequences
- **Registers**: Multiple copy/paste buffers
- **Split Windows**: Edit multiple files simultaneously
- **Auto-completion**: Intelligent code completion
- **Plugin System**: Extensible architecture

## 🛠️ Development

### Project Structure

```
cos-alpha/
├── public/                 # Static assets
│   ├── favicon.ico
│   └── placeholder.svg
├── src/
│   ├── components/        # React components
│   │   ├── Terminal.tsx   # Main terminal component
│   │   ├── NanoEditor.tsx # Nano text editor
│   │   ├── VimEditor.tsx  # Vim text editor
│   │   └── ui/            # shadcn/ui components
│   ├── lib/               # Core logic
│   │   ├── commandExecutor.ts    # Command execution
│   │   ├── virtualFileSystem.ts  # File system
│   │   ├── humanLanguageInterpreter.ts # AI integration
│   │   ├── geminiInterpreter.ts  # Gemini API
│   │   ├── themes.ts      # Theme system
│   │   └── commands/      # Command definitions
│   ├── hooks/             # React hooks
│   ├── pages/             # Page components
│   ├── utils/             # Utility functions
│   └── test/              # Test files
├── docs/                  # Documentation
├── .env.example           # Environment template
├── package.json           # Dependencies
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind configuration
└── README.md             # This file
```

### Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Build for development
npm run build:dev

# Run tests
npm test

# Watch tests
npm run test:watch

# Lint code
npm run lint

# Preview production build
npm run preview
```

### Code Quality

- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Vitest**: Unit testing
- **Husky**: Git hooks (coming soon)

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test Terminal.test.tsx
```

### Building for Production

```bash
# Build optimized production version
npm run build

# Preview production build
npm run preview

# Analyze bundle size
npm run build --analyze
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Contributing Guidelines

1. **Fork the Repository**: Click the "Fork" button on GitHub
2. **Create a Feature Branch**: `git checkout -b feature/amazing-feature`
3. **Make Your Changes**: Implement your feature or bug fix
4. **Add Tests**: Ensure your changes are well-tested
5. **Commit Your Changes**: `git commit -m 'Add amazing feature'`
6. **Push to Branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**: Submit your changes for review

### Development Guidelines

- **Code Style**: Follow the existing TypeScript and React patterns
- **Testing**: Write tests for new features and bug fixes
- **Documentation**: Update documentation for any API changes
- **Performance**: Consider performance implications of changes
- **Accessibility**: Ensure components are accessible

### Areas for Contribution

- **New Commands**: Implement additional Linux commands
- **Theme Development**: Create new terminal themes
- **AI Improvements**: Enhance natural language processing
- **Editor Features**: Add features to Nano and Vim editors
- **Documentation**: Improve documentation and examples
- **Performance**: Optimize rendering and file operations
- **Mobile Support**: Improve mobile experience
- **Internationalization**: Add multi-language support

### Bug Reports

When reporting bugs, please include:

- **Description**: Clear description of the issue
- **Steps to Reproduce**: Detailed reproduction steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: Browser, OS, and version information
- **Screenshots**: If applicable, include screenshots

### Feature Requests

For feature requests:

- **Use Case**: Describe the problem you're trying to solve
- **Proposed Solution**: How you envision the feature working
- **Alternatives**: Any alternative solutions considered
- **Priority**: How important this feature is to you

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

```
Copyright (c) 2024 CLI-OS Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 📞 Contact

### Project Maintainers

- **[Your Name]** - *Project Lead* - [your.email@example.com](mailto:your.email@example.com)
- **[Contributor Name]** - *Core Developer* - [contributor@example.com](mailto:contributor@example.com)

### Get in Touch

- **GitHub Issues**: [Report bugs and request features](https://github.com/yourusername/cos-alpha/issues)
- **GitHub Discussions**: [Community discussions and Q&A](https://github.com/yourusername/cos-alpha/discussions)
- **Twitter**: [@cli_os](https://twitter.com/cli_os)
- **Email**: [contact@cli-os.dev](mailto:contact@cli-os.dev)

### Acknowledgments

- **Google Gemini AI** - For providing the powerful natural language processing capabilities
- **shadcn/ui** - For the beautiful and accessible UI components
- **Vite** - For the fast and efficient build tool
- **React Community** - For the amazing ecosystem and tools
- **Open Source Contributors** - For making this project possible

---

<div align="center">

**⭐ Star this repository if it helped you!**

Made with ❤️ by the CLI-OS Team

[Back to Top](#cli-os-cos-alpha---human-language-browser-operating-system)

</div>
