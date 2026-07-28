import { expect, request, test } from "@playwright/test";

test("GET /products", async({request})=>{
    const res = await request.get('https://api.valentinos-magic-beans.click/products');
    const bodyRes = await res.json();

    console.log(res.url());
    console.log(res.headers());
    console.log(bodyRes);

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
    console.log(bodyRes);
    console.log(res.status());
});

test.only("POST /orders", async({request})=>{
    const res = await request.post('https://api.valentinos-magic-beans.click/orders', {
        data: {
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
                { "productId": "504", "quantity": 3 }
            ]
            }
    });

    const body = await res.json();
    console.log(body);
    console.log(res.status());
    expect(res.status()).toEqual(201);
    expect(body.success).toBeTruthy();
    expect(body.source).toEqual('dynamodb');
    expect(body.data.orderId).toHaveLength(8);
    expect(body.data.message).toContain('created successfully');
});