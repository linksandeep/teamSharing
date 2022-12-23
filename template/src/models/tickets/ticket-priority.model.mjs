
import Tpriority from "./ticket-priority.postgres.mjs";

const createTpriority = async (data, transaction) => {
  return await Tpriority.create(data, { transaction });
};

const findAllTpriority = async (transaction) => {
  return await Tpriority.findAll({ transaction });
};

const findOneTpriority = async (priorityId,transaction) => {
 // console.log(`this is ---jkjkj------- ${priorityId} -----kjkkj-------`)
  return await Tpriority.findOne({ where: { id:priorityId } })
}


const deleteTpriority = async (priorityId, transaction) => {
  await Tpriority.destroy({
    where: {
      id: priorityId
    }
  });
};
export { createTpriority, findAllTpriority, deleteTpriority,findOneTpriority };
