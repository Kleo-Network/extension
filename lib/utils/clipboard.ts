export async function clipboardCopy(text: string) {
  // Put the text to copy into a <span>
  const span = document.createElement("span");
  span.textContent = text;

  // Preserve consecutive spaces and newlines
  span.style.whiteSpace = "pre";
  span.style.userSelect = "all";

  // Add the <span> to the page
  document.body.appendChild(span);

  // Make a selection object representing the range of text selected by the user
  const selection = window.getSelection();
  const range = window.document.createRange();
  selection.removeAllRanges();
  range.selectNode(span);
  selection.addRange(range);

  // Copy text to the clipboard
  try {
    window.document.execCommand("copy");
  } finally {
    // Cleanup
    selection.removeAllRanges();
    window.document.body.removeChild(span);
  }
}
