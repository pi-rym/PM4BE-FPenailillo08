import { AppDataSource } from "./config/appDataSource";

AppDataSource.initialize()
.then(res =>{
    console.log("Conexión a la base de datos realizada con éxito");
})
.catch(error=>{
    console.log("Error al conectar a la base de datos");
})