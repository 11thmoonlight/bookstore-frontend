module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { data } = ctx.request.body;

    if (!ctx.state.user) {
      return ctx.unauthorized("User not authenticated");
    }

    const orderData = {
      ...data,
      users_permissions_user: ctx.state.user.id,
    };

    try {
      const order = await strapi.entityService.create("api::order.order", {
        data: orderData,
      });

      return order;
    } catch (error) {
      return ctx.internalServerError("Failed to create order", error);
    }
  },
}));
