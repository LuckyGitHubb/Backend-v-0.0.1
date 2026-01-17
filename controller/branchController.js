const branchModel = require("../models/branchModel");

const upsertBranch = async (req, res) => {
    try {
        const data = req?.body;
        const { id } = data;

        const branch = id ?
            await branchModel.findByIdAndUpdate(id, data, { new: true }) :
            await branchModel.create(data)

        return res.status(200).json({
            data: branch, message: id ?
                'Branch updated successfully' :
                'Branch created successfully',
            status: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ data: error, message: 'Internal server error', status: false })
    }
}

const allBranch = async (req, res) => {
    try {
        const getAllBranch = await branchModel.find({ isDeleted: false });
        return res.status(200).json({ data: getAllBranch, message: 'Branch fetched successfully', status: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ data: error, message: 'Internal server error', status: false })
    }
}

const singleBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const branch = await branchModel.findById(id);

        return res.status(200).json({
            data: branch,
            message: 'Branch fetched successfully',
            status: true
        });
    } catch (error) {
        return res.status(500).json({
            data: error,
            message: 'Internal server error',
            status: false
        });
    }
};


const deleteBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBranch = await branchModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
        return res.status(200).json({ data: deletedBranch, message: 'Branch deleted successfully', status: true })
    } catch (error) {
        return res.status(500).json({ data: error, message: 'Internal server error', status: false })
    }
}

module.exports = {
    upsertBranch,
    allBranch,
    singleBranch,
    deleteBranch
}