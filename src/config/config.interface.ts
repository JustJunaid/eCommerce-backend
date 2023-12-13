export interface Config {
    nest: NestConfig;
    cors: CorsConfig;
    swagger: SwaggerConfig;
    graphql: GraphqlConfig;
    security: SecurityConfig;
    jwtPrivateKey: string;
}

export interface NestConfig {
    port: number;
}

export interface CorsConfig {
    enabled: boolean;
}

export interface SwaggerConfig {
    enabled: boolean;
    title: string;
    description: string;
    version: string;
    path: string;
}

export interface GraphqlConfig {
    debug: boolean;
    playground: boolean;
    autoSchemaFile: string;
}

export interface SecurityConfig {
    expiresIn: string;
    refreshIn: string;
    bcryptSaltOrRound: string | number;
}
