import "reflect-metadata"
import { DataSource } from "typeorm"
import { Order } from "./entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "task_db",
    synchronize: true,
    logging: false,
    entities: [Order],
    migrations: [],
    subscribers: [],
})
