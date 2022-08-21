const express = require("express");
const User = require("../models/user.js");
const mongoose = require("mongoose");

const user = {
    read: async (req, res) => {
        const user = await User.findByAddress(req.query.address);
        console.log("유저 정보 : ", user);
        try {
            if(!user.length)
                return res.status(404).send({
                    err: 'user not found'
                });
            res.send(user);
        } catch (err) {
            res.status(500).send(err)
        }
    },

    write: async(req, res) => {
        try{
            const result = await User.create(req.body);
            console.log("result: ", result);
            res.status(200).send(result);
        }catch(err) {
            console.log(err.message);
            res.status(500).send(err);
        }
    },

    update: async(req, res) => {
        try{
            console.log("account :" , req.params.address)
            const result = await User.updateByAddress(req.params.address, req.body);
            console.log("result: ", result);
            res.status(200).send(result);
        }catch(err) {
            res.status(500).send(err);
        }
    }    
}

module.exports = user;