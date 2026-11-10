# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/pet-store-pet.spec.ts >> PET_MODULE - Pet API Tests >> TS004_TC001 - Validate DELETE pet returns status code within 2XX @master @sanity @api
- Location: tests/api/pet-store-pet.spec.ts:656:9

# Error details

```
Error: apiRequestContext.post: write EPROTO 408DB9C5837B0000:error:0A00010B:SSL routines:tls_validate_record_header:wrong version number:../deps/openssl/openssl/ssl/record/methods/tlsany_meth.c:77:

Call log:
  - → POST https://petstore.swagger.io/v2/pet
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.8078.4 Safari/537.36
    - accept: application/json
    - accept-encoding: gzip,deflate,br
    - Content-Type: application/json
    - content-length: 134

```

# Test source

```ts
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
  647 |         expect(responseHeaders['access-control-allow-origin']).toBeDefined();
  648 |         expect(responseHeaders['access-control-allow-methods']).toBeDefined();
  649 |         expect(responseHeaders['access-control-allow-headers']).toBeDefined();
  650 |     });
  651 | 
  652 |     // ---------------------------------------------------------
  653 |     // DELETE - Delete Pet Tests (TS004)
  654 |     // ---------------------------------------------------------
  655 | 
  656 |     test('TS004_TC001 - Validate DELETE pet returns status code within 2XX @master @sanity @api', async ({ request }) => {
  657 |         const petPayload:any = RandomDataUtil.generateNewPetPayload(parseInt(PET_ID));
  658 | 
  659 |         // Pre-step: Create pet to delete
  660 |         await test.step('Create pet for deletion', async () => {
> 661 |             await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
      |                           ^ Error: apiRequestContext.post: write EPROTO 408DB9C5837B0000:error:0A00010B:SSL routines:tls_validate_record_header:wrong version number:../deps/openssl/openssl/ssl/record/methods/tlsany_meth.c:77:
  662 |                 headers: {
  663 |                     'accept': 'application/json',
  664 |                     'Content-Type': 'application/json'
  665 |                 },
  666 |                 data: petPayload
  667 |             });
  668 |         });
  669 | 
  670 |         // Execute DELETE request
  671 |         const response = await request.delete(`${BASE_URL}${Routes.getPetByPetId(petPayload.id)}`, {
  672 |             headers: {
  673 |                 'accept': 'application/json'
  674 |             }
  675 |         });
  676 | 
  677 |         console.log('Response Status:', response.status());
  678 | 
  679 |         const responseText = await response.text();
  680 |         if (responseText) {
  681 |             console.log('Response Body:', JSON.stringify(JSON.parse(responseText), null, 2));
  682 |         }
  683 | 
  684 |         // Assert that the response status code is in the 2XX range
  685 |         expect(response.status()).toBeLessThan(300);
  686 |     });
  687 | 
  688 |     test('TS004_TC002 - Validate DELETE pet returns 200 OK @master @sanity @api', async ({ request }) => {
  689 |         // NOTE: Petstore /v2/pet returns 200 (not 204) per API doc
  690 |         const petPayload:any = RandomDataUtil.generateNewPetPayload(Date.now());
  691 | 
  692 |         // Pre-step: Create pet to delete
  693 |         await test.step('Create pet for deletion', async () => {
  694 |             const createResponse = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
  695 |                 headers: {
  696 |                     'accept': 'application/json',
  697 |                     'Content-Type': 'application/json'
  698 |                 },
  699 |                 data: petPayload
  700 |             });
  701 |             expect(createResponse.status()).toBe(200);
  702 |         });
  703 | 
  704 |         const response = await request.delete(`${BASE_URL}${Routes.getPetByPetId(petPayload.id)}`, {
  705 |             headers: {
  706 |                 'accept': 'application/json'
  707 |             }
  708 |         });
  709 | 
  710 |         console.log('Response Status:', response.status());
  711 |         const responseText = await response.text();
  712 |         if (responseText) {
  713 | 
  714 | 
  715 |              
  716 |             const responseBody = JSON.parse(responseText);
  717 |             console.log('Response Body:', JSON.stringify(responseBody, null, 2));
  718 |         }
  719 | 
  720 |         //Assert that the response status code is 200 OK
  721 |         expect(response.status()).toBe(200);
  722 |         expect(response.statusText()).toBe('OK');
  723 |     });
  724 | 
  725 |     test('TS004_TC003 - Validate DELETE pet returns empty response body and non-empty headers @master @regression @api', async ({ request }) => {
  726 |         const petPayload:any = RandomDataUtil.generateNewPetPayload(Date.now());
  727 | 
  728 |         // Pre-step: Create pet to delete
  729 |         await test.step('Create pet for deletion', async () => {
  730 |             const createResponse = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
  731 |                 headers: {
  732 |                     'accept': 'application/json',
  733 |                     'Content-Type': 'application/json'
  734 |                 },
  735 |                 data: petPayload
  736 |             });
  737 |             expect(createResponse.status()).toBe(200);
  738 |         });
  739 | 
  740 |         const response = await request.delete(`${BASE_URL}${Routes.getPetByPetId(petPayload.id)}`, {
  741 |             headers: {
  742 |                 'accept': 'application/json'
  743 |             }
  744 |         });
  745 | 
  746 |         const responseText = await response.text();
  747 |         let responseBody = null;
  748 |         if (responseText) {
  749 |             responseBody = JSON.parse(responseText);
  750 |         }
  751 | 
  752 |         // For delete, response may have a message body (code, type, message)
  753 |         expect(responseBody).not.toBeNull();
  754 |         expect(response.headers()).not.toBeNull();
  755 |     });
  756 | 
  757 |     test('TS004_TC004 - Validate GET pet by ID returns 404 after DELETE @master @sanity @api', async ({ request }) => {
  758 |         const petPayload:any = RandomDataUtil.generateNewPetPayload(Date.now());
  759 | 
  760 |         // Pre-step: Create pet
  761 |         await test.step('Create pet', async () => {
```