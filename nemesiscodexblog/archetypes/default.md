<!-- File: archetypes/default.md -->
<!-- SEO: SEO-friendly frontmatter template for new posts -->
+++
date = '{{ .Date }}'
draft = true
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
description = '' # SEO: Brief description for meta tags and Open Graph (150-160 chars recommended)
author = '' # SEO: Override site author if different (defaults to site params.author)

# SEO: Cover image for Open Graph and post header (recommended: 1200x630px)
cover = ''

# SEO: Alternative to cover - array of images for Open Graph
# images = ['path/to/image.jpg']

# SEO: Caption for cover image
coverCaption = ''

# SEO: Tags for categorization and keywords (comma-separated in TOML array)
tags = []

# SEO: Categories for better organization
categories = []

# SEO: Table of contents (set to true for long posts)
toc = false
+++