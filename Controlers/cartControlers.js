const { find } = require('../Models/Cart')
const Cart = require('../Models/Cart')
const Product = require('../Models/product')
const User = require('../Models/user')
async function addToCart(UserID, RequestData) {

    const newCart = new Cart({
        UserId: UserID,
        ProductID: RequestData.ProductID,
    })
    return newCart.save()
}


async function removeFromCart(cartid , UserID) {
    let catprd = await Cart.findById(cartid)
    if (catprd == null) {
        return "Incorrect Cat Id"
    } 


    else if (catprd.UserId.toString() !== UserID){
        return "UnOuthorized Access"

    }
    else {
        await Cart.findByIdAndDelete(cartid)
        return "Product Deleted Successfuly"
    }
}

async function GetAllCArts(UserID) {
    const user = await User.findById(UserID)
    if (user) {
        return await Cart.find({ UserId: UserID }).populate('ProductID')
    }
    else {
        return null
    }

}
module.exports = { addToCart, removeFromCart , GetAllCArts}