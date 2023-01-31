import tComment from "./ticket-comment.postgres.mjs";

const createTcomment = async (data, transaction) => {
  return await tComment.create(data, { transaction });
};

const findAllTcomment = async (ticketId, transaction) => {
  return await tComment.findAll({ where: {ticketId}, transaction });
};

export { createTcomment, findAllTcomment };
