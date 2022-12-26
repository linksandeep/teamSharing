import { createTenantUser } from "../../models/Tuser/tenant-user.model.mjs";
import { sequelize } from "../../services/postgres.mjs";
  
  const addTenantUser = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      const bodyData = req.body;
      const tenantUser = await createTenantUser(bodyData, t);
      await t.commit();
  
      res.status(201).json({
        status: "success",
        data: {
         tenantUser ,
        },
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
  
  export {addTenantUser}