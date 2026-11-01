# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\pet-store-pet.spec.ts >> PET_MODULE - Pet API Tests >> TS003_TC008 - Validate GET pet by ID returns details of newly updated pet @master @sanity @api
- Location: tests\api\pet-store-pet.spec.ts:707:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
```

# Test source

```ts
  635 | 
  636 |         expect(responseBody).not.toBeNull();
  637 |         expect(response.headers()).not.toBeNull();
  638 | 
  639 |     });
  640 | 
  641 |     test('TS003_TC005 - Validate PUT update pet response type is JSON @master @sanity @api', async ({ request }) => {
  642 |         const petPayload = RandomDataUtil.generatePetPayload();
  643 |        // petPayload.id = parseInt(PET_ID);
  644 | 
  645 |         const response = await request.put(`${BASE_URL}${Routes.updatePetById(PET_ID)}`, {
  646 |             headers: {
  647 |                 'accept': 'application/json',
  648 |                 'Content-Type': 'application/json'
  649 |             },
  650 |             data: petPayload
  651 |         });
  652 | 
  653 |         expect(response.status()).toBe(200);
  654 |         const responseHeaders = response.headers();
  655 |         expect(responseHeaders['content-type']).toContain('application/json');
  656 |         console.log('Response Status:', response.status());
  657 |         console.log('Response Headers:', response.headers());
  658 |     });
  659 | 
  660 |     test('TS003_TC006 - Validate PUT update pet response body matches JSON schema @master @regression @api', async ({ request }) => {
  661 |         const petPayload = RandomDataUtil.generatePetPayload();
  662 |       //  petPayload.id = parseInt(PET_ID);
  663 | 
  664 |         const response = await request.put(`${BASE_URL}${Routes.updatePetById(PET_ID)}`, {
  665 |             headers: {
  666 |                 'accept': 'application/json',
  667 |                 'Content-Type': 'application/json'
  668 |             },
  669 |             data: petPayload
  670 |         });
  671 | 
  672 |         expect(response.status()).toBe(200);
  673 |         const responseBody = await response.json();
  674 | 
  675 |         const schemaPath = path.resolve(__dirname, '../../api/schemas/PET/PUT.json');
  676 |         const isValid = await validateSchema(responseBody, schemaPath);
  677 |         expect(isValid).toBeTruthy();
  678 |     });
  679 | 
  680 |     test('TS003_TC007 - Validate PUT update pet response body contains details as provided in request @master @sanity @api', async ({ request }) => {
  681 |         const petPayload:any = RandomDataUtil.generatePetPayload();
  682 |       //  petPayload.id = parseInt(PET_ID);
  683 | 
  684 |         const response = await request.put(`${BASE_URL}${Routes.updatePetById(PET_ID)}`, {
  685 |             headers: {
  686 |                 'accept': 'application/json',
  687 |                 'Content-Type': 'application/json'
  688 |             },
  689 |             data: petPayload
  690 |         });
  691 | 
  692 |         expect(response.status()).toBe(200);
  693 |         const responseBody = await response.json();
  694 |         console.log('Request Payload:', JSON.stringify(petPayload, null, 2));
  695 |         console.log('Response Body:', JSON.stringify(responseBody, null, 2));
  696 |         
  697 |         expect(responseBody.id).toBe(petPayload.id);
  698 |         expect(responseBody.name).toBe(petPayload.name);
  699 |         expect(responseBody.category.id).toBe(petPayload.category.id);
  700 |         expect(responseBody.category.name).toBe(petPayload.category.name);
  701 |         expect(responseBody.photoUrls).toEqual(petPayload.photoUrls);
  702 |         expect(responseBody.tags[0].id).toBe(petPayload.tags[0].id);
  703 |         expect(responseBody.tags[0].name).toBe(petPayload.tags[0].name);
  704 |         expect(responseBody.status).toBe(petPayload.status);
  705 |     });
  706 | 
  707 |     test('TS003_TC008 - Validate GET pet by ID returns details of newly updated pet @master @sanity @api', async ({ request }) => {
  708 |         const petPayload: any = RandomDataUtil.generatePetPayload();
  709 |      //   petPayload.id = parseInt(PET_ID);
  710 | 
  711 |         // Step 1: Update a pet via PUT
  712 |         await test.step('1) Update pet via PUT', async () => {
  713 |             const updateResponse = await request.put(`${BASE_URL}${Routes.updatePetById(PET_ID)}`, {
  714 |                 headers: {
  715 |                     'accept': 'application/json',
  716 |                     'Content-Type': 'application/json'
  717 |                 },
  718 |                 data: petPayload
  719 |             });
  720 | 
  721 |             expect(updateResponse.status()).toBe(200);
  722 |         });
  723 | 
  724 |         // Step 2: GET the updated pet by its ID
  725 |         await test.step('2) GET pet by updated ID', async () => {
  726 |             const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
  727 |                 headers: {
  728 |                     'accept': 'application/json'
  729 |                 }
  730 |             });
  731 | 
  732 |             console.log('Response Status:', response.status());
  733 |             console.log('Response Body:', JSON.stringify(await response.json(), null, 2));
  734 | 
> 735 |             expect(response.status()).toBe(200);
      |                                       ^ Error: expect(received).toBe(expected) // Object.is equality
  736 |             const responseBody = await response.json();
  737 |             expect(responseBody.id).toBe(petPayload.id);
  738 |             expect(responseBody.name).toBe(petPayload.name);
  739 |         });
  740 |     });
  741 | 
  742 |     test('TS003_TC009 - Validate PUT update pet response headers match spec @master @regression @api', async ({ request }) => {
  743 |         const petPayload:any = RandomDataUtil.generatePetPayload();
  744 |       //  petPayload.id = parseInt(PET_ID);
  745 | 
  746 |         const response = await request.put(`${BASE_URL}${Routes.updatePetById(PET_ID)}`, {
  747 |             headers: {
  748 |                 'accept': 'application/json',
  749 |                 'Content-Type': 'application/json'
  750 |             },
  751 |             data: petPayload
  752 |         });
  753 | 
  754 |         expect(response.status()).toBe(200);
  755 |         const responseHeaders = response.headers();
  756 | 
  757 |         expect(responseHeaders['content-type']).toContain('application/json');
  758 |         expect(responseHeaders['access-control-allow-origin']).toBeDefined();
  759 |         expect(responseHeaders['access-control-allow-methods']).toBeDefined();
  760 |         expect(responseHeaders['access-control-allow-headers']).toBeDefined();
  761 |         expect(responseHeaders['server']).toBeDefined();
  762 |     });
  763 | 
  764 |     test('TS003_TC010 - Validate detailed response headers @master @regression @api', async ({ request }) => {
  765 |         const petPayload:any = RandomDataUtil.generatePetPayload();
  766 |        // petPayload.id = parseInt(PET_ID);
  767 | 
  768 |         const response = await request.put(`${BASE_URL}${Routes.updatePetById(PET_ID)}`, {
  769 |             headers: {
  770 |                 'accept': 'application/json',
  771 |                 'Content-Type': 'application/json'
  772 |             },
  773 |             data: petPayload
  774 |         });
  775 | 
  776 |         expect(response.status()).toBe(200);
  777 |         const responseHeaders = response.headers();
  778 | 
  779 |         // Required headers per spec
  780 |         expect(responseHeaders['content-type']).toContain('application/json');
  781 |         expect(responseHeaders['server']).toBeDefined();
  782 |         expect(responseHeaders['date']).toBeDefined();
  783 |         expect(responseHeaders['access-control-allow-origin']).toBeDefined();
  784 |         expect(responseHeaders['access-control-allow-methods']).toBeDefined();
  785 |         expect(responseHeaders['access-control-allow-headers']).toBeDefined();
  786 |     });
  787 | });
```