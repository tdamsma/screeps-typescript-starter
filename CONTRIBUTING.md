# Contributing guidelines

This document outlines guides to get started on developing the starter kit.

## Contributing to the docs

We welcome contributions to the docs! We're looking for ways to make the starter kit documentation better, as well as many other tips and tricks about Screeps AI development in TypeScript.

You can start working on the docs locally as well. First, you'll need to install the [Gitbook](https://www.gitbook.com/) CLI.

```bash
npm install -g gitbook-cli
```

To run a local Gitbook server, run the following command on the project's root directory.

```bash
gitbook serve
```

## The Five Golden Rules

The simple steps of contributing to any GitHub project are as follows:

1. [Fork the repository](https://github.com/screepers/screeps-typescript-starter/fork)
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push -u origin my-new-feature`
5. Create a [Pull Request](https://github.com/screepers/screeps-typescript-starter/pulls)!

To keep your fork of in sync with this repository, [follow this guide](https://help.github.com/articles/syncing-a-fork/).

## Submitting a Pull Request

We accept almost all pull requests, as long as the following criterias are met:

* Your code must pass all of the linter checks (`npm run lint`)
* When adding a new feature, make sure it doesn't increase the complexity of the tooling. We want this starter kit to be approachable to folks who have little to no knowledge of TypeScript, or even JavaScript.
* When making changes that are potentially breaking, careful discussion must be done with the community at large. Generally we do this either on the [#typescript](https://screeps.slack.com/messages/typecript/) channel on the Screeps Slack, or on the corresponding pull request discussion thread.
