/**
 * split text into chunkd for better AI proccessing
 * @param {string} text - full text to chunk
 * @param {number} chunkSize - Target size per chunk (in words)
 * @param {number} overLap - Number of words to overlap between chunks
 * @returns {Array<{content: string, chunkIndex: number, pageNumber: number}>} 
 */

export const chunkText = async(text, chunkSize= 500, overLap = 50) => {
    if(!text || text.trim.length === 0) {
        return [];
    }

    // clean text while preserving paragraph structure
    const cleandText = text.replace(/\r\n/g, "\n")
        .replace(/[ \t]+/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
    
    // Try to split by paragraph (single or double new lines);
    const paragraphs = cleandText.split(/\n+/).filter(p => p.trim().length > 0);
    
    const chunks = [];
    const currentChunk = [];
    let currentWordCount = 0;
    let chunkIndex = 0;


    for (const paragraph of paragraphs) {
        const paragraphWords = paragraph.trim().split(/\s+/);
        const paragraphWordCount = paragraphWords.length;

       // if single paragraph exeeds chunk size, split it by words
       if(paragraphWordCount > chunkSize) {
        if(currentChunk.length > 0) {
            chunks.push({
                content: currentChunk.join('\n\n'),
                chunkIndex: chunkIndex++,
                pageNumber: 0
            })
            currentChunk = [];
            currentWordCount = 0;
        }
        // split large paragraph into word-base chunks
        for(let i = 0; i < paragraphWords.length; i++) {
            const chunkWords = paragraphWords.slice(i, i + chunkSize);
            chunks.push({
                content: chunkWords.join(' '),
                chunkIndex: chunkIndex++,
                pageNumber: 0
            });
            if(i + chunkSize >= paragraphWords.length) break;
        }
        continue;
       }
     // if adding this paragraph exeeds chunk size, save current chunk
     if( currentWordCount + paragraphWordCount > chunkSize && currentChunk.length > 0) {
        chunks.push({
            content: currentChunk.join('\n\n'),
            chunkIndex: chunkIndex++,
            pageNumber: 0
        })

        // Create overlape from previous chunk
        const prevChunkText = currentChunk.join(' ');
        const prevWords = prevChunkText.split('/\s+/');
        const overLapText = prevWords.slice(-Math.min(overLap, prevWords.length)).join(' ');

        currentChunk = [overLapText, paragraph.trim()];
        currentWordCount = overLapText.split(/\s+/);
     } else {
        // Add paragraph to current chunk
        currentChunk.push(paragraph.trim());
        currentWordCount += paragraphWordCount;
     }
    }

    // Add the last chunk 
    if(currentChunk.length > 0) {
        chunks.push({
            content: currentChunk.join('\n\n'),
            chunkIndex: chunkIndex,
            pageNumber: 0
        })
    }
 
    // Fallback: if no chunks created, split by words
    if( chunks.length === 0 && cleandText.length > 0) {
        const allWords = cleandText.split(/\s+/);
        for (let i = 0; i < allWords.length; i += (chunkSize - overLap)) {
            const chunkWords = allWords.slice(i, i + chunkSize);

            chunks.push({
                content: chunkWords.join(' '),
                chunkIndex: chunkIndex++,
                pageNumber: 0
            })

            if(i + chunkSize>= allWords.length) break;
        }
    }
    return chunks;  

}

/**
 * Find relevent chunks based on keyWord mathcing
 * @param {Array<Object>} chunks - array of chunks
 * @param {string} query - search query
 * @param {number} maxChunks - Maximum chunks to return
 * @returns {Array<Object>}
 */
export const releventChunks = (chunks, query, maxChunks) => {
    
}