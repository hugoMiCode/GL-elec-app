// Function to navigate between pages
function navigateTo(page) {
    window.location.href = page;
}

// Example API call (just a simple console log for now)
function makeApiCall() {
    console.log("Simulating an API call...");

    // Simulating an API response after 1 second
    setTimeout(() => {
        console.log("API response received: { success: true, message: 'API call successful' }");
    }, 1000);
}

// Call the function to simulate the API call on load
makeApiCall();
