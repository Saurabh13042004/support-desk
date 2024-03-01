const asyncHandler = require('express-async-handler');

const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');

// @desc Get user ticket
// @route /api/tickets
// @access Private
const getTickets = asyncHandler(async(req,res)=>{
    // Get user using the id in the jwt 
    const user = await User.findById(req.user.id);

    if(!user){
        res.status(401)
        throw new Error('User not found');
    }

    const tickets = await Ticket.find({user : req.user.id});

    res.status(200).json(tickets);
})


// @desc Get user ticket
// @route /api/tickets/:id
// @access Private
const getTicket = asyncHandler(async(req,res)=>{
    // Get user using the id in the jwt 
    const user = await User.findById(req.user.id);

    if(!user){
        res.status(401)
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.id);

    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found');
    }

    if(ticket.user.toString()!== req.user.id){
        res.status(401)
        throw new Error('Not authorized');
    }


    res.status(200).json(ticket);
})


// @desc Delete a ticket
// @route DELETE /api/tickets/:id
// @access Private
const deleteTicket = asyncHandler(async(req,res)=>{
    // Get user using the id in the jwt 
    const user = await User.findById(req.user.id);

    if(!user){
        res.status(401)
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.id);

    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found');
    }

    if(ticket.user.toString()!== req.user.id){
        res.status(401)
        throw new Error('Not authorized');
    }

    await Ticket.deleteOne({_id: req.params.id}); // Using deleteOne method

    res.status(200).json({success : true});
})



// @desc Update ticket
// @route PUT /api/tickets/:id
// @access Private
const updateTicket = asyncHandler(async(req,res)=>{
    // Get user using the id in the jwt 
    const user = await User.findById(req.user.id);

    if(!user){
        res.status(401)
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.id);

    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found');
    }

    if(ticket.user.toString()!== req.user.id){
        res.status(401)
        throw new Error('Not authorized');
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id,req.body,{new:true});

    res.status(200).json(updatedTicket);
})




// @desc Create new ticket
// @route POST  /api/tickets
// @access Private
const createTicket = asyncHandler(async(req,res)=>{
    const {product,description} = req.body;
    if(!product || !description){
        res.status(400)
        throw new Error('Please enter all fields');
    }
    
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }

    const ticket = await Ticket.create({
        user : req.user.id,
        product,
        description
    })

    res.status(201).json(ticket);

})


module.exports = {
    getTickets,
    getTicket,
    deleteTicket,
updateTicket,
    createTicket
}