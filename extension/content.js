(function () {
  function closestMailtoLink(target) {
    if (!target || typeof target.closest !== "function") return null;
    return target.closest('a[href^="mailto:"], a[href^="MAILTO:"]');
  }

  function handleMailtoClick(event) {
    if (event.defaultPrevented) return;

    const link = closestMailtoLink(event.target);
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href || !href.toLowerCase().startsWith("mailto:")) return;

    event.preventDefault();
    event.stopPropagation();

    browser.runtime.sendMessage({
      type: "mailto-click",
      href
    }).catch((error) => {
      console.error("mailto->gmail message failed", error);
    });
  }

  document.addEventListener("click", handleMailtoClick, true);
})();
