const searchInput = document.querySelector("#article-search");

if (searchInput) {
  const articles = [...document.querySelectorAll("#article-list .post-row")];
  const count = document.querySelector("[data-search-count]");
  const empty = document.querySelector("[data-search-empty]");

  function filterArticles() {
    const words = searchInput.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    let matches = 0;
    for (const article of articles) {
      const visible = words.every((word) => article.dataset.search.includes(word));
      article.hidden = !visible;
      if (visible) matches += 1;
    }
    count.textContent = matches + (matches === 1 ? " article" : " articles");
    empty.hidden = matches !== 0;
  }

  document.querySelector("[data-search-controls]").hidden = false;
  searchInput.addEventListener("input", filterArticles);
  document.querySelector("[data-search-clear]").addEventListener("click", () => {
    searchInput.value = "";
    filterArticles();
    searchInput.focus();
  });
  window.addEventListener("pageshow", filterArticles);
  filterArticles();
}

if (navigator.clipboard && window.isSecureContext) {
  const status = document.createElement("span");
  status.className = "visually-hidden";
  status.setAttribute("role", "status");
  document.body.append(status);

  function attachCopy(button, getText, successMessage) {
    let reset;
    const label = button.textContent;
    button.addEventListener("click", async () => {
      clearTimeout(reset);
      try {
        await navigator.clipboard.writeText(getText());
        button.textContent = "Copied!";
        status.textContent = successMessage;
      } catch {
        button.textContent = "Try again";
        status.textContent = "Could not copy. Select and copy the text manually.";
      }
      reset = setTimeout(() => {
        button.textContent = label;
        status.textContent = "";
      }, 2500);
    });
  }

  document.querySelectorAll(".highlight").forEach((block) => {
    const code = block.querySelector("pre code");
    if (!code) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "copy-code";
    button.textContent = "Copy";
    button.setAttribute("aria-label", "Copy code");
    block.append(button);
    attachCopy(button, () => code.textContent, "Code copied to clipboard.");
  });

  const linkButton = document.querySelector("[data-copy-link]");
  if (linkButton) {
    linkButton.hidden = false;
    attachCopy(linkButton,
      () => document.querySelector('link[rel="canonical"]')?.href || location.href,
      "Article link copied to clipboard.");
  }
}
