import uStatus from "./user-status.postgres.mjs";


const createUstatus= async (data,transaction)=>{
    return await uStatus.create(data,{transaction})
}


const findAllUstatus = async (transaction) => {
  return await uStatus.findAll({ transaction });
};


const updateUstatus = async (uStatusId, data, transaction) => {
  return await uStatus.update(
        data,
        {
          where: {
            id: uStatusId,
          },
        },
        { transaction }
      );
    };

const deleteUstatus = async (uStatusId, transaction) => {
   // console.log(ticketId)
  await uStatus.destroy({
    where: {
      id: uStatusId,
    },
  });
};

export { createUstatus, findAllUstatus,updateUstatus,deleteUstatus};