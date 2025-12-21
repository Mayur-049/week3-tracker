const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');
const auth = require('../middleware/authMiddleware');


router.post('/', auth, async (req, res) => {
    const { title, description, category, status, amount } = req.body;

    try {
        if (!title || !description || !category || !amount) {
            return res.status(400).json({ message: 'Please provide title, description, category, and amount' });
        }

        const newResource = new Resource({
            title,
            description,
            category,
            status: status || 'active',
            amount,
            createdBy: req.user.id
        });

        await newResource.save();

        res.status(201).json({
            message: 'Resource created successfully',
            resource: newResource,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error creating resource' });
    }
});


router.get('/', auth, async (req, res) => {
    try {
        const resources = await Resource.find({ createdBy: req.user.id }).populate('createdBy', 'name email');

        res.json({
            message: 'Resources retrieved successfully',
            count: resources.length,
            resources,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error retrieving resources' });
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id).populate('createdBy', 'name email');

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        if (resource.createdBy._id.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized: You can only access your own resources' });
        }

        res.json({
            message: 'Resource retrieved successfully',
            resource,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error retrieving resource' });
    }
});


router.put('/:id', auth, async (req, res) => {
    try {
        let resource = await Resource.findById(req.params.id);

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        
        if (resource.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized: You can only update your own resources' });
        }

        const { title, description, category, status, amount } = req.body;

        if (title) resource.title = title;
        if (description) resource.description = description;
        if (category) resource.category = category;
        if (status) resource.status = status;
        if (amount !== undefined) resource.amount = amount;

        await resource.save();

        res.json({
            message: 'Resource updated successfully',
            resource,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error updating resource' });
    }
});


router.delete('/:id', auth, async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        
        if (resource.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized: You can only delete your own resources' });
        }

        await Resource.findByIdAndDelete(req.params.id);

        res.json({
            message: 'Resource deleted successfully',
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error deleting resource' });
    }
});

module.exports = router;
