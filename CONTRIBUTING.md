# Contributing Guide

Thank you for your interest in contributing to `@hashibutogarasu/common`!

## Commit Message Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for automated versioning and changelog generation.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature (triggers MINOR version bump)
- **fix**: A bug fix (triggers PATCH version bump)
- **perf**: Performance improvement (triggers PATCH version bump)
- **docs**: Documentation only changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring without functionality changes
- **test**: Adding or updating tests
- **build**: Changes to build system or dependencies
- **ci**: Changes to CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files

### Breaking Changes

To trigger a MAJOR version bump, use one of these formats:

1. Add `!` after the type:
   ```
   feat!: remove deprecated API
   ```

2. Add `BREAKING CHANGE:` in the footer:
   ```
   feat: update authentication flow

   BREAKING CHANGE: The authentication API has been completely redesigned.
   Old authentication methods are no longer supported.
   ```

### Examples

#### Feature (MINOR bump: 0.0.6 → 0.1.0)
```
feat: add auth client config interfaces

Add IAuthClientConfig and IAuthConfigBuilder interfaces for
frontend authentication configuration.
```

#### Bug Fix (PATCH bump: 0.0.6 → 0.0.7)
```
fix: correct cookie domain validation

Fix issue where localhost cookie domain was incorrectly validated
in production environment.
```

#### Breaking Change (MAJOR bump: 0.0.6 → 1.0.0)
```
feat!: redesign plugin interface

BREAKING CHANGE: The plugin interface has been redesigned.
All plugins must implement the new IPlugin interface.
Migration guide available in docs/migration.md
```

## Release Process

Releases are automated using [release-please](https://github.com/googleapis/release-please):

1. **Commit your changes** using Conventional Commits format
2. **Push to `main` branch** - release-please will create/update a release PR
3. **Review the release PR** - check version bump and CHANGELOG
4. **Merge the release PR** - GitHub Release and npm publish happen automatically

## Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Make your changes and commit using Conventional Commits
4. Push to your fork and create a pull request
5. Wait for CI checks and review

## Questions?

If you have questions about contributing, please open an issue for discussion.
