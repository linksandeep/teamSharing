import {
  createUstatus,
  findAllUstatus,
  updateUstatus,
  deleteUstatus,
} from "../../models/user/user-status.model.mjs";
import uStatus from "../../models/user/user-status.postgres.mjs";
import { sequelize } from "../../services/postgres.mjs";

const addUserStatus = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const bodyData = req.body;
    const userStatus = await createUstatus(bodyData, t);
    await t.commit();

    res.status(201).json({
      status: "success",
      data: {
        userStatus,
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

const getUserStatus = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const userStatus = await findAllUstatus(t);
    await t.commit();
    res.status(200).json({
      status: "success",
      length: userStatus.length,
      data: {
        userStatus,
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

const updateUserStatus = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { uStatusId } = req.params;
    const bodyData = req.body;
    const uStatus = await updateUstatus(uStatusId, bodyData, t);
    if (!uStatus) return res.status(404).json("No data found");
    await uStatus.save({ transaction: t });
    await t.commit();

    res.status(200).json({
      status: "success",
      data: {
        msg: "data updated",
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

const deleteUserStatus = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { uStatusId } = req.params;
    await deleteUstatus(uStatusId, t);
    await t.commit();

    res.status(204).json({
      status: "success",
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

export { addUserStatus, getUserStatus, deleteUserStatus, updateUserStatus };
