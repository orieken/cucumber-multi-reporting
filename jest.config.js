/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  transform: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '^.+.tsx?$': ['ts-jest', {}],
  },
};
