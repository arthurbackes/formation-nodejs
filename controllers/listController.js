const asyncHandler = require("express-async-handler");
const Lists = require("../models/listsModel")


//@desc Get all lists
//@route GET /api/lists
//@access public
const getLists = asyncHandler(async (req, res) => {
    const lists = await Lists.find({user_id: req.user.id});
    res.status(200).json({lists});
});

//@desc Get all lists
//@route GET /api/lists
//@access public
const getList = asyncHandler(async (req, res) => {
    const list = await Lists.findById(req.params.id);
    res.status(200).json({list});

    if (!list) {
        res.status(404);
        throw new Error("List not found");
    }

    res.status(200).json(list);
});

//@desc Get all lists
//@route POST /api/lists
//@access public
const createList = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, content } = req.body;
    if(!name || !content) {
        res.status(400);
        throw new Error("List has no name!")
    }
    const list = await Lists.create({
        name, 
        content,
        user_id: req.user.id,
    })
    res.status(200).json(list);
});

//@desc Update list
//@route PUT /api/contacts/:id
//@access private 

const updateList = asyncHandler(async (req, res) => {
    const list = await Lists.findById(req.params.id);
    if (!list) {
        res.status(404);
        throw new Error("List not found");
    }

    const updatedList = await Lists.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedList);
});

//@desc delete list
//@route DELETE /api/contacts/:id
//@access private 

const deleteList = asyncHandler(async (req, res) => {
    const list = await Lists.findById(req.params.id);
    if (!list) {
        res.status(404);
        throw new Error("List not found");
    }
    await Lists.deleteOne();
    res.status(200).json(list);
})


module.exports = {getLists, getList, createList, updateList, deleteList};