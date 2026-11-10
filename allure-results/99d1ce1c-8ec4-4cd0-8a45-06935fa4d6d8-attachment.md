# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/store.spec.ts >> STORE_MODULE - Store API Tests >> TS002_TC003 - Validate POST place order returns response body when request body is sent @master @sanity @api
- Location: tests/api/store.spec.ts:494:9

# Error details

```
Error: apiRequestContext.post: write EPROTO 406D1A8122720000:error:0A00010B:SSL routines:tls_validate_record_header:wrong version number:../deps/openssl/openssl/ssl/record/methods/tlsany_meth.c:77:

Call log:
  - → POST https://petstore.swagger.io/v2/store/order
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.8078.4 Safari/537.36
    - accept: application/json
    - accept-encoding: gzip,deflate,br
    - Content-Type: application/json
    - content-length: 104

```

# Test source

```ts
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
  462 |         // Cleanup
  463 |         const responseBody = await response.json();
  464 |         await request.delete(`${BASE_URL}${Routes.deleteOrder(responseBody.id)}`, {
  465 |             headers: { 'accept': 'application/json' }
  466 |         });
  467 | 
  468 |     });
  469 | 
  470 |     test('TS002_TC002 - Validate POST place order returns 200 OK @master @sanity @api', async ({ request }) => {
  471 |         const orderPayload = RandomDataUtil.generateOrderPayload();
  472 | 
  473 |         const response = await request.post(`${BASE_URL}${Routes.placeOrder()}`, {
  474 |             headers: {
  475 |                 'accept': 'application/json',
  476 |                 'Content-Type': 'application/json'
  477 |             },
  478 |             data: orderPayload
  479 |         });
  480 | 
  481 |         console.log('Response Status:', response.status());
  482 |         const responseBody = await response.json();
  483 |         console.log('Response Body:', JSON.stringify(responseBody, null, 2));
  484 | 
  485 |         expect(response.status()).toBe(200);
  486 |         expect(response.statusText()).toBe('OK');
  487 | 
  488 |         // Cleanup
  489 |         await request.delete(`${BASE_URL}${Routes.deleteOrder(responseBody.id)}`, {
  490 |             headers: { 'accept': 'application/json' }
  491 |         });
  492 |     });
  493 | 
  494 |     test('TS002_TC003 - Validate POST place order returns response body when request body is sent @master @sanity @api', async ({ request }) => {
  495 |         const orderPayload = RandomDataUtil.generateOrderPayload();
  496 | 
> 497 |         const response = await request.post(`${BASE_URL}${Routes.placeOrder()}`, {
      |                                        ^ Error: apiRequestContext.post: write EPROTO 406D1A8122720000:error:0A00010B:SSL routines:tls_validate_record_header:wrong version number:../deps/openssl/openssl/ssl/record/methods/tlsany_meth.c:77:
  498 |             headers: {
  499 |                 'accept': 'application/json',
  500 |                 'Content-Type': 'application/json'
  501 |             },
  502 |             data: orderPayload
  503 |         });
  504 | 
  505 |         expect(response.status()).toBe(200);
  506 | 
  507 |         // Cleanup
  508 |         const responseBody = await response.json();
  509 |         await request.delete(`${BASE_URL}${Routes.deleteOrder(responseBody.id)}`, {
  510 |             headers: { 'accept': 'application/json' }
  511 |         });
  512 |     });
  513 | 
  514 |     test('TS002_TC004 - Validate POST place order returns non-empty response body and headers @master @regression @api', async ({ request }) => {
  515 |         const orderPayload = RandomDataUtil.generateOrderPayload();
  516 | 
  517 |         const response = await request.post(`${BASE_URL}${Routes.placeOrder()}`, {
  518 |             headers: {
  519 |                 'accept': 'application/json',
  520 |                 'Content-Type': 'application/json'
  521 |             },
  522 |             data: orderPayload
  523 |         });
  524 | 
  525 |         const responseBody = await response.json();
  526 | 
  527 |         expect(responseBody).not.toBeNull();
  528 |         expect(response.headers()).not.toBeNull();
  529 | 
  530 |         // Cleanup
  531 |         await request.delete(`${BASE_URL}${Routes.deleteOrder(responseBody.id)}`, {
  532 |             headers: { 'accept': 'application/json' }
  533 |         });
  534 |     });
  535 | 
  536 |     test('TS002_TC005 - Validate POST place order response type is JSON @master @sanity @api', async ({ request }) => {
  537 |         const orderPayload = RandomDataUtil.generateOrderPayload();
  538 | 
  539 |         const response = await request.post(`${BASE_URL}${Routes.placeOrder()}`, {
  540 |             headers: {
  541 |                 'accept': 'application/json',
  542 |                 'Content-Type': 'application/json'
  543 |             },
  544 |             data: orderPayload
  545 |         });
  546 | 
  547 |         expect(response.status()).toBe(200);
  548 |         const responseHeaders = response.headers();
  549 |         expect(responseHeaders['content-type']).toContain('application/json');
  550 |         console.log('Response Status:', response.status());
  551 |         console.log('Response Headers:', response.headers());
  552 | 
  553 |         // Cleanup
  554 |         const responseBody = await response.json();
  555 |         await request.delete(`${BASE_URL}${Routes.deleteOrder(responseBody.id)}`, {
  556 |             headers: { 'accept': 'application/json' }
  557 |         });
  558 |     });
  559 | 
  560 |     test('TS002_TC006 - Validate POST place order response body matches JSON schema @master @regression @api', async ({ request }) => {
  561 |         const orderPayload = RandomDataUtil.generateOrderPayload();
  562 | 
  563 |         const response = await request.post(`${BASE_URL}${Routes.placeOrder()}`, {
  564 |             headers: {
  565 |                 'accept': 'application/json',
  566 |                 'Content-Type': 'application/json'
  567 |             },
  568 |             data: orderPayload
  569 |         });
  570 | 
  571 |         expect(response.status()).toBe(200);
  572 |         const responseBody = await response.json();
  573 | 
  574 |         const schemaPath = path.resolve(__dirname, '../../api/schemas/STORE/POST.json');
  575 |         const isValid = await validateSchema(responseBody, schemaPath);
  576 |         expect(isValid).toBeTruthy();
  577 | 
  578 |         // Cleanup
  579 |         await request.delete(`${BASE_URL}${Routes.deleteOrder(responseBody.id)}`, {
  580 |             headers: { 'accept': 'application/json' }
  581 |         });
  582 |     });
  583 | 
  584 |     test('TS002_TC007 - Validate POST place order response body contains details as provided in request @master @sanity @api', async ({ request }) => {
  585 |         const orderPayload: any = RandomDataUtil.generateOrderPayload();
  586 | 
  587 |         const response = await request.post(`${BASE_URL}${Routes.placeOrder()}`, {
  588 |             headers: {
  589 |                 'accept': 'application/json',
  590 |                 'Content-Type': 'application/json'
  591 |             },
  592 |             data: orderPayload
  593 |         });
  594 | 
  595 |         expect(response.status()).toBe(200);
  596 |         const responseBody = await response.json();
  597 |         console.log('Request Payload:', JSON.stringify(orderPayload, null, 2));
```