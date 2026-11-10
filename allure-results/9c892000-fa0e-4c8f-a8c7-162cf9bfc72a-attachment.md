# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/pet-store-pet.spec.ts >> PET_MODULE - Pet API Tests >> TS003_TC007 - Validate PUT update pet response body contains details as provided in request @master @sanity @api
- Location: tests/api/pet-store-pet.spec.ts:543:9

# Error details

```
Error: apiRequestContext.put: write EPROTO 409D931CE9710000:error:0A00010B:SSL routines:tls_validate_record_header:wrong version number:../deps/openssl/openssl/ssl/record/methods/tlsany_meth.c:77:

Call log:
  - → PUT https://petstore.swagger.io/v2/pet
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.8078.4 Safari/537.36
    - accept: application/json
    - accept-encoding: gzip,deflate,br
    - Content-Type: application/json
    - content-length: 137

```

# Test source

```ts
  446 |         expect(response.status()).toBeLessThan(300);
  447 |     });
  448 | 
  449 |     test('TS003_TC002 - Validate PUT update pet returns 200 OK @master @sanity @api', async ({ request }) => {
  450 |         // NOTE: Petstore /v2/pet returns 200 (not 201) per API doc
  451 |         const petPayload = RandomDataUtil.generateNewPetPayload(parseInt(PET_ID));
  452 |      //   petPayload.id = parseInt(PET_ID);
  453 | 
  454 |         const response = await request.put(`${BASE_URL}${Routes.updatePetById(PET_ID)}`, {
  455 |             headers: {
  456 |                 'accept': 'application/json',
  457 |                 'Content-Type': 'application/json'
  458 |             },
  459 |             data: petPayload
  460 |         });
  461 | 
  462 |         console.log('Response Status:', response.status());
  463 |         const responseBody = await response.json();
  464 |         console.log('Response Body:', JSON.stringify(responseBody, null, 2));
  465 | 
  466 |         expect(response.status()).toBe(200);
  467 |         expect(response.statusText()).toBe('OK');
  468 |     });
  469 | 
  470 |     test('TS003_TC003 - Validate PUT update pet returns response body when request body is sent @master @sanity @api', async ({ request }) => {
  471 |         const petPayload = RandomDataUtil.generateNewPetPayload(parseInt(PET_ID));
  472 |    //     petPayload.id = parseInt(PET_ID);
  473 | 
  474 |         const response = await request.put(`${BASE_URL}${Routes.updatePetById(PET_ID)}`, {
  475 |             headers: {
  476 |                 'accept': 'application/json',
  477 |                 'Content-Type': 'application/json'
  478 |             },
  479 |             data: petPayload
  480 |         });
  481 | 
  482 |         expect(response.status()).toBe(200);
  483 |     });
  484 | 
  485 |     test('TS003_TC004 - Validate PUT update pet returns non-empty response body and headers @master @regression @api', async ({ request }) => {
  486 |         const petPayload = RandomDataUtil.generateNewPetPayload(parseInt(PET_ID));
  487 |      //   petPayload.id = parseInt(PET_ID);
  488 | 
  489 |         const response = await request.put(`${BASE_URL}${Routes.updatePetById(PET_ID)}`, {
  490 |             headers: {
  491 |                 'accept': 'application/json',
  492 |                 'Content-Type': 'application/json'
  493 |             },
  494 |             data: petPayload
  495 |         });
  496 | 
  497 |         const responseBody = await response.json();
  498 | 
  499 |         expect(responseBody).not.toBeNull();
  500 |         expect(response.headers()).not.toBeNull();
  501 | 
  502 |     });
  503 | 
  504 |     test('TS003_TC005 - Validate PUT update pet response type is JSON @master @sanity @api', async ({ request }) => {
  505 |         const petPayload = RandomDataUtil.generateNewPetPayload(parseInt(PET_ID));
  506 |        // petPayload.id = parseInt(PET_ID);
  507 | 
  508 |         const response = await request.put(`${BASE_URL}${Routes.updatePetById(PET_ID)}`, {
  509 |             headers: {
  510 |                 'accept': 'application/json',
  511 |                 'Content-Type': 'application/json'
  512 |             },
  513 |             data: petPayload
  514 |         });
  515 | 
  516 |         expect(response.status()).toBe(200);
  517 |         const responseHeaders = response.headers();
  518 |         expect(responseHeaders['content-type']).toContain('application/json');
  519 |         console.log('Response Status:', response.status());
  520 |         console.log('Response Headers:', response.headers());
  521 |     });
  522 | 
  523 |     test('TS003_TC006 - Validate PUT update pet response body matches JSON schema @master @regression @api', async ({ request }) => {
  524 |         const petPayload: any = RandomDataUtil.generateNewPetPayload(parseInt(PET_ID));
  525 |       //  petPayload.id = parseInt(PET_ID);
  526 | 
  527 |         const response = await request.put(`${BASE_URL}${Routes.updatePetById(PET_ID)}`, {
  528 |             headers: {
  529 |                 'accept': 'application/json',
  530 |                 'Content-Type': 'application/json'
  531 |             },
  532 |             data: petPayload
  533 |         });
  534 | 
  535 |         expect(response.status()).toBe(200);
  536 |         const responseBody = await response.json();
  537 | 
  538 |         const schemaPath = path.resolve(__dirname, '../../api/schemas/PET/PUT.json');
  539 |         const isValid = await validateSchema(responseBody, schemaPath);
  540 |         expect(isValid).toBeTruthy();
  541 |     });
  542 | 
  543 |     test('TS003_TC007 - Validate PUT update pet response body contains details as provided in request @master @sanity @api', async ({ request }) => {
  544 |      const petPayload: any = RandomDataUtil.generateNewPetPayload(parseInt(PET_ID));      //  petPayload.id = parseInt(PET_ID);
  545 | 
> 546 |         const response = await request.put(`${BASE_URL}${Routes.updatePetById(PET_ID)}`, {
      |                                        ^ Error: apiRequestContext.put: write EPROTO 409D931CE9710000:error:0A00010B:SSL routines:tls_validate_record_header:wrong version number:../deps/openssl/openssl/ssl/record/methods/tlsany_meth.c:77:
  547 |             headers: {
  548 |                 'accept': 'application/json',
  549 |                 'Content-Type': 'application/json'
  550 |             },
  551 |             data: petPayload
  552 |         });
  553 | 
  554 |         expect(response.status()).toBe(200);
  555 |         const responseBody = await response.json();
  556 |         console.log('Request Payload:', JSON.stringify(petPayload, null, 2));
  557 |         console.log('Response Body:', JSON.stringify(responseBody, null, 2));
  558 |         
  559 |         expect(responseBody.id).toBe(petPayload.id);
  560 |         expect(responseBody.name).toBe(petPayload.name);
  561 |         expect(responseBody.category.id).toBe(petPayload.category.id);
  562 |         expect(responseBody.category.name).toBe(petPayload.category.name);
  563 |         expect(responseBody.photoUrls).toEqual(petPayload.photoUrls);
  564 |         expect(responseBody.tags[0].id).toBe(petPayload.tags[0].id);
  565 |         expect(responseBody.tags[0].name).toBe(petPayload.tags[0].name);
  566 |         expect(responseBody.status).toBe(petPayload.status);
  567 |     });
  568 | 
  569 |     test('TS003_TC008 - Validate GET pet by ID returns details of newly updated pet @master @sanity @api', async ({ request }) => {
  570 |         const petPayload: any = RandomDataUtil.generateNewPetPayload(parseInt(PET_ID));
  571 |      //   petPayload.id = parseInt(PET_ID);
  572 | 
  573 |         // Step 1: Update a pet via PUT
  574 |         await test.step('1) Update pet via PUT', async () => {
  575 |             const updateResponse = await request.put(`${BASE_URL}${Routes.updatePetById(PET_ID)}`, {
  576 |                 headers: {
  577 |                     'accept': 'application/json',
  578 |                     'Content-Type': 'application/json'
  579 |                 },
  580 |                 data: petPayload
  581 |             });
  582 | 
  583 |             expect(updateResponse.status()).toBe(200);
  584 | 
  585 |                console.log("UPDATED RESPONSE => "+updateResponse);
  586 |         });
  587 | 
  588 |      
  589 | 
  590 |         // Step 2: GET the updated pet by its ID
  591 |         await test.step('2) GET pet by updated ID', async () => {
  592 |             const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
  593 |                 headers: {
  594 |                     'accept': 'application/json'
  595 |                 }
  596 |             });
  597 | 
  598 |             console.log('Response Status:', response.status());
  599 |             console.log('Response Body:', JSON.stringify(await response.json(), null, 2));
  600 | 
  601 |             expect(response.status()).toBe(200);
  602 |             const responseBody = await response.json();
  603 |             expect(responseBody.id).toBe(petPayload.id);
  604 |             expect(responseBody.name).toBe(petPayload.name);
  605 |         });
  606 |     });
  607 | 
  608 |     test('TS003_TC009 - Validate PUT update pet response headers match spec @master @regression @api', async ({ request }) => {
  609 |         const petPayload: any = RandomDataUtil.generateNewPetPayload(parseInt(PET_ID));
  610 | 
  611 |         const response = await request.put(`${BASE_URL}${Routes.updatePetById(PET_ID)}`, {
  612 |             headers: {
  613 |                 'accept': 'application/json',
  614 |                 'Content-Type': 'application/json'
  615 |             },
  616 |             data: petPayload
  617 |         });
  618 | 
  619 |         expect(response.status()).toBe(200);
  620 |         const responseHeaders = response.headers();
  621 | 
  622 |         expect(responseHeaders['content-type']).toContain('application/json');
  623 |         expect(responseHeaders['access-control-allow-origin']).toBeDefined();
  624 |         expect(responseHeaders['access-control-allow-methods']).toBeDefined();
  625 |         expect(responseHeaders['access-control-allow-headers']).toBeDefined();
  626 |         expect(responseHeaders['server']).toBeDefined();
  627 |     });
  628 | 
  629 |     test('TS003_TC010 - Validate detailed response headers @master @regression @api', async ({ request }) => {
  630 |         const petPayload: any = RandomDataUtil.generateNewPetPayload(parseInt(PET_ID));
  631 | 
  632 |         const response = await request.put(`${BASE_URL}${Routes.updatePetById(PET_ID)}`, {
  633 |             headers: {
  634 |                 'accept': 'application/json',
  635 |                 'Content-Type': 'application/json'
  636 |             },
  637 |             data: petPayload
  638 |         });
  639 | 
  640 |         expect(response.status()).toBe(200);
  641 |         const responseHeaders = response.headers();
  642 | 
  643 |         // Required headers per spec
  644 |         expect(responseHeaders['content-type']).toContain('application/json');
  645 |         expect(responseHeaders['server']).toBeDefined();
  646 |         expect(responseHeaders['date']).toBeDefined();
```