const express = require('express');

const projectModel = require('../data/helpers/projectModel.js');

const router = express.Router();

//GET all projects
router.get('/', async (req, res) => {
    try {
        const projects = await projectModel.get();
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({message:err});
    }
});

//Get PROJECT by ID
router.get('/:id', validateProjectId, async (req, res) => {
    res.status(200).json(req.project);
});

//GET Actions by Project
router.get('/:id/actions', validateProjectId, async (req, res) => {
    try {
        const actions = await projectModel.getProjectActions(req.params.id);
        res.status(200).json(actions);
    } catch (err) {
        res.status(500).json({message:err});
    }
});

//POST Project
router.post('/', validateProject, async (req, res) => {
    try {    
        const project = await projectModel.insert(req.body);
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({message:err});
    }
});

//DELETE Project
router.delete('/:id', validateProjectId, async (req, res) => {
    try {
        const project = await projectModel.get(req.params.id);
        await projectModel.remove(req.params.id);
        res.status(200).json({message: "Project deleted successfully"});
    } catch (err) {
        res.status(500).json({message:"Project could not be deleted!", errorMessage: err});

    }
});

//UPDATE Project
router.put('/:id', validateProjectId, validateProject, async (req, res) => {
    try {
        await projectModel.update(req.params.id, {...req.body});
        const updatedProject = await projectModel.get(req.params.id);
        res.status(200).json({updatedProject, updated: 'Project updated successfully'});

    } catch (err) {
        res.status(500).json({message:"Project could not be updated!", errorMessage:err});
    }
});


//Middleware for validating Project and ProjectID

function validateProject(req, res, next) {
    if (!req.body.name || !req.body.description) {
        res.status(404).json({message:'Project name or project description is missing.'});
    } else {
        next();
    }
};

async function validateProjectId (req, res, next) {
    try {
        const project = await projectModel.get(req.params.id);
        if (project) {
            req.project = project;
            next();
        } else {
            res.status(404).json({message: "Invalid project id"});
        }
    } catch (err) {
        res.status(500).json({message:"There was an error while validating project id"});
    }
};


module.exports = router;
