<a name="unreleased"></a>
## [Unreleased]


<a name="v1.0.0-beta.7"></a>
## [v1.0.0-beta.7] - 0001-01-01

<a name="v1.0.0-beta.6"></a>
## [v1.0.0-beta.6] - 2021-02-12
### Fixes Bug
- compile error on production


<a name="v1.0.0-beta.5"></a>
## [v1.0.0-beta.5] - 2021-02-11

<a name="v1.0.0-beta.4"></a>
## [v1.0.0-beta.4] - 2021-02-11

<a name="v1.0.0-beta.3"></a>
## [v1.0.0-beta.3] - 2021-02-11
### Pull Requests
- Merge pull request [#24](https://github.com/kamontat/smapi-manager/issues/24) from kamontat/dependabot/npm_and_yarn/typescript-eslint/eslint-plugin-4.15.0
- Merge pull request [#17](https://github.com/kamontat/smapi-manager/issues/17) from kamontat/dependabot/npm_and_yarn/eslint-7.19.0


<a name="v1.0.0-beta.2"></a>
## [v1.0.0-beta.2] - 2021-02-11
### Fixes Bug
- remove un-implement page


<a name="v1.0.0-beta.1"></a>
## [v1.0.0-beta.1] - 2021-02-11
### Feature
- **analytic:** support open page event
- **common:** add mod extender for external information
- **common:** add mod directory to caches storage
- **core:** add new analytic library (nucleus)
- **core:** use svelte as front framework
- **main:** nucleus can tracking error if it throw from main processor
- **main:** add json validation for return error when data is invalid
- **main:** reimplement main process with new communication protocal
- **main:** add 2 more apis, open-mod and clear-storage
- **main:** update main process to use new builder
- **main:** add fetch-mod-data for create new mod object with external information
- **main:** add mod directory cache to avoid read os everytime user enter mod manager page
- **ui:** support validate data on mod setting when use enter non-number
- **ui:** enable unique in app settings page
- **ui:** fetching latest data from server (beta)
- **ui:** add badge design and container
- **ui:** add nexus mod apikey to mod setting when user enabled beta mode
- **ui:** add re-update data threshold on mod setting
- **ui:** add transition when user switch pages
- **ui:** update app-info page to use i18n apis
- **ui:** configure background color on all pages
- **ui:** add app setting to use general form setting
- **ui:** add some content to app setting and mod setting page
- **ui:** reimplement frontend with svelte, seperate app setting and mod setting
- **ui:** add feature and design on mod manager page
- **ui:** add a way to clear and reset to default value of configuration (beta mode)
- **ui:** configure mono font to Jetbrain Mono
- **ui:** add notification for info, warn, and error

### Fixes Bug
- update generate script to support windows
- upgrade some dependencies
- reduce css class name since it build as modules already
- **common:** update env to support new env utils
- **common:** reduce log message on storage update event
- **common:** wrong type on renderer apis return value
- **common:** disabled schema on storage due to electron webpack bug
- **common:** disabled analytic on development mode
- **common:** remove processor type, use data origin instead
- **core:** remove deprecated updateSetting apis
- **main:** supported regenerate unique id from main process
- **main:** move utils to new env api
- **main:** compile error due to type mismatch
- **main:** remove log in main builder
- **preload:** rewrote preload to use contextBridge instead
- **ui:** remove duplicated container name
- **ui:** remove duplicate page name in header container
- **ui:** support new mod system (v2)
- **ui:** clear caches should reinitial config not delete them all
- **ui:** increase height of card size in dashboard
- **ui:** scolling out of page in mod manager page
- **ui:** fix scrolling out of app info page
- **ui:** increase color make it clear
- **ui:** logging on renderer process is missing
- **ui:** duplicate border when input group with 1 button
- **ui:** add some margin on header for notification will not over content
- **ui:** disable pointer cursor when submit button is disabled
- **ui:** update some margin on app-info page
- **ui:** unnecessary full screen container in mod manager and app info page
- **ui:** fallback to default name if i18n is not available

### Improving performance
- translate all content to thai language
- add new tracking event, when user update settings
- change syntax of mods from array to map of mod id
- add tracking key when user toggle mod directory
- **common:** remove update settings apis
- **common:** update request to support custom response key
- **common:** rename nuxus to nexus and improve nexus module
- **common:** remove events module (POC)
- **common:** introduce communication module for communicate between renderer and main process
- **common:** add mod setting
- **common:** remove all color from logger module
- **common:** add new information object, contains all application info
- **common:** add mod lastUpdated field to tell when mod has been updated
- **common:** remove logger object from request, use global variable instead
- **comp:** add default location of top tooltip
- **core:** compiled to es6 instead commonjs
- **core:** add event count analytics, (POC)
- **core:** add apikey to secure preload api
- **data:** add last update to mod collection to show when it updated
- **main:** update read and find mod directory to support new mod v2
- **main:** instead of throw error, I create new error column on data carrier for frontend to avoid appending message
- **main:** update main builder to support types on input and return
- **main:** reimplement toggle mod directory to support new mod models (v2)
- **main:** add i18n supported, renderer can ask content from main process via i18n api
- **main:** add log when user open external link
- **main:** find-mod-directory will not update cache automatically to avoid different data on cache and mod setting
- **main:** add mod reader from caching
- **main:** add analytic to main builder and implement event counter
- **main:** add validate nexus apikey, [validate apikey, query generic data from nexus]
- **main:** add toggle mod directory for change isHidden status of input mod
- **model:** implement v2 of mod system
- **model:** update caches collection to use new mod system (v2)
- **ui:** add margin between icon
- **ui:** improve tooltip of top tooltip and add new bottom tooltip
- **ui:** remove process manager, use check for updates to open github when update release is exist
- **ui:** extra information will hidden when user disable debug mode
- **ui:** mod setting will handle update cache when mod directory is updated
- **ui:** submit button will disable when user enter invalid apikey
- **ui:** supported language on dashboard page
- **ui:** add left and right container of footer container in form
- **ui:** implement range input instead for recusive limit
- **ui:** migrate 'nexus apikey' in settings page to use i18n apis
- **ui:** decrease breakdown of medium device to 900px and large to 1200px
- **ui:** migrated some data in mod manager page to use i18n apis
- **ui:** add relative position on root container on every page
- **ui:** prepare for dark theme, refactor color variable
- **ui:** add rounding on root container for smooth display
- **ui:** reduce class name
- **ui:** icon is now colorize
- **ui:** add countdown time on timing notification
- **ui:** remove error on footer, migrate to error notification instead
- **ui:** implement fetching error with notification apis
- **ui:** disable scrollbar components
- **ui:** reduce animation on change pages

### Pull Requests
- Merge pull request [#21](https://github.com/kamontat/smapi-manager/issues/21) from kamontat/feature/reduce-app-size


<a name="v0.2.0-beta.1"></a>
## [v0.2.0-beta.1] - 2021-01-19

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


[Unreleased]: https://github.com/kamontat/smapi-manager/compare/v1.0.0-beta.7...HEAD
[v1.0.0-beta.7]: https://github.com/kamontat/smapi-manager/compare/v1.0.0-beta.6...v1.0.0-beta.7
[v1.0.0-beta.6]: https://github.com/kamontat/smapi-manager/compare/v1.0.0-beta.5...v1.0.0-beta.6
[v1.0.0-beta.5]: https://github.com/kamontat/smapi-manager/compare/v1.0.0-beta.4...v1.0.0-beta.5
[v1.0.0-beta.4]: https://github.com/kamontat/smapi-manager/compare/v1.0.0-beta.3...v1.0.0-beta.4
[v1.0.0-beta.3]: https://github.com/kamontat/smapi-manager/compare/v1.0.0-beta.2...v1.0.0-beta.3
[v1.0.0-beta.2]: https://github.com/kamontat/smapi-manager/compare/v1.0.0-beta.1...v1.0.0-beta.2
[v1.0.0-beta.1]: https://github.com/kamontat/smapi-manager/compare/v0.2.0-beta.1...v1.0.0-beta.1
[v0.2.0-beta.1]: https://github.com/kamontat/smapi-manager/compare/v0.2.0...v0.2.0-beta.1
[v0.2.0]: https://github.com/kamontat/smapi-manager/compare/v0.1.1...v0.2.0
[v0.1.1]: https://github.com/kamontat/smapi-manager/compare/v0.1.0-beta.6...v0.1.1
[v0.1.0-beta.6]: https://github.com/kamontat/smapi-manager/compare/v0.1.0-beta.4...v0.1.0-beta.6
[v0.1.0-beta.4]: https://github.com/kamontat/smapi-manager/compare/v0.1.0-beta.2...v0.1.0-beta.4
[v0.1.0-beta.2]: https://github.com/kamontat/smapi-manager/compare/v0.1.0-beta.1...v0.1.0-beta.2
