# Best Markdown Editor

[![maintainability](https://api.codeclimate.com/v1/badges/8b4e38f4f0d77a81386a/maintainability)](https://codeclimate.com/github/Best-Markdown-Editor/front-end/maintainability)

![I love markdown banner](https://i.imgur.com/WWVpqS9.png)

[Best Markdown Editor](https://www.bestmarkdowneditor.com) is a online markdown editor PWA. You can install it to your computer through your browser. If you have the grammarly extension in your browsers, you will have an app that uses your grammarly account to spell check your work!

In addition, we also help you keep track of your files. You can create new files, edit files, and delete files. You can even export them as a markdown file to your computer.

All and all, this is a pretty simple web app that's meant to be simple. If you're like me, and you write markdown for multiple platforms and constantly posting blogs to different mediums, it's nice to have one simple place where you can keep track of everything.


## Getting started

#### Installation and Setup

To get the client running locally, clone this repo and use the following commands/steps:

- Clone this repo
- `yarn` to install required dependencies
- `yarn start` to start the app in your local browser
- `yarn dev` to start the development env 

### Environment Variables 

There should be a .env file containing the following:

    REACT_APP_GQL_URL - ...
    REACT_APP_API_KEY - ...
    REACT_APP_AUTH_DOMAIN - ...
    REACT_APP_DATABASE_URL - ...
    REACT_APP_PROJECT_ID - ...
    REACT_APP_STORAGE_BUCKET - .. 
    REACT_APP_MESSAGING_SENDER_ID - ...
    REACT_APP_APP_ID - ...
    REACT_APP_MEASUREMENT_ID - ...
    REACT_APP_STRIPE_SUCCESS_URL - ...
    REACT_APP_STRIPE_CANCEL_URL - ...
    REACT_APP_STRIPE_PK - ...
    REACT_APP_STRIPE_CMS_SUB - ...

To query and fetch from the API locally use the following URL: `http://localhost:4000/graphql` for the `REACT_APP_GQL_URL` after cloning and running the back end for this project. 

## Contributing and getting involved
---
**Issue and Bug Requests** 

If you are having an issue with the existing project code, please submit a bug report under the following guidelines:

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

**Pull Request Guidelines**
- Fork the repo 
- Create a branch with feature name 
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- Include meaningful commit messages 