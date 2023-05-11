/**
 * Get the favicon from current tab.
 */
export function getFavicon() {
  try {
    return document.querySelector("link[rel*='icon']")["href"];
  } catch (err) {
    return null;
  }
}
