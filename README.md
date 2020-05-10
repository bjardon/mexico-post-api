# mexico-post-api
The definitive api for address-related stuff in Mexico

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

## What's this?
This project is an API that provides information regarding the following entities in Mexico:
- Townships
- Cities
- Municipalities
- States
- Post Codes
- Postal Offices

## How to use it?
The easiest way to use this API, is via an HTTP client. In order to query the information contained on the database, you can send an HTTP GET request to any of the exposed endpoints. See below.

Also, if you wish, you can download this code and deploy the API on your own server. The project is licensed under the `MIT` license, which means you are authorized to copy and distribute this project, so long you give the appropriate credit to the creator (me).

### Remote using client
The API is deployed at [mexico-post.elotestudio.com](https://mexico-post.elotestudio.com).
You will find the Loopback API Explorer at [mexico-post.elotestudio.com/explorer](https://mexico-post.elotestudio.com/explorer).

Just connect via an HTTP client and send GET requests to the exposed endpoints in order to query the information.

### Remote as service on another project
This project is built using Loopback 4, which is an API framework designed on top of the openapi spec. If you want to use the remote endpoints of this API on another Loopback 4 project, or if the framework you are using also supports connecting using the openapi spec; you can configure the datasource using the OpenAPI connector or the supplied mechanism on your framework.

The path to the OpenAPI spec file is: [mexico-post.elotestudio.com/openapi.json](https://mexico-post.elotestudio.com/openapi.json).

### Self hosted
This repository contains everything you need to deploy the API on your own server. The datasource is connected using the in-memory connector to a db.json file, which means the data comes pre-loaded and there is no external database.

Follow the corresponding instructions to deploy the project on a Node.js runtime into your architecture and then connect either using the openapi spec or via HTTP.

## Who can use this service?
At the moment, no authentication is required and the API is free to use; for both personal and commercial purposes. I have no plans to charge a fee for using the service, because I believe everyone should be able to access this information, no matter what.

## Why?
The Mexico's government open data portal provides a so called 'Post code catalog', which contains all the information regarding every single post code registered in the whole country. However, there is not a single service, from either a private party or the government, which you could use in order to process address data. You could always implement the Google Maps API, but it requires a Google Account and you may incur in fees. Or, if you are as crazy as me, you could build your own solution, which is what I did.

That's the reason I decided to build this service. I wanted to make an API so robust and reliable in a way that becomes the de-facto solution to the address management use case. No fees, no accounts, nothing.

## Endpoints
NOTICE (WIP): Documentation is a work-in-progress

## Contribute
See a bug? Have a new feature? Want to help the future development of this awesome tool? If that's the case, then I encourage you to fork the repo, open an issue or create a pull request. Every little help counts. Let's build.

## License
As mentioned above, this project is built, distributed and published under the MIT License. More info on the LICENSE file.

## Credits
Built with <3 by Bruno Jardón (bjardon97@gmail.com)
