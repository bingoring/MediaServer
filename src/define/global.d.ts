/* eslint-disable no-var */
import 'multer';
import { ConfigType } from '../config/config.type';

declare global {
    var env: Readonly<ConfigType>;
}
