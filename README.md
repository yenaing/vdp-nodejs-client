# vdp-nodejs-client
> Disclaimer: This is a reference implementation of an Experimental Tools and SDKs described at [Visa Developer Center – Innovation Corner](https://developer.visa.com/innovation-corner). This is not intended for production use.

A Node.js client library for using VDP Gateway. It includes support for authorization and authentication with Mutual Auth and X Pay Token. To use this library, you need to setup your owner server. This library is designed to simplify calling VDP Gateway so that you need not worry about handling certificates or generate x-pay-token in your request headers.

## Table of Contents

* [Get Credentials](#get-credentials)
* [Installation](#installation)
* [Usage](#usage)
  * [Client Initialisation](#client-initialisation)
  * [Send Mutual Auth based Request](#send-mutual-auth-based-request)
  * [Send X Pay Token based Request](#send-x-pay-token-based-request)
  * [Run the tests](#run-the-tests)
  * [Best practices](#best-practices)
  * [License](#license)


## Get Credentials
Obtain your credentials from the Visa Developer Platform. [Click here](https://developer.visa.com/vdpguide#get-started-overview) to get started.

## Installation

This library is distributed on npm. In order to add it as a dependency, run the following command:

`npm install git+https://github.com/visa/vdp-nodejs-client.git --save`

## Usage

### Client Initialisation

To interact with the Visa APIs you need to create a Visa Gateway Client using your credentials. You need to pass at least one type of credentials to this client based on the APIs you intend to use. 

```javascript
const VisaGatewayClient = require('vdp-nodejs-client');

const instance = new VisaGatewayClient({
    mutualAuthCredentials: {
      userId: 'XXX'
      password: 'XXX'
      keyFile: '/Users/abc/vdp/myPrivateKey.pem'
      certificateFile: '/Users/abc/vdp/cert.pem'
    },
    XPayTokenCredentials: {
      sharedSecret: 'XXX'
    },
    visaUrl: 'https://sandbox.api.visa.com/'
});
```


### Send Mutual Auth based Request

*doMutualAuthRequest(path, headers, method, body)*

Injects necessary headers and use certificate and private key files to make a request

Returns Promise based response 


Name  | Type | Description
------------- | ------------- | ---------------- | 
path  | String |  API Path, after http://sandbox.api.visa.com/ |
headers  | Object | Headers key value pairs, no need to pass Accept/Content-Type/ |
method | String | 'GET' / 'POST' / 'PUT' / 'DELETE' /'PATCH' |
body | Object | JSON Request Body |



```javascript

let contextPath = 'forexrates/'
let resourcePath = 'v1/foreignexchangerates'
let foreignExchangeRequest = {
  destinationCurrencyCode: "826",
  markUpRate: "1",
  sourceAmount: "100.00",
  sourceCurrencyCode: "840",
 });

instance.doMutualAuthRequest(contextPath+resourcePath, {}, 'POST', foreignExchangeRequest)
  .then(response => {
    //do something with the response
  })
  .catch(err => {
    //do something with the err
  })
```

### Send X Pay Token based Request

*doXPayRequest(contextPath, resourcePath, headers, method, queryParams, body)*

Injects necessary headers to make a request

Returns Promise based response 


Name  | Type | Description
------------- | ------------- | ---------------- | 
contextPath  | String |  API Context Path, after http://sandbox.api.visa.com/ |
resourcePath  | String |  Resource Path, after contextPath | 
headers  | Object | Headers key value pairs, no need to pass Accept/Content-Type |
method | String | 'GET' / 'POST' / 'PUT' / 'DELETE' /'PATCH' |
queryParams | String | queryParamA=a&queryParamB=B |
body | Object | JSON Request Body |


```javascript

let contextPath = 'vdp/'
let resourcePath = 'helloworld'

instance.doXPayRequest(contextPath, resourcePath, {}, 'GET')
  .then(response => {
    //do something with the response
  })
  .catch(err => {
    //do something with the err
  })
```

### Run the tests

Running all the tests:

```
npm test
```

### Best practices

The client code provided reads the credentials as plain text. As a best practice we recommend you to store the credentials in an encrypted format and decrypt while using them.


### License

© Copyright 2018 Visa. All Rights Reserved.

NOTICE: The software and accompanying information and documentation (together, the “Software”) remain the property of and are proprietary to Visa and its suppliers and affiliates. The Software remains protected by intellectual property rights and may be covered by U.S. and foreign patents or patent applications. The Software is licensed and not sold.

By accessing the Software you are agreeing to Visa's terms of use (developer.visa.com/terms) and privacy policy (developer.visa.com/privacy). In addition, all permissible uses of the Software must be in support of Visa products, programs and services provided through the Visa Developer Program (VDP) platform only (developer.visa.com). THE SOFTWARE AND ANY ASSOCIATED INFORMATION OR DOCUMENTATION IS PROVIDED ON AN “AS IS,” “AS AVAILABLE,” “WITH ALL FAULTS” BASIS WITHOUT WARRANTY OR CONDITION OF ANY KIND. YOUR USE IS AT YOUR OWN RISK.

All brand names are the property of their respective owners, used for identification purposes only, and do not imply product endorsement or affiliation with Visa. Any links to third party sites are for your information only and equally do not constitute a Visa endorsement. Visa has no insight into and control over third party content and code and disclaims all liability for any such components, including continued availability and functionality. Benefits depend on implementation details and business factors and coding steps shown are exemplary only and do not reflect all necessary elements for the described capabilities. Capabilities and features are subject to Visa’s terms and conditions and may require development, implementation and resources by you based on your business and operational details. Please refer to the specific API documentation for details on the requirements, eligibility and geographic availability.

This Software includes programs, concepts and details under continuing development by Visa. Any Visa features, functionality, implementation, branding, and schedules may be amended, updated or canceled at Visa’s discretion. The timing of widespread availability of programs and functionality is also subject to a number of factors outside Visa’s control, including but not limited to deployment of necessary infrastructure by issuers, acquirers, merchants and mobile device manufacturers.
