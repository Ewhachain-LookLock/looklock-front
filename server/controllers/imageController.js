const Image = require('../models/image.js');
var path = require('path');
var fs = require('fs');

const image = {
    readAll: async (req, res) => {
        const images = await Image.findAll();
        console.log("사진들 : ", images);
        try {
            if(!images.length)
                return res.status(404).send({
                    err: 'image not found'
                });
            res.send (images);
        } catch (err) {
            res.status(500).send(err)
        }
    },

    write: async(req, res, file) => {
        console.log("dir :: ", path.join(__dirname + '..', 'public', '.', '/images' ,'.'));
        try{
            const obj = {
                name: req.body.name,
                description: req.body.description,
                img: {
                    data: fs.readFileSync(path.join(__dirname , '..', 'public', '.', '/images' ,'.', req.file.filename)),
                    contentType: 'image/jpg'
                }
            };
            console.log("***start viewing content from req.body***");
            console.log(req.body);
            console.log("***start viewing content from req.file***");
            console.log(req.file);
            console.log("***start viewing content from savingProject variable***");
            console.log(obj);
            const result = await Image.create(obj);
            console.log("result: ", result),
            res.status(200).send(result);
        }catch(err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
}

module.exports = image;