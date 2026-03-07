# Sparkle - Hanabi Dayo

<h3 align="center">yet Another <a href="https://github.com/MetaCubeX/mihomo">Mihomo</a> GUI</h3>


## Features

- [x] Out-of-the-box Tun mode without service mode requirement
- [x] Multiple color themes available with refreshed UI
- [x] Support for most common Mihomo configuration modifications
- [x] Built-in stable and preview Mihomo cores
- [x] One-click backup and restore configurations via WebDAV
- [x] Powerful override functionality for arbitrary configuration file modifications


## Development

This project is for personal use, and most pull requests may not be merged. You can fork and modify it yourself.

### Requirements

- **Node.js**: >= 20.0.0 (LTS version recommended)
- **pnpm**: >= 9.0.0 (required)
- **Git**: Latest version

### Technology Stack

Sparkle is built with Electron + React + TypeScript

#### Frontend Stack

- **React 19** - User interface framework
- **TypeScript** - Type-safe JavaScript
- **HeroUI (NextUI)** - UI component library
- **Tailwind CSS** - Atomic CSS framework
- **Monaco Editor** - Code editor

#### Backend Stack

- **Electron** - Application main process
- **Mihomo Core** - Proxy kernel
- **sysproxy-go** - System proxy integration

### Quick Start

1. **Clone the project**

```bash
git clone https://github.com/mc256/hanabi-dayo.git
cd sparkle
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Handle Electron installation issues** (if `pnpm dev` and other commands fail to run)

```bash
# If Electron is not properly installed, run the following commands
cd node_modules/electron
node install.js
cd ../..
```

4. **Start development server**

```bash
pnpm dev
```

### Notes

On Windows development, you may encounter white screen issues. Disable Tun (virtual network adapter) to resolve this.

### Project Structure

```
sparkle/
├── src/
│   ├── main/               # Electron main process
│   │   ├── core/           # Core management
│   │   ├── config/         # Configuration management
│   │   ├── resolve/        # Resolvers
│   │   ├── sys/            # System integration
│   │   └── utils/          # Utility functions
│   ├── renderer/           # Electron renderer process (frontend UI)
│   │   ├── src/
│   │   │   ├── assets/     # Static assets
│   │   │   ├── components/ # React components
│   │   │   ├── pages/      # Page components
│   │   │   ├── hooks/      # Custom hooks
│   │   │   ├── routes/     # Route configuration
│   │   │   └── utils/      # Frontend utilities
│   │   └── index.html      # Renderer process entry HTML
│   ├── preload/            # Electron preload scripts (IPC bridge)
│   │   ├── index.ts        # Main preload script
│   │   └── index.d.ts      # Preload script type definitions
│   └── shared/             # Shared resources
│       └── types           # Global type definitions
├── resources/              # Application resource files
├── build/                  # Build configuration
├── extra/                  # Additional resources
├── dist/                   # Build output directory
├── electron-builder.yml    # Packaging configuration
├── package.json            # Project configuration
└── README.md               # Project documentation
```

### Available Scripts

#### Development Commands

- `pnpm dev` - Start development server (frontend hot reload, backend requires manual restart)
- `pnpm typecheck` - TypeScript type checking
- `pnpm typecheck:node` - Main process type checking
- `pnpm typecheck:web` - Renderer process type checking
- `pnpm lint` - Run code linting
- `pnpm format` - Format code

#### Build Commands

- `pnpm build:win` - Build Windows version
- `pnpm build:mac` - Build macOS version
- `pnpm build:linux` - Build Linux version

#### Other Commands

- `pnpm prepare` - Prepare build environment
- `pnpm postinstall` - Install Electron dependencies

### Build & Release

#### Environment Setup

Prepare the appropriate build environment for your target platform:

**Windows Build:**

```bash
pnpm build:win
```

**macOS Build:**

```bash
pnpm build:mac
```

**Linux Build:**

```bash
pnpm build:linux
```

**Specify Architecture:**

```bash
pnpm build:win --x64/--arm64
pnpm build:mac --arm64/--x64
pnpm build:linux --x64/--arm64
```

**Specify Output Type:**

```bash
pnpm build:win 7z/nsis
pnpm build:linux deb/rpm/pacman
pnpm build:mac pkg/dmg
```

**Specify Architecture and Output Type:**

```bash
pnpm build:win 7z --x64
pnpm build:mac pkg --arm64
pnpm build:linux deb --x64
```

#### Build Artifacts

- **Windows**: `.exe` installer and `.7z` portable version
- **macOS**: `.pkg` installer
- **Linux**: `.deb`, `.rpm`, `.pkg.tar.xz(pacman)` formats

### Common Issues

#### Package Manager Requirements

This project uses pnpm as the package manager.

Ensure you're using pnpm 9.0.0 or higher:

```bash
pnpm --version
```

#### Node.js Version Requirements

Ensure you're using Node.js 20.0.0 or higher:

```bash
node --version
```

#### Development Environment Issues

- Ensure Node.js version >= 20.0.0
- Use pnpm for dependency management

### Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Create a Pull Request

### Development Notes

- Ensure code passes ESLint checks
- Run `pnpm format` to format code before committing
- Follow existing code style and naming conventions
- Update relevant documentation when adding new features
- Restart development server after modifying main process code
- Renderer process code supports hot reload
- Use pnpm for all commands
- Restart TypeScript service after modifying type definitions
- Restart application after modifying preload scripts
