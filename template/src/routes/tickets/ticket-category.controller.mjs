import { createTcategories ,findAllTcategories,updateTcategories,deleteTcategories } from "../../models/tickets/ticket-category.model.mjs";
import { sequelize } from "../../services/postgres.mjs";

const addTicketCategories = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      const bodyData = req.body;
      const ticketCategory = await createTcategories(bodyData, t);
      await t.commit();
  
      res.status(201).json({
        status: "success",
        data: {
          ticketCategory,
        },
      });
    } catch (err) {
      await t.rollback();
      console.log("getting error...");
      console.error(err);
      res.status(400).json({
        error: err,
      });
    }
  };
  
  const getTicketCategories = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      const ticketCategories = await findAllTcategories(t);
      await t.commit();
      res.status(200).json({
        status: "success",
        length: ticketCategories.length,
        data: {
          ticketCategories,
        },
      });
    } catch (err) {
      await t.rollback();
      console.log("getting error...");
      console.error(err);
      res.status(400).json({
        error: err,
      });
    }
  };

  
  const updateTicketCategory = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const {categoryId}=req.params
        const bodyData = req.body;
      const ticketCategory = await updateTcategories(categoryId,bodyData,t);
      await t.commit();

      res.status(200).json({
        status: "success",
        data: {
          ticketCategory,
        },
      });
    } catch (err) {
      await t.rollback();
      console.log("getting error...");
      console.error(err);
      res.status(400).json({
        error: err,
      });
    }
  };

 
const deleteTicketCategory = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { categoryId } = req.params;
    await deleteTcategories(categoryId, t);
    await t.commit();

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    await t.rollback();
    console.log("getting error...");
    console.error(err.msg);
    res.status(400).json({
      error: err,
    });
  }
};

  
  export { addTicketCategories, getTicketCategories , deleteTicketCategory,updateTicketCategory};
  