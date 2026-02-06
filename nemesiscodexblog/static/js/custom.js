document.addEventListener("DOMContentLoaded", () => {
  const firstParagraph = document.querySelector(".post-content > p:first-of-type");

  if (!firstParagraph || firstParagraph.querySelector(".first-word")) {
    return;
  }

  const walker = document.createTreeWalker(firstParagraph, NodeFilter.SHOW_TEXT);
  let textNode = null;

  while (walker.nextNode()) {
    const current = walker.currentNode;
    if (current.nodeValue && current.nodeValue.trim().length > 0) {
      textNode = current;
      break;
    }
  }

  if (!textNode) {
    return;
  }

  const match = textNode.nodeValue.match(/^(\s*)(\S+)([\s\S]*)$/);
  if (!match) {
    return;
  }

  const [, leading, word, rest] = match;
  const fragment = document.createDocumentFragment();

  if (leading) {
    fragment.appendChild(document.createTextNode(leading));
  }

  const span = document.createElement("span");
  span.className = "first-word";
  span.textContent = word;
  fragment.appendChild(span);

  if (rest) {
    fragment.appendChild(document.createTextNode(rest));
  }

  textNode.parentNode.replaceChild(fragment, textNode);
});
