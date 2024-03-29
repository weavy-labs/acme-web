# ACME Web

A simple Node.js based application that showcases how you can integrate Weavy UIKit Web.
The application is structured like an intranet for the fictional ACME corporation and has basic features for user management including login, logout, editing user profiles and settings.

Some of the things showcased in the application are:

* Integration of the Weavy building blocks (chat, posts, files and messenger).
* How to implement and configure a token factory for authenticating your users.
* Syncing user and profile data from your application to Weavy.
* Server-to-server api requests with `API key`.
* User-to-server api requests with `access_token`.
* How to apply custom styling, including toggling light/dark mode.
* How to configure locales and provide custom translations.
* How to handle webhook events and update the user interface in realtime when these events happen, e.g. display a notification, update the count of unread messages etc.

## Prerequisites

* You need a *Weavy environment* up and running. See [https://weavy.com/docs](https://weavy.com/docs) for more information.
* You need an *API key* for communication between your app and the Weavy environment (if you don't have an API key, you can generate one in your Weavy account). See [https://weavy.com/docs](https://weavy.com/docs) for more information.

### Getting started

You must provide an `.env` file with your *WEAVY_URL* and *WEAVY_APIKEY* to run the ACME server. See the [.env.example](./.env.example) for an example configuration.

```ini
WEAVY_URL="[Url to the Weavy environment]"
WEAVY_APIKEY="[The Weavy environment api key]"
```

## Web components ACME app

Once you have configured you `.env` you can start up the ACME project.

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser. To login you can use any of the following credentials:
  
* username: `admin`, `bugs`, `daffy`, `porky`, `tweety`, `wile`, or `meepmeep`
* password: `acme`

### HTTPS configuration

You can optionally provide your own certificate for `HTTPS`.

```ini
HTTPS_PEM_KEY_PATH="/path/to/your/pem.key"
HTTPS_PEM_CERT_PATH="/path/to/your/pem.cert"
```