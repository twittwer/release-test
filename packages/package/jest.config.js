module.exports = {
  name: 'package',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/packages/package',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
