
function deleteProduct(index){
    cartArray.splice(index, 1);
    localStorage.setItem('addedData', JSON.stringify(cartArray));
    getGoods();
};

export default deleteProduct;