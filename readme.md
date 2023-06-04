<h1 align="center">Google Analytics Reporting API v4 Project Boilerplate</h1>

<h3 align="center">Designed with Node/Express & TypeScript to demonstrate interaction with Core Reporting API v4</h3>

:construction: :construction: DEPRECATED :construction: :construction:

The Google Analytics v4 Core Reporting API was built for Universal Analytics properties which are now deprecated and will stop collecting data in July 2023. If you wish to continue working with your GA data in your apps you must transition to the [Google Analytics Data API v1](https://developers.google.com/analytics/devguides/reporting/data/v1).

Should you still be interested in this project, I have created a super simple API that hits this new endpoint and gets your top 50 results. It can be found [here](https://github.com/tcorcor1/google-analytics-ga4-data-api) but be aware their client library is still in beta so if you are reading this some time after writing there is likely an updated package you should install.

## Getting started

For more information on using this project please see my blog post on [tldr-dynamics.com](https://tldr-dynamics.com/blog/google-analytics-express-typescript).

### Create a Google Cloud Platform account and service credentials

1. Create a Google Cloud Platform account if you don't already have one and enable the Google Analytics Reporting API.
2. Select APIs / Services > Credentials > Create Credentials > Service Account
3. Give Service Account 'Monitoring Admin' role
4. Create a key (JSON) for Service Account
5. Add this user to your Google Analytics account and make sure it has permissions to read the view you will be using in the app. Also, make note of the view id as we need that later

### Installation

```sh
$ git clone https://github.com/tcorcor1/google-analytics-express.git
$ npm install
```

1. Rename example.env to .env and update GA_PRIVATE_KEY and GA_CLIENT_EMAIL to the values in your JSON key
2. Update the view id in [/src/services/google-analytics/index.ts](https://github.com/tcorcor1/google-analytics-express-ts/blob/main/src/services/google-analytics/index.ts)
3. Before leaving the Google Analytics service review the dimensionsFilterClauses prop in the report request as it might not fit your situation. Currently, the request will be filtered to only pages that contain a `/blog/` slug in their path. This may be completely wrong for your situation or require a simple update to something like `/posts/`. Comment it out or replace with whatever is appropriate for your situation.

```sh
$ npm start
```

### Review the data

Review your data by hitting http://localhost:5000/api/posts. You will want to adjust the query params according to your needs.

In the sample you can use `?top=10` to return the top 10 posts and/or filter your dataset by last 30 days by using query param `?days-prev=30`.

If nothing is provided `?top=undefined` and `?days-prev=2011-01-01` so make adjustments to [PostQueryParams](https://github.com/tcorcor1/google-analytics-express-ts/blob/main/src/models/posts/index.ts) class or set query params however you prefer.

You will have to provide a start date to GA so if you dont pass a `days-prev` value you should at least update the class to have the start date of when you created your GA account as the fallback.

I wanted any easy way to have 'top posts last 30 days' and 'top 5 posts last 365 days' but this is really just for demonstration purposes.

I hope you will find this a useful project for getting started with the Google Analytics API!
