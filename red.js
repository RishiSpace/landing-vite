// Run once on page load
if (window.location.hash) {
  // Get the part after the #
  const hashPath = window.location.hash.substr(1);

  // Replace the URL without adding to history (so no page reload)
  window.history.replaceState(null, '', window.location.pathname + hashPath);
}
