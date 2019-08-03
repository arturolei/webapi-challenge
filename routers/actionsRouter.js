const express = require('express');

const actionModel = require('../data/helpers/actionModel.js');
const projectModel = require('../data/helpers/projectModel.js')

const router = express.Router();


// POST action
router.post('/', validateAction, async (req, res) => {
    try {    
        const newAction = await actionModel.insert(req.body);
        res.status(201).json(newAction);
    } catch (err) {
        res.status(500).json({message:"Error posting action",errorMessage:err});
    }
});

//GET all actions
router.get('/', async (req, res) => {
    try {
        const actions = await actionModel.get();
        res.status(200).json(actions);
    } catch (err) {
        res.status(500).json({message:"Error retrieving/getting actions"});
    }
});

// GET action by id
router.get('/:id', validateActionId, async (req, res) => {
        res.status(200).json(req.action);
});

//UPDATE action given action id
router.put('/:id',validateActionId, validateAction, async (req, res) => {
    try {
        const updatedAction = await actionModel.update(req.params.id, req.body);
        res.status(200).json({message: 'Action was successfully updated', updatedAction});
    } catch (error) {
        res.status(500).json({message:err});
    }
});

//DELETE action
router.delete('/:id', validateActionId, async (req, res) => {
    try {
        const action = await actionModel.get(req.params.id);
        await actionModel.remove(req.params.id);
        res.status(200).json({message:'Action was successfully deleted'});
    } catch (err) {
        res.status(500).json({message:err});
    }
});


//MiddleWare (mostly for validating ID's)

async function validateActionId (req, res, next) {
    try {
        
        const action = await actionModel.get(req.params.id);
        if (!action) {
            res.status(404).json({message:'Invalid action id'});
        } else {
            req.action = action;
            next();
        }
    } catch (err) {
        res.status(500).json({message:"There was an error while validating action id"});
    }
};

async function validateAction (req, res, next) {
    //test if project_id is for a real project.
    try {
        const project = await projectModel.get(req.body.project_id);
        if (!project) {
            res.status(404).json({message: "Invalid project id"});
        }
    } catch (err) {
        res.status(500).json({message:"There was an error while validating project id"});
    }

    if (!req.body){
        res.status(400).json({message: "Error: There is no req.body. There is no action"})
    } else if (!req.body.project_id || !req.body.description || !req.body.notes) {
        res.status(400).json({message: "Missing Action ID, description, or notes!"})
    } else if (req.body.description.length > 128 || req.body.description.length < 1) {
        res.status(400).json({message:"Description must be between 1 to 128 characters!"})
    } else {
        if(projectModel.get(req.body.project_id)){
            next();
        } else {
            res.status(404).json("Invalid project id");
        }
    }
};





module.exports = router;