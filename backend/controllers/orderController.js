const Order = require('../models/Order');

const createOrder = async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    // Validation
    if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: "No order items" });
    }
    if (!shippingAddress || !paymentMethod || itemsPrice == null || taxPrice == null || shippingPrice == null || totalPrice == null) {
        return res.status(400).json({ message: "Please fill all the required fields" });
    }
    try {
        const order = await Order.create({
            user: req.user._id,
            orderItems, 
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });
        return res.status(201).json(order);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}

const getOrderById = async (req, res) => {  
    const { id } = req.params;
    try {
        const order = await Order.findById(id).populate('user', 'fullname email');
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }   

        if (order.user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not Authorized" });
        }

        return res.status(200).json(order);
    } catch (err) { 
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }   
}

const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        return res.status(200).json(orders);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}

const updateOrderToPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.isPaid = true;
        order.paidAt = Date.now();

        // Updated to handle the correct payload structure
        if (req.body && req.body.id) {
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address, // Changed from req.body.payer.email_address
            };
        }

        const updatedOrder = await order.save();
        return res.status(200).json(updatedOrder);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    createOrder,
    getOrderById,
    getUserOrders,
    updateOrderToPaid
};
