# SDJS Speaker Pipeline

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](#how-to-contribute) [![CircleCI](https://circleci.com/gh/sandiegojs/sdjs-speaker-pipeline.svg?style=svg)](https://circleci.com/gh/sandiegojs/sdjs-speaker-pipeline) [![Greenkeeper badge](https://badges.greenkeeper.io/sandiegojs/sdjs-speaker-pipeline.svg)](https://greenkeeper.io/)

## Initial Setup
---

You can install all the project dependencies using:

```sh
$ npm install
```

### Environment variables are required

Create a `.env` file in the main directory and replace variables as needed. At a minimum you will need the following to be set:

```sh
ADMIN_USERNAME=admin
ADMIN_EMAIL=your@email.com
ADMIN_PASSWORD=test
ADMIN_PHONE=6193331234
NODE_ENV=development
EMAIL_TEMPLATE='d-e3b133a99ff54546bc7354c214579d41'
SENDGRID_API_KEY=XXXXXXX
```

## Running the server in `Developer` mode

This will automatically watch for changes to certain files and restart the server for you automatically.

```
$ npm run dev
```

## Running the project's tests

Make sure you have all the dependencies [installed](#initial-setup) then from the command line you can run the tests using:

```
$ npm run test
```

If you wish to run the tests manually and see the Cypress user interface you can run the server in development mode and then open the test interface. This can be helpful if you are writing new tests and you wish to run only some of the tests.

Start the server:
```
$ npm run dev
```

Start the test interface:
```
$ npm run cy:open
```

## How to Contribute:
---

**Working on your first Pull Request?** You can learn how from this _free_ series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

### Getting Started

1. Fork the project
![fork repo screenshot](readme-images/button_fork.png)
1. Clone your fork
![clone repo screenshot](readme-images/button_clone-repo.png)
1. Make sure you are in the right directory: `cd speaker-pipeline`
1. Add an `upstream` remote for keeping your local repository up-to-date:
   > `git remote add upstream git@github.com:sandiegojs/speaker-pipeline.git`
1. Create a file called `.env`
1. Follow the instructions to complete the [initial setup](#initial-setup)

### Reporting Bugs

1. Navigate to the "issues" tab, or [click here](https://github.com/sandiegojs/sdjs-speaker-pipeline/issues)
![issues tab screenshot](readme-images/tab_issues.png)
1. Click on the "New issue" button
![new issue button screenshot](readme-images/button_new-issue.png)
1. Click on the "Get started" button to open a new bug report
![bug report get started screenshot](readme-images/button_bug-report-get-started.png)
  - Create a title (keep it short and descriptive)
  - Fill in the template with specific information about the bug
1. Click on the gear icon next to "Labels" and select the difficulty level required to fix the bug
![difficulty level screenshot](readme-images/labels_difficulty-level.png)
1. Scroll to the bottom of the page and click on the "Submit new issue" button
![submit new issue screenshot](readme-images/button_submit-new-issue.png)


### Creating a new PR

1. Make sure you are on the `master` branch, and you have pulled the latest changes

   > `git checkout master && git pull upstream master`

1. Install any new dependencies: `npm install`

1. Create a new branch off of the `master` branch

   > `git checkout -b [NEW BRANCH NAME]`

   > **Branch naming conventions:**  
   > `fix/[BRANCH]` for bug fixes  
   > `feature/[BRANCH]` for new features  
   > `dev/[BRANCH]` for non-user-facing changes  
   >  
   > The `[BRANCH]` portion should be kebab case. For example, if you want to update the README.md file, your branch could be called `dev/update-readme`

1. Make changes and commit them. `git add . && git commit -m "[YOUR COMMIT MESSAGE]"`

   > The subject of a commit message (the first line) should be 72 characters or less. If you need more room for a longer explanation of your changes, you can add a blank line below the subject and write a commit body. The commit message should be in present-imperative tense ("Update README.md" rather than "Updates" or "Updated").

1. Push your branch to your fork: `git push -u origin [BRANCH NAME]`

1. Open a new PR against the `master` branch from your fork using the GitHub user interface
