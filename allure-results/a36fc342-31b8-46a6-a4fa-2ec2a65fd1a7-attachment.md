# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/store.spec.ts >> STORE_MODULE - Store API Tests >> TS001_TC008 - Validate GET store order is idempotent @master @regression @api
- Location: tests/api/store.spec.ts:358:9

# Error details

```
Error: apiRequestContext.post: write EPROTO 405D38A8A6780000:error:0A00010B:SSL routines:tls_validate_record_header:wrong version number:../deps/openssl/openssl/ssl/record/methods/tlsany_meth.c:77:

Call log:
  - → POST https://petstore.swagger.io/v2/store/order
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.8078.4 Safari/537.36
    - accept: application/json
    - accept-encoding: gzip,deflate,br
    - Content-Type: application/json
    - content-length: 105

```

# Test source

```ts
  261 |         });
  262 | 
  263 |         // Petstore mock API may return 404 since it does not persist orders
  264 |         expect([200, 404]).toContain(response.status());
  265 |         const responseHeaders = response.headers();
  266 |         expect(responseHeaders['content-type']).toContain('application/json');
  267 |         console.log('Response Status:', response.status());
  268 |         console.log('Response Headers:', response.headers());
  269 | 
  270 |             // Clean up
  271 |         await request.delete(`${BASE_URL}${Routes.deleteOrder(createdBody.id)}`, {
  272 |             headers: { 'accept': 'application/json' }
  273 |         });
  274 |     });
  275 | 
  276 |     test('TS001_TC006 - Validate GET store order response body matches JSON schema @master @regression @api', async ({ request }) => {
  277 |         // Step 1: Create an order via POST
  278 |         const orderPayload: any = RandomDataUtil.generateOrderPayload();
  279 |         const createResponse = await request.post(`${BASE_URL}${Routes.placeOrder()}`, {
  280 |             headers: {
  281 |                 'accept': 'application/json',
  282 |                 'Content-Type': 'application/json'
  283 |             },
  284 |             data: orderPayload
  285 |         });
  286 |         expect(createResponse.status()).toBe(200);
  287 |         const createdBody = await createResponse.json();
  288 | 
  289 | 
  290 |         // Step 2: GET the order by ID
  291 |         const response = await request.get(`${BASE_URL}${Routes.getOrderById(createdBody.id)}`, {
  292 |             headers: {
  293 |                 'accept': 'application/json'
  294 |             }
  295 |         });
  296 | 
  297 |         // Petstore mock API may return 404 since it does not persist orders
  298 |         expect([200, 404]).toContain(response.status());
  299 | 
  300 |         if (response.status() === 200) {
  301 |             const responseBody = await response.json();
  302 |             const schemaPath = path.resolve(__dirname, '../../api/schemas/STORE/GET.json');
  303 |             const isValid = await validateSchema(responseBody, schemaPath);
  304 |             expect(isValid).toBeTruthy();
  305 |         }
  306 | 
  307 |         
  308 |         // Clean up
  309 |         await request.delete(`${BASE_URL}${Routes.deleteOrder(createdBody.id)}`, {
  310 |             headers: { 'accept': 'application/json' }
  311 |         });
  312 |     });
  313 | 
  314 |     test('TS001_TC007 - Validate GET store order returns details of existing order @master @sanity @api', async ({ request }) => {
  315 |         // Step 1: Create an order via POST
  316 |         const orderPayload: any = RandomDataUtil.generateOrderPayload();
  317 |         const createResponse = await request.post(`${BASE_URL}${Routes.placeOrder()}`, {
  318 |             headers: {
  319 |                 'accept': 'application/json',
  320 |                 'Content-Type': 'application/json'
  321 |             },
  322 |             data: orderPayload
  323 |         });
  324 |         expect(createResponse.status()).toBe(200);
  325 |         const createdBody = await createResponse.json();
  326 | 
  327 | 
  328 | 
  329 |         // Step 2: GET the order by ID
  330 |         const response = await request.get(`${BASE_URL}${Routes.getOrderById(createdBody.id)}`, {
  331 |             headers: {
  332 |                 'accept': 'application/json'
  333 |             }
  334 |         });
  335 | 
  336 |         // Petstore mock API may return 404 since it does not persist orders
  337 |         expect([200, 404]).toContain(response.status());
  338 | 
  339 |         if (response.status() === 200) {
  340 |             const responseBody = await response.json();
  341 |             console.log('Response Body:', JSON.stringify(responseBody, null, 2));
  342 | 
  343 |             // Validate order details match expected structure
  344 |             expect(responseBody.id).toBe(createdBody.id);
  345 |             expect(responseBody.petId).toBeDefined();
  346 |             expect(responseBody.quantity).toBeDefined();
  347 |             expect(responseBody.shipDate).toBeDefined();
  348 |             expect(responseBody.status).toBeDefined();
  349 |             expect(responseBody.complete).toBeDefined();
  350 |         }
  351 | 
  352 |         // Clean up
  353 |         await request.delete(`${BASE_URL}${Routes.deleteOrder(createdBody.id)}`, {
  354 |             headers: { 'accept': 'application/json' }
  355 |         });
  356 |     });
  357 | 
  358 |     test('TS001_TC008 - Validate GET store order is idempotent @master @regression @api', async ({ request }) => {
  359 |         // Step 1: Create an order via POST
  360 |         const orderPayload: any = RandomDataUtil.generateOrderPayload();
> 361 |         const createResponse = await request.post(`${BASE_URL}${Routes.placeOrder()}`, {
      |                                              ^ Error: apiRequestContext.post: write EPROTO 405D38A8A6780000:error:0A00010B:SSL routines:tls_validate_record_header:wrong version number:../deps/openssl/openssl/ssl/record/methods/tlsany_meth.c:77:
  362 |             headers: {
  363 |                 'accept': 'application/json',
  364 |                 'Content-Type': 'application/json'
  365 |             },
  366 |             data: orderPayload
  367 |         });
  368 |         expect(createResponse.status()).toBe(200);
  369 |         const createdBody = await createResponse.json();
  370 | 
  371 | 
  372 | 
  373 |         // Step 2: GET the order by ID twice
  374 |         const response1 = await request.get(`${BASE_URL}${Routes.getOrderById(createdBody.id)}`, {
  375 |             headers: {
  376 |                 'accept': 'application/json'
  377 |             }
  378 |         });
  379 |         const response2 = await request.get(`${BASE_URL}${Routes.getOrderById(createdBody.id)}`, {
  380 |             headers: {
  381 |                 'accept': 'application/json'
  382 |             }
  383 |         });
  384 | 
  385 |         // Petstore mock API may return 404 since it does not persist orders
  386 |         expect([200, 404]).toContain(response1.status());
  387 |         expect([200, 404]).toContain(response2.status());
  388 | 
  389 |         const body1 = await response1.text();
  390 |         const body2 = await response2.text();
  391 | 
  392 |         // Response bodies should be identical (idempotent GET)
  393 |         expect(body1).toEqual(body2);
  394 | 
  395 |         // Clean up
  396 |         await request.delete(`${BASE_URL}${Routes.deleteOrder(createdBody.id)}`, {
  397 |             headers: { 'accept': 'application/json' }
  398 |         });
  399 |     });
  400 | 
  401 |     test('TS001_TC009 - Validate GET store order response headers match spec @master @regression @api', async ({ request }) => {
  402 |         // Step 1: Create an order via POST
  403 |         const orderPayload: any = RandomDataUtil.generateOrderPayload();
  404 |         const createResponse = await request.post(`${BASE_URL}${Routes.placeOrder()}`, {
  405 |             headers: {
  406 |                 'accept': 'application/json',
  407 |                 'Content-Type': 'application/json'
  408 |             },
  409 |             data: orderPayload
  410 |         });
  411 |         expect(createResponse.status()).toBe(200);
  412 |         const createdBody = await createResponse.json();
  413 | 
  414 | 
  415 | 
  416 |         // Step 2: GET the order by ID
  417 |         const response = await request.get(`${BASE_URL}${Routes.getOrderById(createdBody.id)}`, {
  418 |             headers: {
  419 |                 'accept': 'application/json'
  420 |             }
  421 |         });
  422 | 
  423 |         // Petstore mock API may return 404 since it does not persist orders
  424 |         expect([200, 404]).toContain(response.status());
  425 | 
  426 |         const responseHeaders = response.headers();
  427 | 
  428 |         // Required headers per spec
  429 |         expect(responseHeaders['content-type']).toContain('application/json');
  430 |         expect(responseHeaders['server']).toBeDefined();
  431 |         expect(responseHeaders['date']).toBeDefined();
  432 |         expect(responseHeaders['access-control-allow-origin']).toBeDefined();
  433 |         expect(responseHeaders['access-control-allow-methods']).toBeDefined();
  434 |         expect(responseHeaders['access-control-allow-headers']).toBeDefined();
  435 | 
  436 |         // Clean up
  437 |         await request.delete(`${BASE_URL}${Routes.deleteOrder(createdBody.id)}`, {
  438 |             headers: { 'accept': 'application/json' }
  439 |         });
  440 |     });
  441 | 
  442 |     // ---------------------------------------------------------
  443 |     // POST - Place Store Order Tests (TS002)
  444 |     // ---------------------------------------------------------
  445 | 
  446 |     test('TS002_TC001 - Validate POST place order returns status code within 2XX @master @sanity @api', async ({ request }) => {
  447 |         const orderPayload = RandomDataUtil.generateOrderPayload();
  448 | 
  449 |         const response = await request.post(`${BASE_URL}${Routes.placeOrder()}`, {
  450 |             headers: {
  451 |                 'accept': 'application/json',
  452 |                 'Content-Type': 'application/json'
  453 |             },
  454 |             data: orderPayload
  455 |         });
  456 | 
  457 |         console.log('Response Status:', response.status());
  458 |         console.log('Response Body:', JSON.stringify(await response.json(), null, 2));
  459 | 
  460 |         expect(response.status()).toBeLessThan(300);
  461 | 
```