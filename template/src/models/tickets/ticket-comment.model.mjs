import tComment from "./ticket-comment.postgres.mjs";

const createTcomment = async (data, transaction) => {
  return await tComment.create(data, { transaction });
};

const findAllTcomment = async (ticketId, transaction) => {
  return await tComment.findAll({ where: {ticketId}, transaction });
};

// const updateTcomment = async (ticketId, data, transaction) => {
//   return await tComment.update(
//         data,
//         {
//           where: {
//             id: ticketId,
//           },
//         },
//         { transaction }
//       );
//     };

// const deleteTcomment = async (ticketId, transaction) => {
//    // console.log(ticketId)
//   await tComment.destroy({
//     where: {
//       id: ticketId,
//     },
//   });
// };

export { createTcomment, findAllTcomment };
