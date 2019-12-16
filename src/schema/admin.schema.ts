import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema({
    title: String,
    author: String,
    keywords: String,
    content:String,
    status:Number
});