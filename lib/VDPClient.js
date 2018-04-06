/**
 * Created by smaheshw on 14/6/17.
 */
'use strict'

const visaUtils = require('./utils/visaUtils')

class VDPClient {

    constructor(options = {}) {
        let { mutualAuthCredentials, XPayTokenCredentials, visaUrl} = options

        if (!mutualAuthCredentials && !XPayTokenCredentials) {
            throw new Error('one of `mutualAuthCredentials` and `XPayTokenCredentials` is mandatory')
        }

        if (mutualAuthCredentials && !mutualAuthCredentials.userId) {
            throw new Error('`userId` is mandatory in mutualAuthCredentials')
        }

        if (mutualAuthCredentials && !mutualAuthCredentials.password) {
            throw new Error('`password` is mandatory in mutualAuthCredentials')
        }

        if (mutualAuthCredentials && !mutualAuthCredentials.keyFile) {
            throw new Error('`keyFile` is mandatory in mutualAuthCredentials')
        }

        if (mutualAuthCredentials && !mutualAuthCredentials.certificateFile) {
            throw new Error('`certificateFile` is mandatory in mutualAuthCredentials')
        }

        if (XPayTokenCredentials && !XPayTokenCredentials.sharedSecret) {
            throw new Error('`sharedSecret` is mandatory in XPayTokenCredentials')
        }

        if (!visaUrl) {
            throw new Error('`visaUrl` is mandatory')
        }

        if(mutualAuthCredentials){
            this.userId = mutualAuthCredentials.userId
            this.password = mutualAuthCredentials.password
            this.keyFile = mutualAuthCredentials.keyFile
            this.certificateFile  = mutualAuthCredentials.certificateFile
        }

        if(XPayTokenCredentials){
            this.sharedSecret = XPayTokenCredentials.sharedSecret
        }

        this.visaUrl = visaUrl
    }

    getXPayToken(resourcePath, queryParams, postBody){
        let timestamp = visaUtils.getCurrentTimeStamp
        let preHashString = timestamp + resourcePath + queryParams + postBody
        let xPayToken = 'xv2:' + timestamp + ':' + visaUtils.getHashedString(preHashString, this.sharedSecret);
        return xPayToken;
    }

    doMutualAuthRequest(path, headers, method, body){

        headers['Authorization'] = visaUtils.getBasicAuthHeader(this.userId, this.password);
        let uri = this.visaUrl + visaUtils.normalizePath(path);

        let options = {
            keyFile: this.keyFile,
            certificateFile: this.certificateFile,
            timeout: 30000
        };

        return visaUtils.makeRequest(uri, headers, method, body, options);
    }

    doXPayRequest(contextPath, resourcePath, headers, method, queryParams, body){

        headers['x-pay-token'] = this.getXPayToken(resourcePath, queryParams, body)
        let uri = this.visaUrl + visaUtils.normalizePath(contextPath) + resourcePath + '?' + queryParams

        return visaUtils.makeRequest(uri, headers, method, body);
    }

}

module.exports = VDPClient