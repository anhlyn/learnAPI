import { test, expect, request } from '@playwright/test'

const customerInfo = {
                "customerDetails": {
                    "firstName": "fn-test",
                    "lastName": "ln-test",
                    "email": "test@abc.com",
                    "address": "this is address",
                    "city": "Hóc Môn",
                    "zipCode": "70000",
                    "country": "Vietnam"
                },
                "items": [
                    { "productId": "504", "quantity": 5 }
                ]
            };

let orderSearchData = {
    orderId: '',//orderId
    email: customerInfo.customerDetails.email
};

test("GET /products", async({request})=>{
    const res = await request.get('https://api.valentinos-magic-beans.click/products');
    const bodyRes = await res.json();

    expect(res.ok()).toBeTruthy();
    expect(bodyRes.success).toBeTruthy();
    expect(bodyRes.source).toEqual('dynamodb');
    expect(bodyRes.data.length).toBeGreaterThan(0);

});

test("GET /products/{id}", async({request})=>{
    const res = await request.get('https://api.valentinos-magic-beans.click/products/504');
    const bodyRes = await res.json();

    expect(res.status()).toEqual(200);
    expect(res.ok()).toBeTruthy();
    expect(bodyRes.success).toBeTruthy();
    expect(bodyRes.source).toEqual('dynamodb');
    expect(Number(bodyRes.data.id)).toEqual(504);
});

test("POST /orders", async({request})=>{
    const res = await request.post('https://api.valentinos-magic-beans.click/orders', {
        data: customerInfo
    });

    const body = await res.json();
    orderSearchData.orderId = body.data.orderId;
    expect(res.status()).toEqual(201);
    expect(body.success).toBeTruthy();
    expect(body.source).toEqual('dynamodb');
    expect(body.data.orderId).toHaveLength(8);
    expect(body.data.message).toContain('created successfully');
});

test('POST /orders/lookup', async({request})=>{
    const response = await request.post('https://api.valentinos-magic-beans.click/orders/lookup',{
        data: orderSearchData
    });

    const bodyRes = await response.json();

    console.log(orderSearchData);
    console.log(bodyRes);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toEqual(200);

    expect(bodyRes.source).toEqual('dynamodb');
    expect(bodyRes.success).toBeTruthy();
    expect(bodyRes.data).toHaveProperty('orderId');
    expect(bodyRes.data.orderId).toEqual(orderSearchData.orderId);
    expect(bodyRes.data).toHaveProperty('customerEmail');
    expect(bodyRes.data.customerEmail).toEqual(orderSearchData.email);

});