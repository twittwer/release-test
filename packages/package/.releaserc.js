const { createReleaseConfigWithScopeFilter } = require('../../tools/release');

module.exports = createReleaseConfigWithScopeFilter({
  projectScope: 'package',
  projectRoot: 'packages/package',
  buildOutput: 'dist/packages/package',
});
