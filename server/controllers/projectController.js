const express = require("express");
const Project = require("../models/project.js");
const mongoose = require("mongoose");
var path = require('path');
var fs = require('fs');

const project = {
    readAll: async (req, res) => {
        const projects = await Project.findAll();
        console.log("프로젝트들:", projects);
        try {
            if(!projects.length)
                return res.send.status(404).send({
                    err: 'project not found'
                });
            res.send(projects);
        }catch (err) {
            res.status(500).send(err);
        }
    },

    readByTitle: async (req, res) => {
        const proj = await Project.findByTitle(req.params.title);
        console.log("프로젝트 정보 : ", proj);
        try {
            if(!proj.length)
                return res.status(404).send({
                    err: 'project not found'
                });
            res.send(proj);
        } catch (err) {
            res.status(500).send(err)
        }
    },

    readByOwner: async (req, res) => {
        const proj = await Project.findByTitle(req.params.owner);
        console.log("프로젝트 정보 : ", proj);
        try {
            if(!proj.length)
                return res.status(404).send({
                    err: 'project not found'
                });
            res.send(proj);
        } catch (err) {
            res.status(500).send(err)
        }
    },



    write: async(req, res, file) => {
        try{
            console.log("body : ", req.body.data);
            
            const data = JSON.parse(req.body.data);
            console.log(typeof(data));

            const obj = {
                projectImg: {
                    data: fs.readFileSync(path.join(__dirname , '..', 'public', '.', '/images' ,'.', req.file.filename)),
                    contentType: 'image/jpg'
                },
                
                title : data.title,
                tokenName : data.tokenName,
                owner : data.owner,
                phase2period : data.phase2period,
                information : data.information,
                rewards : data.rewards,

                startDate : data.startDate,
                phase1period : data.phase1period,
                phase2periods : data.phase2periods
            }
            
            console.log("***start viewing content from savingProject variable***");
            console.log(obj);
            const result = await Project.create(obj);
            console.log("result: ", result),
            res.status(200).send(result);
        }catch(err) {
            res.status(500).send(err);
        }
    }
}

module.exports = project;