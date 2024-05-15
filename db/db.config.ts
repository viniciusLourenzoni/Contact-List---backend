import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { password } from './password';

export const databaseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: password,
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
