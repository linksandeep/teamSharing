import Tcategory from "./ticket-category.postgres.mjs";


const createTcategories= async (data,transaction)=>{
    return await Tcategory.create(data,{transaction})
}


const findAllTcategories = async (transaction) => {
  return await Tcategory.findAll({ transaction });
};

const updateTcategories = async (categoryId, data, transaction) => {
  return await Tcategory.update(
        data,
        {
          where: {
            id: categoryId,
          },
        },
        { transaction }
      );
    };

const deleteTcategories = async (categoryId, transaction) => {
   
  await Tcategory.destroy({
    where: {
      id:categoryId,
    },
  });
};
export { createTcategories, findAllTcategories,deleteTcategories ,updateTcategories};