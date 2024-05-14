import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GqlModuleOptions } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

export const databaseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'Usuarios',
    autoLoadEntities: true,
    synchronize: true,
};

export const graphqlConfig: ApolloDriverConfig = {
    driver: ApolloDriver,
    autoSchemaFile: true,
    playground: true,
    introspection: true,
};
