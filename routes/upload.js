const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
// const router = express.Router();
const app = express();
const upload = multer();
app.post('/', upload.single('img'), (req, res) => {
    try {
        fs.mkdirSync(path.join(__dirname, '../public/file'));
        fileName(req, res);
    } catch (err) {
        try {
            fileName(req, res);
        } catch (err) {
            try {
                fs.mkdirSync(path.join(__dirname, '../public/file', req.body.grade, req.body.name));
                pageName(req, res);
            } catch (err) {
                pageName(req, res);
            }
        };
    };
});

function fileName (req, res) {
    fs.mkdirSync(path.join(__dirname, '../public/file', req.body.grade));
    fs.mkdirSync(path.join(__dirname, '../public/file', req.body.grade, req.body.name));
    pageName(req, res);
};

function pageName (req, res) {
    fs.writeFileSync(path.join(__dirname, '../public/file', req.body.grade, req.body.name, req.file.originalname), req.file.buffer);
    res.json('上传成功');
}

module.exports = app;