/******************************************************
 *  Imports
 ******************************************************/
import { readFileContent, addFileToList } from "./helper/fileUploader.js";
import { calculateTokens } from "./helper/tokenCounter.js";

/******************************************************
 *  DOM Elements
 ******************************************************/
const promptInput = document.getElementById("promptInput");
const fileInput = document.getElementById("fileInput");
const fileList = document.getElementById("list__files");
const generatedPrompt = document.getElementById("generatedPrompt");
const tokenCounter = document.getElementById("tokenCounter");
const copyButton = document.getElementById("copyButton");
const copyIcon = copyButton.querySelector(".material-icons");

/******************************************************
 *  Global State
 ******************************************************/
const uploadedFiles = new Map();

/******************************************************
 *  Functions
 ******************************************************/
/**
 * Combines the user’s main prompt with each uploaded file’s content
 * and updates both the generated prompt and token count.
 */
function updatePrompt() {
    let promptText = promptInput.value.trim();

    if (uploadedFiles.size > 0) {
        promptText += "\n\n=== Attached Files ===\n";
        const fileContents = Array.from(uploadedFiles.values()).join("\n\n");
        promptText += fileContents;
    }

    generatedPrompt.value = promptText;
    updateTokenCount(promptText);
}

/**
 * Updates the token counter based on the given text.
 */
function updateTokenCount(text) {
    const tokenCount = calculateTokens(text);
    tokenCounter.textContent = `Estimated token count using BPE approach: ${tokenCount}`;
}

/**
 * Copies the content of the generated prompt to the clipboard and updates the icon.
 */
function copyToClipboard() {
    navigator.clipboard.writeText(generatedPrompt.value).then(() => {
        copyIcon.textContent = "check"; // Change icon to a checkmark

        // Revert back to the copy icon after 2 seconds
        setTimeout(() => {
            copyIcon.textContent = "content_copy";
        }, 2000);
    });
}

/******************************************************
 *  Event Listeners
 ******************************************************/
promptInput.addEventListener("input", updatePrompt);

generatedPrompt.addEventListener("input", () => {
    updateTokenCount(generatedPrompt.value);
});

fileInput.addEventListener("change", async (event) => {
    const files = Array.from(event.target.files);

    for (const file of files) {
        const content = await readFileContent(file);
        addFileToList(uploadedFiles, fileList, file.name, content, updatePrompt);
    }
});

copyButton.addEventListener("click", copyToClipboard);

// Initial call to ensure everything is up to date
updatePrompt();
