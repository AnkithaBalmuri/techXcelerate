function uploadMedia() {
    let fileInput = document.getElementById("fileUpload");
    let resultDisplay = document.getElementById("mediaResult");

    if (fileInput.files.length === 0) {
        resultDisplay.innerHTML = "Please select a file.";
        resultDisplay.style.color = "red";
        return;
    }

    let file = fileInput.files[0];
    let formData = new FormData();
    formData.append("media", file);

    fetch("/detect-deepfake", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        resultDisplay.innerHTML = `Result: ${data.result}`;
        resultDisplay.style.color = data.result === "Real" ? "green" : "red";
    })
    .catch(error => {
        resultDisplay.innerHTML = "Error in detection.";
        resultDisplay.style.color = "red";
        console.error("Error:", error);
    });
}

// Detect Fake News
function detectFakeNews() {
    let newsInput = document.getElementById("newsInput").value;
    let resultDisplay = document.getElementById("newsResult");

    if (newsInput.trim() === "") {
        resultDisplay.innerHTML = "Please enter some news text.";
        resultDisplay.style.color = "red";
        return;
    }

    fetch("/detect-fake-news", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: newsInput })
    })
    .then(response => response.json())
    .then(data => {
        resultDisplay.innerHTML = `Result: ${data.result}`;
        resultDisplay.style.color = data.result === "Real" ? "green" : "red";
    })
    .catch(error => {
        resultDisplay.innerHTML = "Error in detection.";
        resultDisplay.style.color = "red";
        console.error("Error:", error);
    });
}
