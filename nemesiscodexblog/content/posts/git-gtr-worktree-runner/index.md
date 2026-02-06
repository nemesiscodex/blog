---
title: "A Better Way to Run Git Worktrees Finally!"
slug: "git-gtr-worktree-runner"
description: "A pragmatic walkthrough of git-gtr, a CLI from CodeRabbit that makes Git worktrees practical for daily development with editor and AI integrations."
date: 2026-02-05T12:00:00-03:00
draft: true
toc: true
images: ["https://img.youtube.com/vi/r9uGLZ3AkWo/maxresdefault.jpg"]
tags:
  - git
  - worktrees
  - cli
  - ai
  - developer-tools
---

Git worktrees are one of the most underrated features in Git. They solve a real problem, but the workflow is usually too manual to use every day.

In this post, I will show you how I use `git-gtr` from CodeRabbit to make worktrees fast, practical, and AI-friendly.

**>>>> [{{< github-icon >}} Repository](https://github.com/coderabbitai/git-worktree-runner) | [{{< youtube-icon >}} Watch Video](https://www.youtube.com/watch?v=r9uGLZ3AkWo) <<<<**

---

## TL;DR

**If you remember one thing from this post: native Git worktrees are powerful, and `git-gtr` removes the friction that stops most people from using them.**

1. **Avoid constant branch switching** Use separate worktrees for separate tasks, without repeated stash and restore steps.
2. **Automate setup** Copy env/config files and run setup hooks when a worktree is created.
3. **Scale parallel work** Open editor and AI sessions per branch with simple commands.

**The 5-command workflow:**

1. `gw new <branch-name>`
2. `gw editor <branch-name>`
3. `gw ai <branch-name>`
4. `gw run <branch-name> <command>`
5. `gw rm <branch-name>`

## The Problem

Normally, you work on one branch at a time. Then priorities change. You are deep in a feature, and suddenly you need to fix production, review a PR, or test another idea.

What happens next? Usually this:

1. Stash changes
2. Switch branch
3. Do the urgent work
4. Switch back
5. Restore stash and recover context

It works, but it is expensive when repeated daily.

Yes, you can clone the repository again into another folder. But that duplicates everything and turns into workspace clutter.

Git already has the right primitive: `git worktree`. The issue is developer experience. For many teams it still feels manual, fragile, and easy to get wrong.

## The Solution

`git-gtr` wraps native Git worktree commands and adds quality-of-life features that make the workflow practical.

Here is what it adds:

- A simpler CLI focused on daily usage
- Editor integration (for example Cursor, VS Code)
- AI CLI integration (for example Codex, Claude)
- Copy rules for env files and directories
- Hooks for setup and teardown actions
- Shell completion and cross-platform support

This is not a replacement for Git knowledge. It is an accelerator on top of native capabilities.

## How to Use It

Let me show you the exact flow.

### 1) Install and create a short alias

Installation can change over time, so always check the repository README first.  
At the time of writing, this works:

```bash
git clone https://github.com/coderabbitai/git-worktree-runner.git
cd git-worktree-runner
./install.sh
```

Then add an alias so commands are quick to type:

```bash
alias gw="git gtr"
```

Now `gw` runs the same command as `git gtr`.

### 2) Configure once, then reuse everywhere

Configuration is very similar to `git config`. You can define values globally, locally per repository, and keep project-specific defaults in a `.gtrconfig` file.

Run:

```bash
gw config
```

A simple example in `.gtrconfig`:

```ini
[copy]
    include = **/.env.local
    exclude = **/.env

[copy]
    includeDirs = node_modules
    excludeDirs = node_modules/.cache

[hooks]
    postCreate = bun install

[defaults]
    editor = cursor
    ai = codex
```

This lets each new worktree copy your local env file and dependencies, run `bun install` after creation, and default to Cursor plus Codex.

### 3) Create isolated worktrees for each feature

```bash
gw new landing-page
gw new auth
```

By default, this creates a `<repo>-worktrees` folder and one directory per branch. Each worktree has isolated files while sharing Git object storage efficiently.

### 4) Jump directly into editor or AI session

```bash
gw editor landing-page
gw ai landing-page
```

You can open another terminal and do the same for `auth`. That is where worktrees shine, true parallel development without context loss.

### 5) Run commands in a target worktree and clean up

```bash
gw run landing-page "bun run dev"
gw rm auth
```

Use `run` for commands scoped to one worktree and `rm` when you are done.

## Tradeoffs

No tool is free. Here are the tradeoffs.

**Pros**

- Faster context switching
- Cleaner parallel feature development
- Less repository duplication compared with cloning one repo per task
- Better fit for editor and AI-assisted workflows

**Cons**

- More folders on disk
- Requires initial config discipline
- Can accumulate stale worktrees if you do not clean up
- Teams still need baseline understanding of native `git worktree`

## Best Practices

If you want this to stay smooth, follow a few rules:

1. **Use explicit branch names** `feature/landing-page`, `fix/auth-timeout`, and similar names reduce confusion.
2. **Keep hooks idempotent** Re-running setup should not break anything.
3. **Copy only what is needed** Bring env files and selected folders, avoid copying unnecessary large artifacts.
4. **Clean worktrees aggressively** Remove finished branches to keep your workspace healthy.
5. **Know the native fallback** If automation fails, you should still be comfortable with `git worktree` basics.

> **Important:** This is not a replacement for Git fundamentals. It is a practical layer that helps you execute the same workflow with less friction.

## Watch the Demo

Here is the full video walkthrough:

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;">
  <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/r9uGLZ3AkWo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Conclusion

`git-gtr` makes a strong case for using worktrees as a default workflow, not as an occasional workaround.

If you are juggling multiple branches, reviews, and AI sessions, this setup can save real time every week. Try it on one project first, then decide if it should become your team standard.

Would you use `git-gtr`, or do you prefer the native `git worktree` commands? Let me know.
