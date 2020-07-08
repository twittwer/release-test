# Scoped Semantic Release

> This utility enables semantic releases in a monorepo with package/library based versioning

## How to use

1. Create your package/library (called project in the further course)
2. Add a `.releaserc.js` in project's root directory
    ```js
    const { createReleaseConfigWithScopeFilter } = require('../../tools/release');
    
    module.exports = createReleaseConfigWithScopeFilter({
      projectScope: '<project-name>',
      projectRoot: '<project/root/directory>',
      buildOutput: '<project/dist/directory>',
    });
    ```
3. Configure a `release` architect for the project (`workspace.json`/`angular.json`)
    ```json
    "release": {
      "builder": "@nrwl/workspace:run-commands",
      "options": {
        "commands": ["npx semantic-release"],
        "cwd": "<project/root/directory>"
      },
    },
    ```
4. Add the project name to the list of allowed scopes in your `.commitlintrc.js`
