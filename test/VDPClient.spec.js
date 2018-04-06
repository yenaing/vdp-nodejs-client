/**
 * Created by smaheshw on 14/6/17.
 */
'use strict'

const chai = require('chai')
const assert = chai.assert
const VDPClient = require('../lib/VDPClient')
const config = require('../config/configuration.json')

describe('VDPClient is initialized properly', () => {
    it('Validation for mutualAuthCredentials or XPayTokenCredentials', () => {
        try {
            new VDPClient()
        } catch (e) {
            assert.equal(e.message, 'one of `mutualAuthCredentials` and `XPayTokenCredentials` is mandatory')
        }

        try {
            new VDPClient({
                mutualAuthCredentials: {
                }
            })
        } catch (e) {
            assert.equal(e.message, '`userId` is mandatory in mutualAuthCredentials')
        }

        try {
            new VDPClient({
                mutualAuthCredentials: {
                    userId: config.userId
                }
            })
        } catch (e) {
            assert.equal(e.message, '`password` is mandatory in mutualAuthCredentials')
        }

        try {
            new VDPClient({
                mutualAuthCredentials: {
                    userId: config.userId,
                    password: config.password
                }
            })
        } catch (e) {
            assert.equal(e.message, '`keyFile` is mandatory in mutualAuthCredentials')
        }

        try {
            new VDPClient({
                mutualAuthCredentials: {
                    userId: config.userId,
                    password: config.password,
                    keyFile: config.key
                }
            })
        } catch (e) {
            assert.equal(e.message, '`certificateFile` is mandatory in mutualAuthCredentials')
        }

        try {
            new VDPClient({
                XPayTokenCredentials: {
                }
            })
        } catch (e) {
            assert.equal(e.message, '`sharedSecret` is mandatory in XPayTokenCredentials')
        }
    })

    it('Validation for visaUrl', () => {

        try {
            new VDPClient({
                mutualAuthCredentials: {
                    userId: config.userId,
                    password: config.password,
                    keyFile: config.key,
                    certificateFile: config.cert
                }
            })
        } catch (e) {
            assert.equal(e.message, '`visaUrl` is mandatory')
        }

        try {
            new VDPClient({
                XPayTokenCredentials: {
                    sharedSecret: config.sharedSecret,
                }
            })
        } catch (e) {
            assert.equal(e.message, '`visaUrl` is mandatory')
        }

    })

    it('instance should initialize', () => {
        let instance = new VDPClient({
            mutualAuthCredentials: {
                userId: config.userId,
                password: config.password,
                keyFile: config.key,
                certificateFile: config.cert
            },
            XPayTokenCredentials: {
                sharedSecret: config.sharedSecret,
            },
            visaUrl: config.visaUrl
        })

        assert.equal(instance.userId, config.userId)
        assert.equal(instance.password, config.password)
        assert.equal(instance.keyFile, config.key)
        assert.equal(instance.certificateFile, config.cert)
        assert.equal(instance.sharedSecret, config.sharedSecret)
        assert.equal(instance.visaUrl, config.visaUrl)
    })

})


describe('VDPClient Helper method', () => {

    it('Get xPayToken is returning xPayToken', () => {
        let instance = new VDPClient({
            mutualAuthCredentials: {
                userId: config.userId,
                password: config.password,
                keyFile: config.key,
                certificateFile: config.cert
            },
            XPayTokenCredentials: {
                sharedSecret: config.sharedSecret,
            },
            visaUrl: config.visaUrl
        })

        assert.include(instance.getXPayToken('helloworld',null,null), 'xv2:')
    })

})