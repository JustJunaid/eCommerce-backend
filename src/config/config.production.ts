import { Config } from './config.interface';

const config: Config = {
    nest: {
        port: 4000,
    },
    cors: {
        enabled: true,
    },
    swagger: {
        enabled: true,
        title: 'eCommerce Backend API',
        description: 'API Documentation',
        version: '1.0',
        path: 'api',
    },
    graphql: {
        debug: true,
        playground: true,
        autoSchemaFile: 'src/schema.gql',
    },
    security: {
        expiresIn: '2m',
        refreshIn: '7d',
        bcryptSaltOrRound: 10,
    },
    jwtPrivateKey: 'jwtPrivateKey',
};

export default config;
