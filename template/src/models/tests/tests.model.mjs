import Test from "./tests.postgres.mjs";

const addTest = async (data, transaction) => {
  return await Test.create(data, { transaction });
};

const findAllTest = async (transaction) => {
  return await Test.findAll({ transaction });
};

export { addTest, findAllTest };
