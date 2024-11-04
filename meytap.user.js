// ==UserScript==
// @name        Override User-Agent for Specific JS Pattern
// @namespace   Violentmonkey Scripts
// @version     1.1
// @description Ghi đè navigator.userAgent cho các script có URL chứa "https://tab.mey.network/static"
// @match       *://tab.mey.network/*
// @grant       none
// @run-at      document-start
// ==/UserScript==

(function() {
    const scriptPattern = "https://tab.mey.network/static";
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach((node) => {
                    if (node.tagName === "SCRIPT" && node.src.includes(scriptPattern)) {
                        Object.defineProperty(navigator, 'userAgent', {
                            get: function() {
                                return "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1";
                            },
                            configurable: true
                        });
                        observer.disconnect();
                    }
                });
            }
        });
    });
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
})();
