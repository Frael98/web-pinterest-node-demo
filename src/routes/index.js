const { Router } = require('express')
const router = Router();
const Image = require('../models/image')
const { unlink } = require('fs-extra')
const path = require('path')

router.get('/',  async (req, res) =>{
    const images = await Image.find();
    console.log(images)
    res.render('index', { images })
})

router.get('/uploads', async (req, res) =>{
    
    res.render('upload')
})

router.post('/uploads', async (req, res) => {
    const img = new Image();
    img.title = req.body.title,
    img.description = req.body.description
    img.filename = req.file.filename
    img.path = '/img/uploads/'+req.file.filename
    img.mimetype = req.file.mimetype
    img.size = req.file.size
    img.originalname = req.file.originalname

    await img.save();
    res.redirect('/')
})

router.get('/image/:id', async (req, res) =>{
    const{ id } = req.params
    const image = await Image.findById(id)
    res.render('profile', { image })
})

router.get('/image/:id/delete', async (req, res) => {
    const { id } = req.params;
    const image = await Image.findByIdAndDelete(id);
    await unlink(path.resolve('./src/public'+ image.path))
    res.redirect('/')
})
module.exports = router;

