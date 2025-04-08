# Contributing to Emotion Graph

First off, thank you for considering contributing to Emotion Graph! It's people like you that make Emotion Graph such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* Use a clear and descriptive title
* Describe the exact steps which reproduce the problem
* Provide specific examples to demonstrate the steps
* Describe the behavior you observed after following the steps
* Explain which behavior you expected to see instead and why
* Include screenshots if possible
* Include your environment details (OS, browser version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* Use a clear and descriptive title
* Provide a step-by-step description of the suggested enhancement
* Provide specific examples to demonstrate the steps
* Describe the current behavior and explain which behavior you expected to see instead
* Explain why this enhancement would be useful
* List some other tools or applications where this enhancement exists

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Include screenshots and animated GIFs in your pull request whenever possible
* Follow the JavaScript styleguide
* Include thoughtfully-worded, well-structured tests
* Document new code
* End all files with a newline

## Development Process

1. Fork the repo and create your branch from `main`
2. Run `npm install` to install dependencies
3. Make your changes
4. Run tests with `npm test`
5. Ensure the code lints with `npm run lint`
6. Submit your pull request

### JavaScript Styleguide

* Use 2 spaces for indentation
* Use semicolons
* Use `const` for all declarations; avoid `var`
* Use template literals instead of string concatenation
* Use meaningful variable names
* Add comments for complex logic
* Follow ESLint rules

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Consider starting the commit message with an applicable emoji:
    * 🎨 `:art:` when improving the format/structure of the code
    * 🐎 `:racehorse:` when improving performance
    * 📝 `:memo:` when writing docs
    * 🐛 `:bug:` when fixing a bug
    * 🔥 `:fire:` when removing code or files
    * ✅ `:white_check_mark:` when adding tests
    * 🔒 `:lock:` when dealing with security

## Setting Up Your Development Environment

1. Install Node.js (version 14 or higher)
2. Clone the repository
3. Run `npm install` to install dependencies
4. Run `npm run build` to build the project
5. Run `npm test` to run tests
6. Run `npm start` to start the development server

### Project Structure

```
emotion-graph/
├── src/                # Source code
│   ├── index.js       # Main entry point
│   ├── EmotionGraph.js # Main component
│   └── EmojiService.js # Emoji handling service
├── dist/              # Compiled files
├── examples/          # Example implementations
├── test/             # Test files
└── docs/             # Documentation
```

## Testing

* Write test cases for any new functionality
* Ensure all tests pass before submitting a pull request
* Follow the existing test patterns
* Include both unit tests and integration tests where appropriate

## Documentation

* Update the README.md with details of changes to the interface
* Update the API documentation for any modified functions
* Add JSDoc comments for new functions
* Include code examples for new features

## Questions?

Feel free to open an issue with your question or join our [Discord community](https://discord.gg/your-server).

Thank you for contributing! 🎉 