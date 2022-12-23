import { sequelize } from "../../services/postgres.mjs";
import { addTest, findAllTest } from "../../models/tests/tests.model.mjs";

const createTest = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const bodyData = req.body;
    const test = await addTest(bodyData, t);
    await t.commit();

    res.status(201).json({
      status: "success",
      data: {
        test,
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

const getTests = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const tests = await findAllTest(t);
    await t.commit();
    res.status(200).json({
      status: "success",
      length: tests.length,
      data: {
        tests,
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

export { createTest, getTests };
