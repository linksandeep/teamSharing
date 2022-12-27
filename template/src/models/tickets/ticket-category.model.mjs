import Tcategory from "./ticket-category.postgres.mjs";


const createTcategories= async (data,transaction)=>{
    return await Tcategory.create(data,{transaction})
}


const findAllTcategories = async (transaction) => {
  return await Tcategory.findAll({ transaction });
};

const findOneTcategories = async (categoryId,transaction) => {
     return await Tcategory.findOne({ where: { id:categoryId } })
   }

const deleteTcategories = async (categoryId, transaction) => {
   
  await Tcategory.destroy({
    where: {
      id:categoryId,
    },
  });
};
export { createTcategories, findAllTcategories,deleteTcategories ,findOneTcategories};