module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        // Minor
        'feat',
        // Patch
        'fix',
        'build',
        'docs',
        'refactor',
        'perf',
        // None
        'chore',
        'ci',
        'test',
        'revert',
      ],
    ],
    'scope-empty': [0],
    'scope-enum': [
      2,
      'always',
      // prettier-ignore
      [
        'package'
      ],
    ],
  },
  ignores: [(message) => message.toLowerCase().startsWith('wip')],
};
