import { createcustomer } from "../../models/customer/customer.model.mjs";
import { sequelize } from "../../services/postgres.mjs";

const addCustomer = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const bodyData = req.body;
    const customer = await createcustomer(bodyData, t);
    await t.commit();

    res.status(201).json({
      status: "success",
      data: {
        customer,
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

//   const getUserStatus = async (req, res, next) => {
//     const t = await sequelize.transaction();
//     try {
//       const userStatus = await findAllUstatus(t);
//       await t.commit();
//       res.status(200).json({
//         status: "success",
//         length: userStatus.length,
//         data: {
//           userStatus,
//         },
//       });
//     } catch (err) {
//       await t.rollback();
//       console.log("getting error...");
//       console.error(err);
//       res.status(400).json({
//         error: err,
//       });
//     }
//   };

//   const updateUserStatus = async (req, res, next) => {
//     const t = await sequelize.transaction();
//     try {
//       const { uStatusId } = req.params;
//       const bodyData = req.body;
//       const uStatus = await updateUstatus(uStatusId, bodyData, t);
//       if (!uStatus) return res.status(404).json("No data found");
//       await uStatus.save({ transaction: t });
//       await t.commit();

//       res.status(200).json({
//         status: "success",
//         data: {
//           msg: "data updated",
//         },
//       });
//     } catch (err) {
//       await t.rollback();
//       console.log("getting error...");
//       console.error(err);
//       res.status(400).json({
//         error: err,
//       });
//     }
//   };

//   const deleteUserStatus = async (req, res, next) => {
//     const t = await sequelize.transaction();
//     try {
//       const { uStatusId } = req.params;
//       await deleteUstatus(uStatusId, t);
//       await t.commit();

//       res.status(204).json({
//         status: "success",
//       });
//     } catch (err) {
//       await t.rollback();
//       console.log("getting error...");
//       console.error(err);
//       res.status(400).json({
//         error: err,
//       });
//     }
//   };

export { addCustomer };
