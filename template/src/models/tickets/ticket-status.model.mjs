import Tstatus from "./ticket-status.postgres.mjs";

const createTstatus = async (data, transaction) => {
  return await Tstatus.create(data, { transaction });
};

const findAllTstatus = async (transaction) => {
  return await Tstatus.findAll({ transaction });
};

const findOneTstatus = async (statusId, transaction) => {
  // console.log(`this is ---jkjkj------- ${priorityId} -----kjkkj-------`)
   return await Tstatus.findOne({ where: { id:statusId } },transaction)
 }

const deleteTstatus = async (statusId, transaction) => {
    console.log(statusId)
  await Tstatus.destroy({
    where: {
      id: statusId,
    },
  });
};

export { createTstatus, findAllTstatus, findOneTstatus, deleteTstatus };
