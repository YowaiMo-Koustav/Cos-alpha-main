import { useState, useRef, useEffect, useCallback } from 'react';
import { FileSystem, loadFileSystem, getPathString, readFile, writeFile, saveFileSystem } from '@/lib/virtualFileSystem';
import { parseHumanLanguage } from '@/lib/humanLanguageInterpreter';
import { executeCommand, CommandOutput } from '@/lib/commandExecutor';
import { useTabCompletion } from '@/hooks/useTabCompletion';
import { NanoEditor } from './NanoEditor';
import { VimEditor } from './VimEditor';
import { applyTheme, getStoredTheme } from '@/lib/themes';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'info' | 'warning' | 'prompt';
  content: string;
  prompt?: string;
}

interface EditorState {
  isOpen: boolean;
  editor: 'nano' | 'vim' | null;
  filename: string;
  content: string;
}

const ASCII_LOGO = `
   ██████╗ ██████╗ ███████╗     █████╗ 
  ██╔════╝██╔═══██╗██╔════╝    ██╔══██╗
  ██║     ██║   ██║███████╗    ███████║
  ██║     ██║   ██║╚════██║    ██╔══██║
  ╚██████╗╚██████╔╝███████║    ██║  ██║
   ╚═════╝ ╚═════╝ ╚══════╝    ╚═╝  ╚═╝
`;

const WELCOME_MESSAGE = `
  ┌─────────────────────────────────────────────────────────────┐
  │  Welcome to cos α v1.0 — A Human-Language Operating System  │
  │                                                              │
  │  🧠 I understand natural language! Try saying:              │
  │     • "show me my files"                                    │
  │     • "create a folder called projects"                     │
  │     • "vim myfile.txt" or "nano myfile.txt" to edit files   │
  │     • "theme" to see available themes                       │
  │                                                              │
  │  🤖 Powered by Google Gemini AI for intelligent command    │
  │     interpretation. Just type in plain English!             │
  │                                                              │
  │  Type "help" for all available commands.                    │
  └─────────────────────────────────────────────────────────────┘
`;

