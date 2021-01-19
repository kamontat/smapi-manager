<a name="unreleased"></a>
## [Unreleased]


<a name="v0.2.0"></a>
## [v0.2.0] - 2021-01-19
### Feature
- **comp:** add listing list for mod-manager instead of table
- **page:** add setting to dashboard
- **page:** add setting page for configure application data
- **page:** implement new layout listing [beta]
- **ui:** enable nexus mod checking latest version under beta mode
- **ui:** remove table container, add clickable on title, and several badge
- **ui:** add new submit for open config file
- **ui:** add a lot information in application info page, support debug mode
- **ui:** enable debug and tutorial mode on mod-manager page
- **ui:** add tutorial mode for enable some tooltip
- **ui:** add debug mode configuration
- **ui:** add edit on menu bar for cut, copy and paste data

### Fixes Bug
- **common:** enable warn logger in production
- **common:** json file is not correctly loaded due to json format is not correct
- **comp:** not trigger button out of text in mod-manager card
- **comp:** patch update of compile error
- **core:** cannot open application due to require not defined in renderer node
- **page:** rewrote updater in app-info page, reduce response time
- **ui:** error occurred when back and reopen
- **ui:** disabled tooltip on non-tutorial mode

### Improving performance
- **common:** add mod updater transformer
- **common:** add requester for request external apis
- **common:** add debug mode on config file
- **common:** rewrote storage data on storage module
- **common:** change configuration module to storage for multiple storage file
- **comp:** add text with tooltip
- **comp:** add checkbox for form container
- **comp:** reduce margin in table body
- **comp:** add message badge for new listing component
- **comp:** add new form component for settings page
- **core:** implement config storage and user config
- **data:** add mod category for mod and character
- **main:** new event for open external link
- **ui:** redesign submit button in setting page
- **ui:** update badge to be clickable
- **ui:** listing on mod-manager will be flexbox instead of grid
- **ui:** add tooltip when user click save and it saving
- **ui:** remove finding mod directory on mod-manager page, use setting page instead
- **ui:** add checking version in mod-manager under beta mode

### Pull Requests
- Merge pull request [#7](https://github.com/kamontat/smapi-manager/issues/7) from kamontat/dependabot/npm_and_yarn/framer-motion-3.2.1
- Merge pull request [#5](https://github.com/kamontat/smapi-manager/issues/5) from kamontat/dependabot/npm_and_yarn/electron-11.2.0
- Merge pull request [#2](https://github.com/kamontat/smapi-manager/issues/2) from kamontat/dependabot/npm_and_yarn/fork-ts-checker-webpack-plugin-6.1.0


<a name="v0.1.1"></a>
## [v0.1.1] - 2021-01-15
### Fixes Bug
- **core:** application crash because menu item is missing on production


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


[Unreleased]: https://github.com/kamontat/smapi-manager/compare/v0.2.0...HEAD
[v0.2.0]: https://github.com/kamontat/smapi-manager/compare/v0.1.1...v0.2.0
[v0.1.1]: https://github.com/kamontat/smapi-manager/compare/v0.1.0-beta.6...v0.1.1
[v0.1.0-beta.6]: https://github.com/kamontat/smapi-manager/compare/v0.1.0-beta.4...v0.1.0-beta.6
[v0.1.0-beta.4]: https://github.com/kamontat/smapi-manager/compare/v0.1.0-beta.2...v0.1.0-beta.4
[v0.1.0-beta.2]: https://github.com/kamontat/smapi-manager/compare/v0.1.0-beta.1...v0.1.0-beta.2
