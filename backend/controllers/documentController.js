import Document from '../models/document.js';
import Flashcard from '../models/flashcard.js';
import Quiz from '../models/quiz.js';
import { extractTextFromPdf } from '../utils/pdfParser.js';
import { chunkText } from '../utils/textChunker.js';
import fs from 'fs/promises';
import mongoose from 'mongoose';

// @desc upload pdf document
// @route POST /api/documents/upload
// @access private
export const uploadDocument = async(req, res, next) => {
    try {
        if(!req.file) {
            res.status(400).json({
                success: false,
                error: "please upload a PDF file",
                statusCode: 400
            })
        }
        const title = req.body;
        if(!title) {
            // Delete uploaded file if no title is provided
            await fs.unlink(req.file.path);
            return res.status(400).json({
                success: false,
                error: "please provide a document title",
                statusCode: 400 
            })
        }

        // Constract the url for uploaded file
        const baseUrl = `http://localhost:${process.env.PORT || 8000}`;
        const fileUrl = `${baseUrl}/uploads/documents/${req.file.filename}`

        // Create a document record
        const document = await Document.create({
            userId: req.user._id,
            title,
            fileName: req.file.originalname,
            filePath: fileUrl,   // Store url instead of localpath
            fileSize: req.file.size,
            status: 'processing',
        });

        // Proccess PDF in background (in production use a que like bull)
        processPDF(document._id, req.file.path).catch(err => {
            console.error('PDF proccessing error')
        });

        res.status(201).json({
            success: true,
            data: document,
            message: "Document uploaded successfully. Proccessing in progress..."
        });
    } catch (error) {
        nextTick(error)
    }
};

// Helper function to proccess PDF
const processPDF = async(documentId, filePath) => {
    try {
        const text = await extractTextFromPdf(filePath);

        // create chunks
        const chunks = chunkText(text, 500, 50);

        // Update document
        await Document.findByIdAndUpdate(documentId, {
            extractedText: text,
            chunks: chunks,
            status: 'ready'
        });

        console.log(`Document ${documentId} proccessed successfully`)
    } catch (error) {
        console.error(`Error proccessing document ${documentId}:`, error);
        await Document.findByIdAndDelete(documentId, {status: "failed"})
    }
}

// @desc get all users documents
// @route GET /api/documents
// access private
export const getDocuments = async(req, res, next) => {
    try {
        const document = await Document.aggregate([
            {
                $match: {userId: new mongoose.Types.ObjectId(req.user._id)}
            },
            {
                $lookup: {from: 'flashcards', localField: '_id', foreignField: 'documentId', as: 'flashcardSets'}
            },
            {
                $lookup: {from: 'quizzes', localField: '_id', foreignField: 'documentId', as: 'quizzes'}
            }
        ])
    } catch (error) {
        next(error)
    }
};


// @desc get single document with chunks
// @route GET /api/documents/:id
// access private
export const getDocument = async(req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
};


// @desc delete document
// @route DELETE /api/documents/:id
// access private
export const deleteDocument = async(req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
};

// @desc update document
// @route PUT /api/documents/:id
// access private
export const updateDocument = async(req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
};
