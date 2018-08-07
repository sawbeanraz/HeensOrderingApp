const joi = require("joi");
const joiValidation = require("./joi-validate");
const isEmpty = require("./is-empty");

const orderItemSchema = joi.object().keys({
  name: joi.string().required(),
  price: joi.number().required(),
  description: joi.string(),
  menuOptions: joi.array(),
  itemTotal: joi.number().required()
});

const orderItemOptionSchema = joi.object().keys({
  description: joi.string().required(),
  additionalCost: joi.number().required()
});

const deliveryAddressSchema = joi.object().keys({
  name: joi.string(),
  contactNo: joi.string(),
  address: joi.string(),
  postCode: joi.string()
});

module.exports = {
  validateOrder: data => {
    //validating orderItems
    if (Array.isArray(data.orderItems)) {
      const orderItemErrors = data.orderItems.reduce(
        (itemErrors, orderItem, index) => {
          //validate a item in orderItems
          const { errors, isValid } = joiValidation(orderItemSchema, orderItem);
          if (!isValid) {
            itemErrors.push({ [index]: errors });
          }
          //validate order options
          const optionErrors = (orderItem.options || []).reduce(
            (optionError, o, i) => {
              const { errors, isValid } = joiValidation(
                orderItemOptionSchema,
                o
              );
              if (!isValid) {
                optionError.push({ [i]: errors });
              }
              return optionError;
            },
            []
          );
          if (!isEmpty(optionErrors)) {
            itemErrors.push({ [index]: "Invalid order options" });
          }

          return itemErrors;
        },
        []
      );

      return {
        isValid: isEmpty(orderItemErrors),
        errors: {
          orderItems: "Invalid order items(s)",
          detail: orderItemErrors
        }
      };
    } else {
      return {
        isValid: false,
        errors: {
          orderItems: "Order item(s) are empty or invalid"
        }
      };
    }
  },
  validateDeliveryAddress: data => joiValidation(deliveryAddressSchema, data),
  validateOrderItem: data => joiValidation(orderItemSchema, data)
};
