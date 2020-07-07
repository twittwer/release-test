const removeWildcardScope = (commit) => {
  if (commit.scope === '*') {
    commit.scope = '';
  }
};

const isCommitNotAffectingScope = (commit, projectScope) =>
  commit.scope && commit.scope !== projectScope;

const mapTypeToTitle = (commit) => {
  const commitTypeMapping = {
    feat: 'Features',
    fix: 'Bug Fixes',
    perf: 'Performance Improvements',
    revert: 'Reverts',
    docs: 'Documentation',
    style: 'Styles',
    refactor: 'Code Refactoring',
    test: 'Tests',
    build: 'Build System',
    ci: 'Continuous Integration',
    chore: 'Chores',
    default: 'Miscellaneous',
  };
  commit.type = commitTypeMapping[commit.type] || commitTypeMapping['default'];
};

const pluralizeBreakingNotesGroup = (commit) => {
  commit.notes.forEach((note) => {
    if (note.title.toUpperCase().includes('BREAKING CHANGE')) {
      note.title = `BREAKING CHANGES`;
    }
  });
};

const addShortHash = (commit) => {
  if (typeof commit.hash === `string`) {
    commit.shortHash = commit.hash.substring(0, 7);
  }
};

const processIssueLinksInSubject = (commit, context) => {
  if (typeof commit.subject !== `string`) {
    return;
  }

  const repoUrl = context.repository
    ? `${context.host}/${context.owner}/${context.repository}`
    : context.repoUrl;

  if (!repoUrl) {
    return;
  }

  const linkedIssues = [];
  commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
    linkedIssues.push(issue);
    return `[#${issue}](${repoUrl}/issues/${issue})`;
  });

  commit.references = commit.references.filter(
    (reference) => !linkedIssues.includes(reference.issue),
  );
};

const addUserLinksInSubject = (commit, context) => {
  if (typeof commit.subject !== `string`) {
    return;
  }

  if (!context.host) {
    return;
  }

  commit.subject = commit.subject.replace(
    /\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g,
    (_, username) => {
      return username.includes('/')
        ? `@${username}`
        : `[@${username}](${context.host}/${username})`;
    },
  );
};

function createCommitTransformerWithScopeFilter(projectScope) {
  return (commit, context) => {
    removeWildcardScope(commit);

    if (isCommitNotAffectingScope(commit, projectScope)) {
      return;
    }

    mapTypeToTitle(commit);
    pluralizeBreakingNotesGroup(commit);
    addShortHash(commit);

    processIssueLinksInSubject(commit, context);
    addUserLinksInSubject(commit, context);

    return commit;
  };
}

module.exports = {
  createCommitTransformerWithScopeFilter,
};
