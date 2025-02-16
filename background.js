chrome.runtime.onInstalled.addListener(() => {
    console.log("Job Description Parser extension installed.");
});

// Listener for popup requests
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "extractJobDescription") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript(
                {
                    target: { tabId: tabs[0].id },
                    function: extractJobDescription
                },
                (results) => {
                    if (results && results[0] && results[0].result) {
                        sendResponse({ jobDescription: results[0].result });
                    } else {
                        sendResponse({ jobDescription: "No job description found." });
                    }
                }
            );
        });

        // Required for async response
        return true;
    }
});
