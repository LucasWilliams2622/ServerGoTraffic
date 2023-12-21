const CarBrandService = require('./CarBrandService');



const add = async (name, key) => {
    try {
        return await CarBrandService.add(name, key);
    } catch (error) {
        return false;
    }
}

const list = async (page, size) => {
    try {
        return await CarBrandService.list(page, size);
    } catch (error) {
        throw error;
    }
}


const deleteById = async (id) => {
    try {
        return await CarBrandService.deleteById(id);

    } catch (error) {
        return false;
    }
}
module.exports = {
    add,list,deleteById
};