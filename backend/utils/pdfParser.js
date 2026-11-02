import fs from 'fs/promises';
import { pdfParse } from 'pdf-parse';

/**
 * Extract text from pdf file
 * @param {string} filePath - Path to pdf file
 * @returns {Promise<{text: string, numPages: number}>}
 */

export const extractTextFromPdf = async(filePath) => {
    try {
        const dataBuffer = await fs.readFile(filePath);
        // pdf-parse expects a Unit8Array, not a buffer
        const parser = new pdfParse(new Uint8Array(dataBuffer));
        const data = await parser.getText();

        return {
            text: data.text,
            numPages: data.numPages,
            info: data.info
        }
    } catch (error) {
        console.error('pdf parsing error', error);
        throw new Error('Failed to extract text from pdf')
    }
};
