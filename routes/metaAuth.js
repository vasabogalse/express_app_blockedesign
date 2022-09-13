const express = require('express');
const router = express.Router();
const MetaAuth = require('meta-auth');
const metaAuth = new MetaAuth();

router.get('/auth/:MetaAddress', metaAuth, (req, res) => {
    // Request a message from the server
    if (req.metaAuth && req.metaAuth.challenge) {
        res.send(req.metaAuth.challenge)
    }
});

router.get('/auth/:MetaMessage/:MetaSignature', metaAuth, (req, res) => {
    if (req.metaAuth && req.metaAuth.recovered) {
        // Signature matches the cache address/challenge
        // Authentication is valid, assign JWT, etc.
        res.send(req.metaAuth.recovered);
    } else {
        // Sig did not match, invalid authentication
        res.status(400).send();
    };
});