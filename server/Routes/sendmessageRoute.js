const express=require('express');
const { sendtextMessage } = require('../Controllers/sendMessageController');
const messageRouter=express.Router();
messageRouter.post('/send-text-message', sendtextMessage);

module.exports = messageRouter;