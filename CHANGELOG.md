<a name="unreleased"></a>
## [Unreleased]


<a name="v0.1.0-beta.6"></a>
## [v0.1.0-beta.6] - 2021-01-15
### Feature
- **core:** add storage to saved select mod directory
- **ui:** add application information module
- **ui:** reconfig window menu and disable most of things
- **ui:** rewrote all renderer part

### Fixes Bug
- **ci:** update job name
- **model:** remove useless id in mod directory
- **ui:** message events are stack over when change page and return
- **ui:** cursor not pointer when click on link
- **ui:** startup error now gone

### Improving performance
- **core:** change how id generate
- **main:** set minimum size of window
- **model:** add new message sender and receiver
- **ui:** change default font to mono and justify them
- **ui:** reimplement table container
- **ui:** increase dashboard card size
- **ui:** enabled mod-manager module again
- **ui:** added motion dependencies [POC]
- **ui:** add animation on dashboard when hover

### Pull Requests
- Merge pull request [#4](https://github.com/kamontat/smapi-manager/issues/4) from kamontat/dependabot/npm_and_yarn/typescript-eslint/parser-4.13.0
- Merge pull request [#6](https://github.com/kamontat/smapi-manager/issues/6) from kamontat/feature/improve-ui
- Merge pull request [#3](https://github.com/kamontat/smapi-manager/issues/3) from kamontat/dependabot/npm_and_yarn/typescript-eslint/eslint-plugin-4.13.0
- Merge pull request [#1](https://github.com/kamontat/smapi-manager/issues/1) from kamontat/dependabot/github_actions/actions/checkout-v2.3.4


<a name="v0.1.0-beta.4"></a>
## [v0.1.0-beta.4] - 2021-01-10

<a name="v0.1.0-beta.2"></a>
## [v0.1.0-beta.2] - 2021-01-10
### Fixes Bug
- **ci:** publish failed


<a name="v0.1.0-beta.1"></a>
## v0.1.0-beta.1 - 2021-01-10
### Feature
- **core:** add open directory to mod table
- **core:** improve a lot of features
- **core:** add babel, emotion and tailwind macro
- **init:** initial first commit

### Fixes Bug
- **ci:** missing installation

### Improving performance
- **config:** update and reduce some unused config
- **main:** add getting application information event support


[Unreleased]: https://github.com/kamontat/smapi-manager/compare/v0.1.0-beta.6...HEAD
[v0.1.0-beta.6]: https://github.com/kamontat/smapi-manager/compare/v0.1.0-beta.4...v0.1.0-beta.6
[v0.1.0-beta.4]: https://github.com/kamontat/smapi-manager/compare/v0.1.0-beta.2...v0.1.0-beta.4
[v0.1.0-beta.2]: https://github.com/kamontat/smapi-manager/compare/v0.1.0-beta.1...v0.1.0-beta.2
