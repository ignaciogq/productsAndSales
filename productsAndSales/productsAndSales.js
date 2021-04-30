const year = 1997;
const emptySalesByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
async function getJson(url) {
    const response = await fetch(url);
    return response.json();
}
async function getProducts() {
    let products = await getJson("products.json");
    products.sort((p1, p2) => {
        if (p1.productsName < p2.productsName)
            return -1;
        else if (p1.productsName > p2.productsName)
            return 1;
        return 0;
    });
    return products;
}
async function getSales() {
    let sales = await getJson("sales.json");
    for (let i = 0; i < sales.length; i++) {
        let date = new Date(sales[i].orderDate);
        sales[i].orderDate = date;
    }
    return sales;
}
async function getSalesData() {
    const productsPromise = getProducts();
    const salesPromise = getSales();
    return {
        products: await productsPromise,
        sales: await salesPromise
    };
}
async function main() {
    const salesData = await getSalesData();
    console.log(salesData);
}
main();
//# sourceMappingURL=productsAndSales.js.map