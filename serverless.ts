import type { AWS } from '@serverless/typescript';
import 'dotenv/config'

import hello from '@functions/hello';
import teste from '@functions/teste2';

const serverlessConfiguration: AWS = {
  service: 'teste-lambda',
  frameworkVersion: '2',
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
    },
  },
  plugins: ['serverless-esbuild', "serverless-offline", "serverless-dotenv-plugin"],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      TEXT: process.env.TEXT
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { hello, teste },
};

module.exports = serverlessConfiguration;
