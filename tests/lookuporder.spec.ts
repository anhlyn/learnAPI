import { test, expect, request } from '@playwright/test';

const orderSearchData = {
    orderId: 'D7E00C43',//orderId
    email: 'test@abc.com'
};

test('Search by Order ID', async({request})=>{
    const response = await request.post('https://api.valentinos-magic-beans.click/orders/lookup',{
        data: orderSearchData
    });

    const bodyRes = await response.json();
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