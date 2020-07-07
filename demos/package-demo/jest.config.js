module.exports = {
  name: 'package-demo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/demos/package-demo',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
