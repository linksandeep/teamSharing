import Customer from "./customer.postgres.mjs";

const createcustomer = async (data, transaction) => {
  return await Customer.create(data, { transaction });
};

// const findAllcustomer = async (transaction) => {
//   return await customer.findAll({ transaction });
// };

// // const updatecustomer = async (customerId, data, transaction) => {
// //   return await customer.update(
// //         data,
// //         {
// //           where: {
// //             id: customerId,
// //           },
// //         },
// //         { transaction }
// //       );
// //     };

// const updatecustomer = async (customerId, data, transaction) => {
//   let findData = await customer.findOne(
//     { where: { id: customerId } },
//     transaction
//   );
//   if (findData) {
//     if ("name" in data) {
//       findData.name = data.name;
//     }
//     if ("color" in data) {
//       findData.color = data.color;
//     }
//     return findData;
//   }
//   return false;
// };

// const deletecustomer = async (customerId, transaction) => {
//   // console.log(ticketId)
//   await customer.destroy({
//     where: {
//       id: customerId,
//     },
//   });
// };

export { createcustomer };
