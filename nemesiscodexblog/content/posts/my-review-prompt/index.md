---
title: "Turn Your AI IDE Into a Relentless Code Reviewer"
slug: "my-review-prompt"
description: "A 10-step prompt that transforms any agentic IDE into a comprehensive code reviewer, helping you catch bugs, code smells, and edge cases before they reach production."
date: 2025-12-07T23:35:00-03:00
draft: false
toc: true
images: ["https://img.youtube.com/vi/lxDpAMaVDeY/maxresdefault.jpg"]
tags:
  - code-review
  - prompts
  - ai
  - cursor
---

Nine months ago, I was a bottleneck; every code review went through me, and I was slowing my team down. When AI tools started becoming genuinely useful, I built a prompt to relieve that bottleneck: a 10-step process that turns any agentic IDE into a relentless code reviewer.

> **Important:** This prompt does not replace human code review. Think of it as having someone else do the first pass; it gives you an overview, catches obvious issues, and surfaces potential problems. You should still do proper code review yourself. Use it to make reviews more efficient, not as a substitute for your judgment.

## TL;DR

A 10-step prompt that turns any agentic IDE into a comprehensive code reviewer. It analyzes git diffs, finds bugs, suggests alternatives, and provides actionable feedback with certainty scores.

**>>>> [{{< github-icon >}} Get it on GitHub](https://github.com/nemesiscodex/prompts) | [{{< youtube-icon >}} Watch Demo](https://youtu.be/lxDpAMaVDeY) <<<<**

---

## The Problem

Code reviews are critical, but they are also time-consuming. When you are the go-to person for reviews, you become a bottleneck. Your team waits on you, and you spend hours reviewing code instead of building features.

The solution is to let AI do the heavy lifting. But generic AI prompts are not enough. You need a structured, systematic approach that actually catches real issues.

## The Solution: A 10-Step Review Process

This prompt transforms your IDE into a comprehensive code reviewer through a structured 10-step process:

1. **Check available tools**  
   Identifies what git and analysis tools are available.

2. **Understand context**  
   Analyzes the git diff and commit messages.

3. **Call provided tools**  
   Runs linters, tests, or other tools you specify.

4. **Identify main goal**  
   Determines what the PR is trying to achieve.

5. **Evaluate alternatives**  
   Suggests alternative approaches with pros and cons plus certainty scores.

6. **Find bugs**  
   Performs line-by-line analysis for bugs and weirdness.

7. **Identify code smells**  
   Detects patterns that might cause problems later.

8. **Assess readability**  
   Evaluates code clarity and maintainability.

9. **Check test coverage**  
   Lists test cases you should cover.

10. **Final rating**  
    Provides an overall quality score and merge recommendation.

The prompt does not just say "looks good"; it gives you certainty scores, prioritizes issues (high vs. medium priority), and provides actionable feedback.

## How to Use It in Cursor

Setting it up is simple:

1. Go to **Cursor Settings → Rules and commands**.
2. Scroll down to add a new command (you can do this globally or per project).
3. Give it a name (for example, `review`).
4. Paste the content from the [review markdown file](https://github.com/nemesiscodex/prompts/tree/main/review).
5. Save it.

Now you can use it by pressing `/` in Cursor and selecting your review command. You can provide additional instructions like:

- "Review against the master branch as the base branch"
- "Make sure to use the full diff"
- "Run the linter and test suite"

Then pick your model and let it run. The prompt works well with:

- **Opus 4.5**: Great for complex PRs
- **GPT-5.1**: Also gives good results
- **Composer**: Good for straightforward changes
- **Gemini 3**: Can be a bit verbose, but worth trying

## What Makes It Different

Most AI code reviewers are generic. They might catch obvious bugs, but they do not provide the depth you need. This prompt:

- **Provides certainty scores**: It tells you how confident it is in its findings.
- **Suggests alternatives**: Not just "this is wrong," but "here are better approaches and why."
- **Prioritizes issues**: High priority vs. medium priority, so you know what to fix first.
- **Thinks about edge cases**: Suggests test cases you might have missed.
- **Gives context-specific feedback**: Considers performance, security, and UI concerns.

In the video demo, it caught multiple issues in a simple PR: missing timeouts, duplicate argument parsing, potential file corruption handling, missing string validation, and hardcoded values. These are not theoretical concerns; they are real bugs that could cause problems in production.

## How It Complements Existing Tools

This prompt is not meant to replace existing code review tools like Coderabbit, GitHub Copilot, or other automated reviewers. Instead, it is a companion that works alongside them.

**Existing tools** (like Coderabbit) are great for:

- Automated checks on every PR
- Integration with your CI/CD pipeline
- Consistent rule enforcement across the team
- Catching common patterns and security issues

**This prompt** complements them by:

- Providing deep, contextual analysis when you need it
- Working directly in your IDE during development
- Giving you control over when and how to use it
- Offering detailed explanations and alternative approaches

My team uses Coderabbit for automated reviews on every PR, and I use this prompt for deeper analysis when I need it. They work together; Coderabbit catches the obvious issues automatically, and this prompt helps me understand the bigger picture and think through edge cases.

## Try It Yourself

The repository is public and includes:

- The review prompt markdown file
- Instructions for setting it up in Cursor
- Usage examples

**>>>> [{{< github-icon >}} github.com/nemesiscodex/prompts](https://github.com/nemesiscodex/prompts) <<<<**

If you find it useful, please star the repository. And if you want to see more content like this, subscribe to my [YouTube channel](https://www.youtube.com/@nemesiscodex). This is actually my first video on the channel, so your support means a lot.

## Watch the Demo

Here is a walkthrough showing the prompt in action:

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;">
  <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/lxDpAMaVDeY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

The video shows a real review of a CLI feature that checks for new versions. Even though the change was straightforward, the prompt found several issues worth addressing before merging.

## Final Thoughts

This prompt has been a game-changer for me. It is not about replacing human reviewers; it is about making the review process more efficient and thorough. By catching issues early and providing structured feedback, it helps teams ship better code faster.

Remember: always do your own code review. This prompt is like having a colleague do a first pass and give you a detailed overview, but the final responsibility for code quality and correctness is yours. Use it to enhance your review process, not replace it.

If you try it out, let me know what you think. And if you have suggestions for improvements, feel free to open an issue or PR on the repository.