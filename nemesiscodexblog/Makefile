.PHONY: dev serve build prod help

# Default target
help:
	@echo "Available targets:"
	@echo "  make dev   - Start development server with drafts (http://localhost:1313)"
	@echo "  make serve - Alias for dev"
	@echo "  make build - Build production site (minified, cleaned)"
	@echo "  make prod  - Alias for build"

# Development server with drafts enabled
dev:
	hugo server -D

# Alias for dev
serve: dev

# Production build: clean unused resources and minify
build:
	hugo --gc --minify

# Alias for build
prod: build

