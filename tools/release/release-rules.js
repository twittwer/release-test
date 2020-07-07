const releaseRuleWithScopeFilter = ({ type, release }, projectScope) => [
  {
    breaking: true,
    release: 'major',
  },
  {
    revert: true,
    release: 'patch',
  },
  /*
   * ATTENTION: The order of these rules is important.
   * 1. start by defining a release by commit's type ignoring the scope rule
   *    -> releases workspace wide changes without a scope
   * 2. deactivate release for commits with any scope
   *    -> prevents release from foreign scopes
   * 3. reactivate release in case of specific scope
   *    -> releases changes from specific scope
   */
  {
    type,
    release,
  },
  {
    scope: '*',
    type,
    release: false,
  },
  {
    scope: projectScope,
    type,
    release,
  },
];

const releaseByTypeWithScopeFilter = (release, types, projectScope) =>
  types.reduce(
    (rules, type) => [
      ...rules,
      ...releaseRuleWithScopeFilter({ type, release }, projectScope),
    ],
    [],
  );

const releaseTypes = {
  minor: ['feat'],
  patch: ['fix', 'build', 'refactor', 'perf'],
  none: ['docs','chore', 'ci', 'test', 'revert'],
};

function createReleaseRulesWithScopeFilter(projectScope) {
  return [
    ...releaseByTypeWithScopeFilter('minor', releaseTypes.minor, projectScope),
    ...releaseByTypeWithScopeFilter('patch', releaseTypes.patch, projectScope),
  ];
}

module.exports = {
  createReleaseRulesWithScopeFilter,
};
