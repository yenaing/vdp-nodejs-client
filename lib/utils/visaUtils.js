/**
 * Created by smaheshw on 14/6/17.
 */
const crypto = require('crypto');
const rp = require('request-promise')
const fs = require('fs')

function getBasicAuthHeader(userId, password) {
    return 'Basic ' + new Buffer(userId + ':' + password).toString('base64')
}

function getCurrentTimeStamp() {
    return Math.floor(Date.now() / 1000)
}

function getHashedString(preHashString, sharedSecret ){
    return crypto.createHmac('SHA256', sharedSecret).update(preHashString).digest('hex');
}

function normalizePath(path){
    return path.startsWith('/') ? path.substring(1) : path
}

function makeRequest(uri, headers, method, body, extraOptions){

    if (method === 'POST' || method === 'PUT') {
        headers['Content-Type'] = 'application/json'
    }
    headers['Accept'] = 'application/json';

    let options = {
        uri: uri,
        headers: headers,
        method: method,
        body: body,
        json: true
    };

    if(extraOptions){
        options['key'] = fs.readFileSync(extraOptions.keyFile)
        options['cert'] = fs.readFileSync(extraOptions.certificateFile)
        options['timeout'] = extraOptions.timeout
    }

    return new Promise((resolve, reject)=> {
        rp(options)
            .then(data => {
                resolve(data);
            }).catch(err => {
            reject(err);
        });
    });
}

module.exports = {
    getBasicAuthHeader,
    getCurrentTimeStamp,
    getHashedString,
    normalizePath,
    makeRequest
}