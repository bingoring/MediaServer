export interface ServerInfoType {
    host: string;
    port: number;
    protocol: string;
    url: string;
    user?: string;
    passwd?: string;
    clustering?: number;
    database?: string;
    queryTimeout?: number;
}

export interface ConfigType {
    pg: ServerInfoType;
}

const localhost = '127.0.0.1';
export const DefaultConfig: ConfigType = {
    pg: {
        host: localhost,
        port: 5432,
        protocol: 'postgres',
        url: `postgres://${localhost}:5432`,
        user: 'postgres',
        passwd: undefined,
        database: 'database',
        queryTimeout: 15000,
    },
};