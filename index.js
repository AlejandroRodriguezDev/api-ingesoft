const app = require("./public/src/app");

app.listen(app.get("port"),()=>{ 
    console.log('Servidor corriendo en el pueradfto',app.get("port"))}
);
