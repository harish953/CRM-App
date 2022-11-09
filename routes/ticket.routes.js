const ticketController = require('../controllers/ticket.controller');
const authJwt = require('../middlewares/auth.jwt');


module.exports = (app)=>{
    app.post("/crm/api/v1/tickets",[authJwt.verifyToken],ticketController.createTicket);
    app.get("/crm/api/v1/tickets",ticketController.getAllTickets);
    app.get("/crm/api/v1/tickets/:id",[authJwt.verifyToken],ticketController.getOneTicket);
}