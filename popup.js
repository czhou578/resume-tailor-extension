document.getElementById("fetchJob").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript(
            {
                target: { tabId: tabs[0].id },
                function: () => {
                    return extractJobDescription();
                }
            },
            (results) => {
                if (results && results[0] && results[0].result) {
                    document.getElementById("jobDescription").value = results[0].result;
                } else {
                    document.getElementById("jobDescription").value = "No job description found.";
                }
            }
        );
    });
});
