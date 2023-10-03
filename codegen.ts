import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://frontend-challenge.dev.cooltix.com/',
  documents: ['./src/app/**/*.{ts,tsx}'],
  generates: {
    './src/utils/__types/graphql.types.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
    },
  },
  ignoreNoDocuments: true,
};

export default config;
