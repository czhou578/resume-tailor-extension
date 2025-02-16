function extractJobDescription() {
    // Try common job board selectors (LinkedIn, Indeed, etc.)
    const selectors = [
        'div.jobsearch-JobComponent',    // Indeed
        'div.show-more-less-html__markup', // LinkedIn
        'div.jobs-box__html-content',   // Generic
        'div.description__text'         // Glassdoor
    ];
    
    for (const selector of selectors) {
        const jobElement = document.querySelector(selector);
        if (jobElement) {
            return jobElement.innerText.trim();
        }
    }
    
    return "Job description not found.";
}

// Send job description to the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getJobDescription") {
        const jobDescription = extractJobDescription();
        sendResponse({ jobDescription });
    }
});
