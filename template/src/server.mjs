import http from "http";
import app from "./app.mjs";
import { sequelize, postgresConnect } from "./services/postgres.mjs";

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  await postgresConnect();
 //await sequelize.sync({ force: true });
  await sequelize.sync();
  console.log("All models were synchronized successfully.");

  server.listen(PORT, () =>
    console.log(`Server is listening on port ${PORT}...`)
  );
};

// import { DataTypes } from "Sequelize";
// const Tstatus = sequelize.define('Tstatus',{
//   onDelete: 'RESTRICT',
//   onUpdate: 'RESTRICT'
// });
// const Ticket = sequelize.define('Ticket');
// Tstatus.oneT(Ticket, { through: 'newId' });
// Ticket.belongsTo(Tstatus, { through: 'newId' });


startServer();
