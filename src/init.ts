import { readFileSync, readdirSync } from "fs";
import path from "path";
import { ConfigType, DefaultConfig } from "./config/config.type";
import * as dotenv from 'dotenv';

export async function init() {
    // const localConfig = (() => {
    //     const configPath = findConfigFile(__dirname);
    //     if (configPath === undefined) {
    //         console.debug('config.json file could not be found.');
    //         return DefaultConfig;
    //     }

    //     const config = JSON.parse(readFileSync(configPath).toString()) as ConfigType;
    //     return config;
    // })();
    // console.log(localConfig)
    // globalThis.env = { ...DefaultConfig, ...localConfig };
    // return env;
}

function findConfigFile(currentDir: string): string | undefined {
    const configFile = 'config.json';
    const dirContentList = readdirSync(currentDir);

    if (dirContentList.includes(configFile)) {
        return path.join(currentDir, configFile);
    } else {
        const parent = path.dirname(currentDir);
        if (parent === currentDir) {
            return undefined;
        }
        return findConfigFile(parent);
    }
}