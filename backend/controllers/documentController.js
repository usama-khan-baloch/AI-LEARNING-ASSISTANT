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
        
    } catch (error) {
        nextTick(error)
    }
};

// @desc get all users documents
// @route GET /api/documents
// access private
export const getDocuments = async(req, res, next) => {
    try {
        
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
