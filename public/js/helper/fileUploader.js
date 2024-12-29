/******************************************************
 *  File Uploader Helper
 ******************************************************/

/**
 * Reads the file’s content and returns it as a string.
 * @param {File} file - The file to be read.
 * @returns {Promise<string>} - A promise that resolves to the file’s text content.
 */
export async function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        // When file reading is complete, resolve the promise with its contents
        reader.onload = () => resolve(reader.result);

        // If an error occurs during file reading, reject the promise
        reader.onerror = () => reject(reader.error);

        // Read the file as text
        reader.readAsText(file);
    });
}

/**
 * Adds a file to the list of uploaded files, updates the UI to display that file,
 * and triggers an update of the final prompt.
 *
 * @param {Map} uploadedFiles - A Map storing uploaded file names and their contents.
 * @param {HTMLElement} fileList - The DOM element where the uploaded file entries are shown.
 * @param {string} fileName - The name of the uploaded file.
 * @param {string} content - The textual content of the uploaded file.
 * @param {Function} updatePrompt - A callback function to refresh the final prompt.
 */
export function addFileToList(uploadedFiles, fileList, fileName, content, updatePrompt) {
    // Avoid adding duplicate files
    if (uploadedFiles.has(fileName)) return;

    // Store the file content with a header for clarity
    uploadedFiles.set(fileName, `--- File: ${fileName} ---\n${content}`);

    // Create a list item for the file
    const li = document.createElement("li");
    li.classList.add("list__item");

    // Create a span to show the file name
    const fileSpan = document.createElement("span");
    fileSpan.classList.add("list__filename");
    fileSpan.textContent = fileName;

    // Create a remove button
    const removeBtn = document.createElement("button");
    removeBtn.className = "icon-btn";
    removeBtn.title = "Remove file";
    removeBtn.setAttribute("aria-label", `Remove file: ${fileName}`);
    removeBtn.innerHTML = `<span class="material-icons" aria-hidden="true">delete</span>`;

    // On click, remove the file from the Map and from the DOM, then update the prompt
    removeBtn.addEventListener("click", () => {
        uploadedFiles.delete(fileName);
        li.remove();
        updatePrompt();
    });

    // Append file name and remove button to the list item
    li.appendChild(fileSpan);
    li.appendChild(removeBtn);

    // Finally, append the list item to the file list in the DOM
    fileList.appendChild(li);

    // Trigger an update of the final prompt to include this file’s content
    updatePrompt();
}
