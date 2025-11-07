# Release Workflow Guide

## Overview

This project now uses a **version-first release workflow** where `package.json` is the single source of truth for versioning.

## Recommended Release Process

### 1. Standard Release (Recommended)

```bash
# 1. Create a feature/release branch
git checkout -b release/v2.0.9

# 2. Make your changes and bump version in package.json
npm version patch  # 1.0.0 -> 1.0.1
# or
npm version minor  # 1.0.0 -> 1.1.0
# or
npm version major  # 1.0.0 -> 2.0.0
# or manually edit package.json

# 3. Commit the version change
git add package.json
git commit -m "chore: bump version to 2.0.9"

# 4. Push and create PR
git push origin release/v2.0.9
# Create PR on GitHub

# 5. After PR is approved and merged to master
# The workflow will automatically:
# - Detect the version change in package.json
# - Create a git tag (v2.0.9)
# - Trigger the build workflow
# - Create a GitHub release with all artifacts
```

### 2. Quick Release (Direct to master)

```bash
# 1. Bump version
npm version patch  # or minor/major

# 2. Push to master
git push origin master

# The auto-tag workflow will:
# - Detect version change
# - Create tag automatically
# - Trigger build and release
```

## What Happens Automatically

### When you merge/push version changes to master:

1. **Auto Tag Workflow** (`tag-release.yml`) triggers:
   - Detects `package.json` version changed
   - Creates a git tag (e.g., `v2.0.9`)
   - Pushes the tag to GitHub

2. **Build Workflow** (`build.yml`) triggers on new tag:
   - Builds artifacts for all platforms
   - Creates pre-release
   - Creates official release with artifacts

## Workflow Files

### `tag-release.yml` (NEW)

- Triggers on push to master/main when `package.json` changes
- Automatically creates version tags
- Prevents duplicate tags

### `build.yml` (UPDATED)

- Triggers on tag pushes (v\*)
- Builds all platform artifacts
- Creates releases
- Removed manual version updating (no longer needed)

## Manual Override (Emergency)

If you need to manually trigger a build, you can still:

```bash
# Create and push a tag manually
git tag v2.0.9
git push origin v2.0.9
```

But this is NOT recommended as it creates version mismatch with package.json.

## Pre-releases and Beta Versions

For pre-releases, use npm version with prerelease identifiers:

```bash
npm version prerelease --preid=beta  # 2.0.9 -> 2.0.10-beta.0
npm version prerelease               # 2.0.10-beta.0 -> 2.0.10-beta.1
```

## Benefits of This Approach

✅ Single source of truth (package.json)
✅ No manual tagging needed
✅ Works with standard PR workflow
✅ Prevents version/tag mismatch
✅ Automatic CI/CD on merge
✅ Clear version history in git

## Troubleshooting

**Q: Tag not created after merge?**

- Check that package.json version actually changed
- Check workflow run in Actions tab

**Q: Want to skip auto-tagging?**

- Don't change package.json version in your commit
- Or modify tag-release.yml to add skip conditions

**Q: Made a mistake with version?**

- Delete the tag: `git tag -d v2.0.9 && git push origin :refs/tags/v2.0.9`
- Fix package.json and push again
