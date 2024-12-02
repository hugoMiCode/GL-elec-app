document.addEventListener("DOMContentLoaded", () => {
    const apiResponseDiv = document.getElementById("apiResponse");

    const displayResponse = (data) => {
        apiResponseDiv.textContent = JSON.stringify(data, null, 2);
    };

    document.getElementById("fetchData").addEventListener("click", async () => {
        const response = await fetch("/api/data");
        const data = await response.json();
        displayResponse(data);
    });

    document.getElementById("sendEcho").addEventListener("click", async () => {
        const response = await fetch("/api/echo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: "Bonjour depuis le frontend !" })
        });
        const data = await response.json();
        displayResponse(data);
    });

    document.getElementById("addNumbers").addEventListener("click", async () => {
        const response = await fetch("/api/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ num1: 5, num2: 7 })
        });
        const data = await response.json();
        displayResponse(data);
    });
});
