import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

export const typeOrmConfig = (configService: ConfigService,): TypeOrmModuleOptions =>{
    return {
    type: "postgres",
    host: configService.get("DB_HOST"),
    port: configService.get("DB_PORT"),
    username: configService.get("DB_USERNAME"),
    password: configService.get("DB_PASSWORD"),
    database: configService.get("DB_NAME"),
    synchronize: true,
    logging: true,
    dropSchema: false,
    entities: [],
    subscribers: [],
    migrations: [],
    }
}
