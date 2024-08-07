export const API_ENDPOINTS = {
  ticket: {
    getList: '/api/tickets',
    getOne: '/api/tickets/:id',
    createOne: '/api/tickets', //POST
    assignOne: '/api/tickets/:ticketId/assign/:userId', //PUT
    unassignOne: '/api/tickets/:ticketId/unassign', //PUT
    markComplete: '/api/tickets/:id/complete', //PUT
    markIncomplete: '/api/tickets/:id/complete', //DELETE
  },

  user: {
    getList: '/api/users',
    getOne: '/api/users/:id',
  },
};
