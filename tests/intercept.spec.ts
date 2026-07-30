import { expect, test } from "@playwright/test";

test('Listing route requests', async ({page})=>{
    page.on('request', (request)=>{
        let resourceType = request.resourceType();
        if(resourceType === 'fetch' || resourceType === 'xhr'){
            console.log(request.method() + " " + request.url());
        }
    })

    await page.goto('https://valentinos-magic-beans.click/products');
});

test('Listing until page finish loading', async({page})=>{
    page.on('request', async(request)=>{
        let resourceType = request.resourceType();
        if(resourceType === 'fetch' || resourceType === 'xhr'){
            console.log(request.method() + " " + request.url());
            console.log(await request.allHeaders());
            let res = await request.response();
            console.log(await res?.json());
        }
    });

    await page.goto('https://valentinos-magic-beans.click/products',{
        waitUntil: "networkidle"
    });
});

test('Intercepting - Preventing image', async({page})=>{
    
    await page.route('**/*', async(route)=>{
        let rcType = route.request().resourceType();
        if(rcType === 'image'){
            route.abort();
        }else{
            console.log(rcType, route.request().url());
            route.continue();
        }
    });

    await page.goto('https://valentinos-magic-beans.click/products',{
        waitUntil: "networkidle"
    });
});

test('Intercepting - adjust /products responses', async({page})=>{
    await page.route('**/*', async(route)=>{
        const rcType = route.request().resourceType();
        if(rcType === 'xhr' || rcType === 'fetch'){
            if(route.request().url().endsWith('products')){
                await route.fulfill({
                    contentType: 'application/json',
                    status: 200,
                    body: JSON.stringify({
                        success: true,
                        data:[
                                {
                                    id: "100",
                                    name: "Coffee 01",
                                    price: -55.5
                                },
                                {
                                    id: "101",
                                    name: "Coffee 02"
                                },
                        ]
                    })
                });
            }
        }else{
            route.continue();
        }
    });

    await page.goto('https://valentinos-magic-beans.click/products', {
        waitUntil: "networkidle"
    });
});