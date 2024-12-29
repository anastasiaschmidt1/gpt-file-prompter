/******************************************************
 *  Token Counter (BPE-Simulation)
 ******************************************************/

/**
 * https://platform.openai.com/tokenizer
 *
 * Approximates tokenization using a simplified Byte Pair Encoding (BPE) approach.
 *
 * - Splits text into words and punctuation as tokens.
 * - Long sequences (>4 characters) are divided into smaller chunks.
 * - Short tokens (≤4 characters) count as one token each.
 * - Provides an approximation of OpenAI's tokenization logic.
 *
 * @param {string} text - The input text to be tokenized.
 * @returns {number} - The estimated number of tokens.
 */
export function calculateTokens(text) {
    if (!text) return 0;

    const tokens = text
        .replace(/\s+/g, " ")
        .match(/[\w]+|[^\s\w]/g);

    if (!tokens) return 0;

    let tokenCount = 0;
    for (const token of tokens) {
        if (token.length > 4) {
            tokenCount += Math.ceil(token.length / 4);
        } else {
            tokenCount += 1;
        }
    }

    return tokenCount;
}
