# Contributing to Student Registry

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Development Setup

1. **Fork and Clone**

   ```bash
   git clone https://github.com/YOUR_USERNAME/student-registry.git
   cd student-registry
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Create a Branch**
   ```bash
   git checkout develop
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running the Project

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Quality

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

### Testing

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## Commit Guidelines

This project follows [Conventional Commits](https://www.conventionalcommits.org/).

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, semicolons, etc.)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **build**: Build system or dependency changes
- **ci**: CI/CD changes
- **chore**: Other changes that don't modify src or test files

### Examples

```bash
feat: add student search functionality
fix(validation): correct email validation regex
docs: update README with new API examples
test: add unit tests for delete operation
```

## Pull Request Process

1. **Update your branch with develop**

   ```bash
   git checkout develop
   git pull origin develop
   git checkout your-branch
   git rebase develop
   ```

2. **Ensure all checks pass**
   - Linting
   - Tests
   - Code formatting

3. **Create Pull Request**
   - Use a clear title following conventional commits
   - Describe your changes in detail
   - Reference any related issues

4. **Code Review**
   - Address review comments
   - Keep the PR focused and small

## Code Style

- Follow the ESLint and Prettier configurations
- Write clear, self-documenting code
- Add comments for complex logic
- Keep functions small and focused

## Questions?

Feel free to open an issue for any questions or discussions!
