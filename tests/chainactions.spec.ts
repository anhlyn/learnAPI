import { test, expect, request } from "@playwright/test";

test('pick first product and order', async({request})=>{
    //Select the product from the api GET /products
    const resProducts = await request.get('https://api.valentinos-magic-beans.click/products');
    const resBody = await resProducts.json();
    const products = resBody.data;

    expect(resProducts.ok()).not.toBeFalsy();
    expect(resProducts.status()).toEqual(200);
    expect(resBody.source).toBeTruthy();

    const selectedProduct = products.find((product: any) => product.stock > 0 && product.price > 25);
    //Order
    const additionalInfo = {
                "customerDetails": {
                    "firstName": "fn-test01",
                    "lastName": "ln-test01",
                    "email": "test01@abc.com",
                    "address": "this is address 01",
                    "city": "Hóc Môn",
                    "zipCode": "70000",
                    "country": "Vietnam"
                },
                "items": [
                    { "productId": selectedProduct.id, "quantity": 2 }
                ]
            };
    
    const resOrder = await request.post('https://api.valentinos-magic-beans.click/orders', {
        data: additionalInfo
    });

    const resOrderBody = await resOrder.json();
    const orderData = {
        orderId: resOrderBody.data.orderId,
        email: additionalInfo.customerDetails.email
    };

    console.log(resOrder.statusText());
    expect(resOrder.status()).toEqual(201);
    expect(resOrder.statusText()).toEqual('Created');
    expect(orderData.orderId).toHaveLength(8);
    expect(resOrderBody.data.message).toContain('created successfully');

    //Lookup by created order id
    const resLookup = await request.post('https://api.valentinos-magic-beans.click/orders/lookup', {
        data: orderData
    });

    expect(resLookup.ok()).not.toBeFalsy();
    expect(resLookup.status()).toEqual(200);
});