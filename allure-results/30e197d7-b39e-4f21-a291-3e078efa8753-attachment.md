# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/pet-store-pet.spec.ts >> PET_MODULE - Pet API Tests >> TS002_TC008 - Validate GET pet by ID returns details of newly created pet @master @sanity @api
- Location: tests/api/pet-store-pet.spec.ts:373:9

# Error details

```
Error: apiRequestContext.post: Client network socket disconnected before secure TLS connection was established (ECONNRESET)
Call log:
  - → POST https://petstore.swagger.io/v2/pet
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.8078.4 Safari/537.36
    - accept: application/json
    - accept-encoding: gzip,deflate,br
    - Content-Type: application/json
    - content-length: 139

```

# Test source

```ts
  278 |         const petPayload = RandomDataUtil.generatePetPayload();
  279 | 
  280 |         const response = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
  281 |             headers: {
  282 |                 'accept': 'application/json',
  283 |                 'Content-Type': 'application/json'
  284 |             },
  285 |             data: petPayload
  286 |         });
  287 | 
  288 |         expect(response.status()).toBe(200);
  289 |     });
  290 | 
  291 |     test('TS002_TC004 - Validate POST add pet returns non-empty response body and headers @master @regression @api', async ({ request }) => {
  292 |         const petPayload = RandomDataUtil.generatePetPayload();
  293 | 
  294 |         const response = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
  295 |             headers: {
  296 |                 'accept': 'application/json',
  297 |                 'Content-Type': 'application/json'
  298 |             },
  299 |             data: petPayload
  300 |         });
  301 | 
  302 |         const responseBody = await response.json();
  303 | 
  304 |         expect(responseBody).not.toBeNull();
  305 |         expect(response.headers()).not.toBeNull();
  306 | 
  307 |     });
  308 | 
  309 |     test('TS002_TC005 - Validate POST add pet response type is JSON @master @sanity @api', async ({ request }) => {
  310 |         const petPayload = RandomDataUtil.generatePetPayload();
  311 | 
  312 |         const response = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
  313 |             headers: {
  314 |                 'accept': 'application/json',
  315 |                 'Content-Type': 'application/json'
  316 |             },
  317 |             data: petPayload
  318 |         });
  319 | 
  320 |         expect(response.status()).toBe(200);
  321 |         const responseHeaders = response.headers();
  322 |         expect(responseHeaders['content-type']).toContain('application/json');
  323 |         console.log('Response Status:', response.status());
  324 |         console.log('Response Headers:', response.headers());
  325 |     });
  326 | 
  327 |     test('TS002_TC006 - Validate POST add pet response body matches JSON schema @master @regression @api', async ({ request }) => {
  328 |         const petPayload = RandomDataUtil.generatePetPayload();
  329 | 
  330 |         const response = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
  331 |             headers: {
  332 |                 'accept': 'application/json',
  333 |                 'Content-Type': 'application/json'
  334 |             },
  335 |             data: petPayload
  336 |         });
  337 | 
  338 |         expect(response.status()).toBe(200);
  339 |         const responseBody = await response.json();
  340 | 
  341 |         const schemaPath = path.resolve(__dirname, '../../api/schemas/PET/POST.json');
  342 |         const isValid = await validateSchema(responseBody, schemaPath);
  343 |         expect(isValid).toBeTruthy();
  344 |     });
  345 | 
  346 |     test('TS002_TC007 - Validate POST add pet response body contains details as provided in request @master @sanity @api', async ({ request }) => {
  347 |         const petPayload:any = RandomDataUtil.generatePetPayload();
  348 | 
  349 |         const response = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
  350 |             headers: {
  351 |                 'accept': 'application/json',
  352 |                 'Content-Type': 'application/json'
  353 |             },
  354 |             data: petPayload
  355 |         });
  356 | 
  357 |         expect(response.status()).toBe(200);
  358 |         const responseBody = await response.json();
  359 |         console.log('Request Payload:', JSON.stringify(petPayload, null, 2));
  360 |         console.log('Response Body:', JSON.stringify(responseBody, null, 2));
  361 |         
  362 | 
  363 |         expect(responseBody.id).toBe(petPayload.id);
  364 |         expect(responseBody.name).toBe(petPayload.name);
  365 |         expect(responseBody.category.id).toBe(petPayload.category.id);
  366 |         expect(responseBody.category.name).toBe(petPayload.category.name);
  367 |         expect(responseBody.photoUrls).toEqual(petPayload.photoUrls);
  368 |         expect(responseBody.tags[0].id).toBe(petPayload.tags[0].id);
  369 |         expect(responseBody.tags[0].name).toBe(petPayload.tags[0].name);
  370 |         expect(responseBody.status).toBe(petPayload.status);
  371 |     });
  372 | 
  373 |     test('TS002_TC008 - Validate GET pet by ID returns details of newly created pet @master @sanity @api', async ({ request }) => {
  374 |         const petPayload: any = RandomDataUtil.generatePetPayload();
  375 | 
  376 |         // Step 1: Create a pet via POST
  377 |         await test.step('1) Create pet via POST', async () => {
> 378 |             const createResponse = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
      |                                                  ^ Error: apiRequestContext.post: Client network socket disconnected before secure TLS connection was established (ECONNRESET)
  379 |                 headers: {
  380 |                     'accept': 'application/json',
  381 |                     'Content-Type': 'application/json'
  382 |                 },
  383 |                 data: petPayload
  384 |             });
  385 | 
  386 |             expect(createResponse.status()).toBe(200);
  387 |         });
  388 | 
  389 |         // Step 2: GET the newly created pet by its ID
  390 |         await test.step('2) GET pet by newly created ID', async () => {
  391 |             const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(petPayload.id)}`, {
  392 |                 headers: {
  393 |                     'accept': 'application/json'
  394 |                 }
  395 |             });
  396 | 
  397 |             console.log('Response Status:', response.status());
  398 |             console.log('Response Body:', JSON.stringify(await response.json(), null, 2));
  399 | 
  400 |             expect(response.status()).toBe(200);
  401 |             const responseBody = await response.json();
  402 |             expect(responseBody.id).toBe(petPayload.id);
  403 |             expect(responseBody.name).toBe(petPayload.name);
  404 |         });
  405 |     });
  406 | 
  407 |     test('TS002_TC009 - Validate POST add pet response headers match spec @master @regression @api', async ({ request }) => {
  408 |         const petPayload = RandomDataUtil.generatePetPayload();
  409 | 
  410 |         const response = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
  411 |             headers: {
  412 |                 'accept': 'application/json',
  413 |                 'Content-Type': 'application/json'
  414 |             },
  415 |             data: petPayload
  416 |         });
  417 | 
  418 |         expect(response.status()).toBe(200);
  419 |         const responseHeaders = response.headers();
  420 | 
  421 |         expect(responseHeaders['content-type']).toContain('application/json');
  422 |         expect(responseHeaders['access-control-allow-origin']).toBeDefined();
  423 |         expect(responseHeaders['access-control-allow-methods']).toBeDefined();
  424 |         expect(responseHeaders['access-control-allow-headers']).toBeDefined();
  425 |         expect(responseHeaders['server']).toBeDefined();
  426 |     });
  427 | 
  428 |     // ---------------------------------------------------------
  429 |     // PUT - Update Pet Tests (TS003)
  430 |     // ---------------------------------------------------------
  431 | 
  432 |     test('TS003_TC001 - Validate PUT update pet returns status code within 2XX series @master @sanity @api', async ({ request }) => {
  433 |         const petPayload = RandomDataUtil.generateNewPetPayload(parseInt(PET_ID));
  434 |         
  435 |         const response = await request.put(`${BASE_URL}${Routes.updatePetById(PET_ID)}`, {
  436 |             headers: {
  437 |                 'accept': 'application/json',
  438 |                 'Content-Type': 'application/json'
  439 |             },
  440 |             data: petPayload
  441 |         });
  442 | 
  443 |         console.log('Response Status:', response.status());
  444 |         console.log('Response Body:', JSON.stringify(await response.json(), null, 2));
  445 | 
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
```