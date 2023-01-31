import Tuser from "./tenant-user.postgres.mjs";

const createTenantUser = async (data, transaction) => {
  return await Tuser.create(data, { transaction });
};

export { createTenantUser };
