# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/store.spec.ts >> STORE_MODULE - Store API Tests >> TS002_TC009 - Validate POST place order response headers match spec @master @regression @api
- Location: tests/api/store.spec.ts:661:9

# Error details

```
Error: apiRequestContext.post: write EPROTO 404D4FED26770000:error:0A00010B:SSL routines:tls_validate_record_header:wrong version number:../deps/openssl/openssl/ssl/record/methods/tlsany_meth.c:77:

Call log:
  - → POST https://petstore.swagger.io/v2/store/order
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.8078.4 Safari/537.36
    - accept: application/json
    - accept-encoding: gzip,deflate,br
    - Content-Type: application/json
    - content-length: 107

```

# Test source

```ts
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
  598 |         console.log('Response Body:', JSON.stringify(responseBody, null, 2));
  599 | 
  600 |         // Note: Petstore API may reformat shipDate (e.g. +0000 vs Z suffix)
  601 |         expect(responseBody.id).toBe(orderPayload.id);
  602 |         expect(responseBody.petId).toBe(orderPayload.petId);
  603 |         expect(responseBody.quantity).toBe(orderPayload.quantity);
  604 |         expect(responseBody.status).toBe(orderPayload.status);
  605 |         expect(responseBody.complete).toBe(orderPayload.complete);
  606 | 
  607 |         // Cleanup
  608 |         await request.delete(`${BASE_URL}${Routes.deleteOrder(responseBody.id)}`, {
  609 |             headers: { 'accept': 'application/json' }
  610 |         });
  611 |     });
  612 | 
  613 |     test('TS002_TC008 - Validate GET order by ID returns details of newly created order @master @sanity @api', async ({ request }) => {
  614 |         const orderPayload: any = RandomDataUtil.generateOrderPayload();
  615 | 
  616 |         // Step 1: Create an order via POST
  617 |         await test.step('1) Create order via POST', async () => {
  618 |             const createResponse = await request.post(`${BASE_URL}${Routes.placeOrder()}`, {
  619 |                 headers: {
  620 |                     'accept': 'application/json',
  621 |                     'Content-Type': 'application/json'
  622 |                 },
  623 |                 data: orderPayload
  624 |             });
  625 | 
  626 |             expect(createResponse.status()).toBe(200);
  627 | 
  628 |             // Cleanup: DELETE the created order
  629 |             await request.delete(`${BASE_URL}${Routes.deleteOrder(orderPayload.id)}`, {
  630 |                 headers: {
  631 |                     'accept': 'application/json'
  632 |                 }
  633 |             });
  634 |         });
  635 | 
  636 |         // Step 2: GET the newly created order by its ID
  637 |         await test.step('2) GET order by newly created ID', async () => {
  638 |             const response = await request.get(`${BASE_URL}${Routes.getOrderById(orderPayload.id)}`, {
  639 |                 headers: {
  640 |                     'accept': 'application/json'
  641 |                 }
  642 |             });
  643 | 
  644 |             console.log('Response Status:', response.status());
  645 |             const responseText = await response.text();
  646 |             if (responseText) {
  647 |                 console.log('Response Body:', responseText);
  648 |             }
  649 | 
  650 |             // Petstore mock API may return 404 since it does not persist orders
  651 |             expect([200, 404]).toContain(response.status());
  652 | 
  653 |             if (response.status() === 200) {
  654 |                 const responseBody = await response.json();
  655 |                 expect(responseBody.id).toBe(orderPayload.id);
  656 |                 expect(responseBody.petId).toBe(orderPayload.petId);
  657 |             }
  658 |         });
  659 |     });
  660 | 
  661 |     test('TS002_TC009 - Validate POST place order response headers match spec @master @regression @api', async ({ request }) => {
  662 |         const orderPayload = RandomDataUtil.generateOrderPayload();
  663 | 
> 664 |         const response = await request.post(`${BASE_URL}${Routes.placeOrder()}`, {
      |                                        ^ Error: apiRequestContext.post: write EPROTO 404D4FED26770000:error:0A00010B:SSL routines:tls_validate_record_header:wrong version number:../deps/openssl/openssl/ssl/record/methods/tlsany_meth.c:77:
  665 |             headers: {
  666 |                 'accept': 'application/json',
  667 |                 'Content-Type': 'application/json'
  668 |             },
  669 |             data: orderPayload
  670 |         });
  671 | 
  672 |         expect(response.status()).toBe(200);
  673 |         const responseHeaders = response.headers();
  674 | 
  675 |         expect(responseHeaders['content-type']).toContain('application/json');
  676 |         expect(responseHeaders['access-control-allow-origin']).toBeDefined();
  677 |         expect(responseHeaders['access-control-allow-methods']).toBeDefined();
  678 |         expect(responseHeaders['access-control-allow-headers']).toBeDefined();
  679 |         expect(responseHeaders['server']).toBeDefined();
  680 | 
  681 |         // Cleanup
  682 |         const responseBody = await response.json();
  683 |         await request.delete(`${BASE_URL}${Routes.deleteOrder(responseBody.id)}`, {
  684 |             headers: {
  685 |                 'accept': 'application/json'
  686 |             }
  687 |         });
  688 |     });
  689 | 
  690 |     // ---------------------------------------------------------
  691 |     // DELETE - Delete Store Order Tests (TS003)
  692 |     // ---------------------------------------------------------
  693 | 
  694 |     test('TS003_TC001 - Validate DELETE store order returns status code within 2XX @master @sanity @api', async ({ request }) => {
  695 |         const orderPayload: any = RandomDataUtil.generateOrderPayload();
  696 | 
  697 |         // Pre-step: Create order to delete
  698 |         await test.step('Create order for deletion', async () => {
  699 |             const createResponse = await request.post(`${BASE_URL}${Routes.placeOrder()}`, {
  700 |                 headers: {
  701 |                     'accept': 'application/json',
  702 |                     'Content-Type': 'application/json'
  703 |                 },
  704 |                 data: orderPayload
  705 |             });
  706 |             expect(createResponse.status()).toBe(200);
  707 |         });
  708 | 
  709 |         // Execute DELETE request
  710 |         const response = await request.delete(`${BASE_URL}${Routes.deleteOrder(orderPayload.id)}`, {
  711 |             headers: {
  712 |                 'accept': 'application/json'
  713 |             }
  714 |         });
  715 | 
  716 |         console.log('Response Status:', response.status());
  717 | 
  718 |         const responseText = await response.text();
  719 |         if (responseText) {
  720 |             console.log('Response Body:', JSON.stringify(JSON.parse(responseText), null, 2));
  721 |         }
  722 | 
  723 |         // Assert that the response status code is in the 2XX range
  724 |         expect(response.status()).toBeLessThan(300);
  725 |     });
  726 | 
  727 |     test('TS003_TC002 - Validate DELETE store order returns 200 OK @master @sanity @api', async ({ request }) => {
  728 |         const orderPayload: any = RandomDataUtil.generateOrderPayload();
  729 | 
  730 |         // Pre-step: Create order to delete
  731 |         await test.step('Create order for deletion', async () => {
  732 |             const createResponse = await request.post(`${BASE_URL}${Routes.placeOrder()}`, {
  733 |                 headers: {
  734 |                     'accept': 'application/json',
  735 |                     'Content-Type': 'application/json'
  736 |                 },
  737 |                 data: orderPayload
  738 |             });
  739 |             expect(createResponse.status()).toBe(200);
  740 |         });
  741 | 
  742 |         const response = await request.delete(`${BASE_URL}${Routes.deleteOrder(orderPayload.id)}`, {
  743 |             headers: {
  744 |                 'accept': 'application/json'
  745 |             }
  746 |         });
  747 | 
  748 |         console.log('Response Status:', response.status());
  749 |         const responseText = await response.text();
  750 |         if (responseText) {
  751 |             const responseBody = JSON.parse(responseText);
  752 |             console.log('Response Body:', JSON.stringify(responseBody, null, 2));
  753 |         }
  754 | 
  755 |         // Assert that the response status code is 200 OK
  756 |         expect(response.status()).toBe(200);
  757 |         expect(response.statusText()).toBe('OK');
  758 |     });
  759 | 
  760 |     test('TS003_TC003 - Validate DELETE store order returns response body and non-empty headers @master @regression @api', async ({ request }) => {
  761 |         const orderPayload: any = RandomDataUtil.generateOrderPayload();
  762 | 
  763 |         // Pre-step: Create order to delete
  764 |         await test.step('Create order for deletion', async () => {
```