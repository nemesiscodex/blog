# Repository Guidelines

## Project Structure & Module Organization
- Root Hugo site lives in `nemesiscodexblog/`.
- Key folders: `content/` (Markdown posts), `layouts/` (templates/partials), `assets/` (images, pipeline assets), `static/` (served as-is), `themes/` (theme), `public/` (generated site), `archetypes/` (content blueprints), `resources/` (Hugo cache/output).
- Posts live under `content/posts/<slug>/index.md`. Prefer kebab-case directory names, e.g., `content/posts/reliable-api-calls/index.md`.

## Build, Test, and Development Commands
- `hugo server -D`: Run local dev server with drafts at http://localhost:1313.
- `hugo`: Build production site into `public/`.
- `hugo --gc --minify`: Clean unused resources and emit a minified build.
- `hugo --printI18nWarnings --warnUnusedTemplates`: Surface template/i18n issues.
- Create a new post: `hugo new posts/my-new-post/index.md` (then edit front matter and content).

## Coding Style & Naming Conventions
- Content: Markdown with YAML front matter. Required keys: `title`, `draft`, optional: `tags`, `categories`, `slug`.
- Slugs: use kebab-case (`my-new-post`).
- Templates: Go templates in `layouts/`; keep two-space indentation and small, composable partials in `layouts/partials/`.
- Assets: store post-specific images under `assets/images/<slug>/`; reference with Markdown (`![Alt text](/images/...)`) or shortcodes when appropriate.
- **Punctuation:** Avoid using `—` (em dash). Use `;`, `,`, or `.` instead.
- **Reusable SVG Icons:** GitHub and YouTube icon SVGs are available as shortcodes in `layouts/shortcodes/`:
  - `{{< github-icon >}}` - GitHub icon (default 16x16, accepts `width` and `height` params)
  - `{{< youtube-icon >}}` - YouTube icon (default 16x16, accepts `width` and `height` params)
  - Example: `[{{< github-icon >}} Get it on GitHub](https://github.com/user/repo)`

## Testing Guidelines
- No unit tests; validate by building locally: `hugo --gc --minify`.
- Draft workflow: keep `draft: true` while writing; switch to `false` before publishing.
- Check for console warnings during build and fix broken links/images.
- Avoid editing `public/` directly; it is generated.

## Commit & Pull Request Guidelines
- Commit messages: use Conventional Commit style where practical (`feat:`, `fix:`, `docs:`, `chore:`). Subject ≤ 72 chars, imperative mood.
- PRs should include: concise description, screenshots for visual changes, linked issues, and a note confirming `hugo --gc --minify` succeeds locally.
- Keep changes focused; one logical change per PR.

## Security & Configuration Tips
- Do not commit secrets. Public analytics IDs in `hugo.toml` are fine; avoid adding private tokens.
- Verify `baseURL` in `hugo.toml` for deploys; override via CLI for local testing if needed.