export const Terminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [fileSystem, setFileSystem] = useState<FileSystem>(() => loadFileSystem());
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isBooting, setIsBooting] = useState(true);
  const [tabSuggestions, setTabSuggestions] = useState<string[]>([]);
  const [editorState, setEditorState] = useState<EditorState>({ isOpen: false, editor: null, filename: '', content: '' });
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  // Tab completion hook
  const { complete } = useTabCompletion(fileSystem);
  
  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = getStoredTheme();
    applyTheme(savedTheme);
  }, []);

  // Boot sequence
  useEffect(() => {
    const bootLines: TerminalLine[] = [];
    
    // Add ASCII logo
    bootLines.push({
      id: 'logo',
      type: 'info',
      content: ASCII_LOGO,
    });
    
    // Add welcome message
    bootLines.push({
      id: 'welcome',
      type: 'output',
      content: WELCOME_MESSAGE,
    });
    
    // Simulate boot delay
    const bootTimer = setTimeout(() => {
      setLines(bootLines);
      setIsBooting(false);
    }, 500);
    
    return () => clearTimeout(bootTimer);
  }, []);
  
  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);
  
  // Focus input on click
  const handleTerminalClick = useCallback(() => {
    inputRef.current?.focus();
  }, []);
  
  // Get current prompt
  const getPrompt = useCallback(() => {
    const path = getPathString(fileSystem.currentPath);
    return `user@cos-α:${path}$`;
  }, [fileSystem.currentPath]);
  
  // Handle editor (nano/vim)
  const openEditor = useCallback((editor: 'nano' | 'vim', filename: string) => {
    const result = readFile(fileSystem, filename);
    const content = result.content ?? '';
    setEditorState({ isOpen: true, editor, filename, content });
  }, [fileSystem]);

  const handleEditorSave = useCallback((content: string) => {
    const result = writeFile(fileSystem, editorState.filename, content);
    if (result.success && result.updatedFS) {
      setFileSystem(result.updatedFS);
      saveFileSystem(result.updatedFS);
    }
  }, [fileSystem, editorState.filename]);

  const handleEditorExit = useCallback(() => {
    setEditorState({ isOpen: false, editor: null, filename: '', content: '' });
    inputRef.current?.focus();
  }, []);

  // Handle command submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const prompt = getPrompt();
    
    // Add input line
    const inputLine: TerminalLine = {
      id: `input-${Date.now()}`,
      type: 'input',
      content: input,
      prompt,
    };
    
    setLines(prev => [...prev, inputLine]);
    setCommandHistory(prev => [...prev, input]);
    setHistoryIndex(-1);
    setInput('');
    
    // Show loading indicator
    const loadingLine: TerminalLine = {
      id: `loading-${Date.now()}`,
      type: 'info',
      content: '🤔 Thinking...',
    };
    setLines(prev => [...prev, loadingLine]);
    
    try {
      // Parse and execute command (now async)
      const parsedCmd = await parseHumanLanguage(input);
      
      // Remove loading indicator
      setLines(prev => prev.filter(line => line.id !== loadingLine.id));
      
      // Check for nano command
      if (parsedCmd.command === 'nano' && parsedCmd.args.length > 0) {
        openEditor('nano', parsedCmd.args[0]);
        return;
      }
      
      // Check for vim/vi command (including 'vi' which is returned by resolveAlias for vim/nvim)
      if ((parsedCmd.command === 'vim' || parsedCmd.command === 'vi' || parsedCmd.command === 'nvim') && parsedCmd.args.length > 0) {
        openEditor('vim', parsedCmd.args[0]);
        return;
      }
      
      const result = executeCommand(parsedCmd, fileSystem, commandHistory);
      
      // Update command history
      const newHistory = [...commandHistory, input];
      setCommandHistory(newHistory);
      setHistoryIndex(-1);
      
      // Handle clear command
      if (result.outputs.some(o => o.content === '__CLEAR__')) {
        setLines([]);
        return;
      }
      
      // Convert outputs to terminal lines
      const outputLines: TerminalLine[] = result.outputs.map((output, i) => ({
        id: `output-${Date.now()}-${i}`,
        type: output.type,
        content: output.content,
      }));
      
      // Update state
      setLines(prev => [...prev, ...outputLines]);
      
      if (result.updatedFS) {
        setFileSystem(result.updatedFS);
      }
    } catch (error) {
      // Remove loading indicator and show error
      setLines(prev => prev.filter(line => line.id !== loadingLine.id));
      
      const errorLine: TerminalLine = {
        id: `error-${Date.now()}`,
        type: 'error',
        content: `Error processing command: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
      setLines(prev => [...prev, errorLine]);
    }
  }, [input, fileSystem, commandHistory, getPrompt, openEditor]);
  
  // Handle keyboard navigation and tab completion
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const cursorPosition = e.currentTarget.selectionStart || input.length;
      const result = complete(input, cursorPosition);
      
      if (result.suggestions.length > 0) {
        setInput(result.completed);
        
        // Show suggestions if multiple matches
        if (result.suggestions.length > 1) {
          setTabSuggestions(result.suggestions);
          // Add suggestions to output
          const suggestionLine: TerminalLine = {
            id: `suggestions-${Date.now()}`,
            type: 'info',
            content: result.suggestions.join('  '),
          };
          setLines(prev => [...prev, suggestionLine]);
        } else {
          setTabSuggestions([]);
        }
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setTabSuggestions([]);
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setTabSuggestions([]);
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else {
      // Clear suggestions on any other key
      if (tabSuggestions.length > 0) {
        setTabSuggestions([]);
      }
    }
  }, [commandHistory, historyIndex, input, complete, tabSuggestions]);
  
  // Render a single line
  const renderLine = (line: TerminalLine) => {
    const baseClasses = 'whitespace-pre-wrap break-words font-mono';
    
    switch (line.type) {
      case 'input':
        return (
          <div key={line.id} className={`${baseClasses} terminal-text`}>
            <span className="terminal-prompt">{line.prompt} </span>
            <span>{line.content}</span>
          </div>
        );
      case 'error':
        return (
          <div key={line.id} className={`${baseClasses} terminal-error`}>
            {line.content}
          </div>
        );
      case 'success':
        return (
          <div key={line.id} className={`${baseClasses} terminal-success`}>
            {line.content}
          </div>
        );
      case 'warning':
        return (
          <div key={line.id} className={`${baseClasses} terminal-warning`}>
            {line.content}
          </div>
        );
      case 'info':
        return (
          <div key={line.id} className={`${baseClasses} ${line.id === 'logo' ? 'ascii-art' : 'terminal-info'}`}>
            {line.content}
          </div>
        );
      default:
        return (
          <div key={line.id} className={`${baseClasses} terminal-text`}>
            {line.content}
          </div>
        );
    }
  };
  
  if (isBooting) {
    return (
      <div className="terminal-container flex items-center justify-center">
        <div className="crt-overlay" />
        <div className="crt-glow" />
        <div className="ascii-art text-2xl animate-pulse">Booting cos α...</div>
      </div>
    );
  }

  // Render editor if open
  if (editorState.isOpen) {
    if (editorState.editor === 'vim') {
      return (
        <VimEditor
          filename={editorState.filename}
          initialContent={editorState.content}
          onSave={handleEditorSave}
          onExit={handleEditorExit}
        />
      );
    }
    return (
      <NanoEditor
        filename={editorState.filename}
        initialContent={editorState.content}
        onSave={handleEditorSave}
        onExit={handleEditorExit}
      />
    );
  }
  
  return (
    <div 
      className="terminal-container flex flex-col cursor-text"
      onClick={handleTerminalClick}
    >
      <div className="crt-overlay" />
      <div className="crt-glow" />
      
      {/* Terminal output area */}
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 md:p-6"
      >
        <div className="max-w-4xl mx-auto space-y-1">
          {lines.map(renderLine)}
        </div>
      </div>
      
      {/* Input area */}
      <div className="sticky bottom-0 p-4 md:p-6 bg-gradient-to-t from-background via-background to-transparent">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 terminal-text">
            <span className="terminal-prompt whitespace-nowrap">
              {getPrompt()}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-foreground font-mono caret-primary"
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
            <span className="cursor-blink text-primary">█</span>
          </div>
        </form>
      </div>
    </div>
  );
};
