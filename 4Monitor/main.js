document.addEventListener("DOMContentLoaded", function() {
    
    const webView = document.getElementById('webview');
    const urlInput = document.getElementById('url-input');
    const loadButton = document.getElementById('load-button');
    const backButton = document.getElementById('back-button');
    const forwardButton = document.getElementById('forward-button');
    const reloadButton = document.getElementById('reload-button');
    const homeButton = document.getElementById('home-button');
    
    let historyStack = [];
    let currentIndex = -1;

    function ensureHttpPrefix(url) {
        if (!/^https?:\/\//i.test(url)) {
            return 'https://' + url;
        }
        return url;
    }

    function updateUrlInBar(url) {
        urlInput.value = url;
    }

    function loadUrl(url) {
        const fullUrl = ensureHttpPrefix(url);
        webView.src = fullUrl;
        console.log('Navigating to:', fullUrl);
    }

    function navigateBack() {
        if (currentIndex > 0) {
            currentIndex--;
            loadUrl(historyStack[currentIndex]);
        }
    }

    function navigateForward() {
        if (currentIndex < historyStack.length - 1) {
            currentIndex++;
            loadUrl(historyStack[currentIndex]);
        }
    }

    function reloadPage() {
        const currentUrl = webView.src;
        webView.src = 'about:blank'; // Navigate to a blank page to clear WebView state
        setTimeout(() => {
            webView.src = currentUrl; // After a short delay, set the URL back to trigger a reload
        }, 100); // A delay of 100 milliseconds
    }
    
    
    
    loadButton.addEventListener('click', () => {
        loadUrl(urlInput.value);
    });

    backButton.addEventListener('click', navigateBack);
    forwardButton.addEventListener('click', navigateForward);
    reloadButton.addEventListener('click', reloadPage);
    homeButton.addEventListener('click', () => loadUrl('https://www.google.com'));

    urlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loadUrl(urlInput.value);
            e.preventDefault();
        }
    });
    
    webView.addEventListener('loadstop', (e) => {
        const currentUrl = e.url;
        updateUrlInBar(currentUrl);

        if (!historyStack.includes(currentUrl)) {
            historyStack = historyStack.slice(0, currentIndex + 1);
            historyStack.push(currentUrl);
            currentIndex = historyStack.length - 1;
        }
    });

    // Load the home page on startup
    loadUrl('https://www.twitter.com/4rcane');
});
