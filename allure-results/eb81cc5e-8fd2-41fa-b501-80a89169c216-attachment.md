# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\pet-store-pet.spec.ts >> PET_MODULE - Pet API Tests >> TS002_TC002 - Validate POST add pet returns 200 OK @master @sanity @api
- Location: tests\api\pet-store-pet.spec.ts:257:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: undefined
```

# Test source

```ts
  174 |         });
  175 | 
  176 |         expect(response.status()).toBe(200);
  177 |         const responseBody = await response.json();
  178 | 
  179 |         
  180 |         console.log('Response Body:', JSON.stringify(responseBody, null, 2));
  181 | 
  182 |         // Validate pet details match expected structure
  183 |         expect(responseBody.id).toBe(parseInt(PET_ID));
  184 |         expect(responseBody.name).toBe("doggie");
  185 |         expect(responseBody.category.id).toBe(10);
  186 |         expect(responseBody.category.name).toBe("CAT1");
  187 |         expect(responseBody.photoUrls).toContain('URL1');
  188 |         expect(responseBody.tags[0].id).toBe(20);
  189 |         expect(responseBody.tags[0].name).toBe('TAG1');
  190 |         expect(responseBody.status).toBe('available');
  191 | 
  192 |     });
  193 | 
  194 |     test('TS001_TC008 - Validate idempotence - same result on repeat calls @master @regression @api', async ({ request }) => {
  195 |         const response1 = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
  196 |             headers: {
  197 |                 'accept': 'application/json'
  198 |             }
  199 |         });
  200 |         const response2 = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
  201 |             headers: {
  202 |                 'accept': 'application/json'
  203 |             }
  204 |         });
  205 | 
  206 |         expect(response1.status()).toBe(200);
  207 |         expect(response2.status()).toBe(200);
  208 | 
  209 |         const body1 = await response1.json();
  210 |         const body2 = await response2.json();
  211 | 
  212 |         // Response bodies should be identical (idempotent GET)
  213 |         expect(body1).toEqual(body2);
  214 |     });
  215 | 
  216 |     test('TS001_TC009 - Validate detailed response headers @master @regression @api', async ({ request }) => {
  217 |         const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
  218 |             headers: {
  219 |                 'accept': 'application/json'
  220 |             }
  221 |         });
  222 | 
  223 |         expect(response.status()).toBe(200);
  224 |         const responseHeaders = response.headers();
  225 | 
  226 |         // Required headers per spec
  227 |         expect(responseHeaders['content-type']).toContain('application/json');
  228 |         expect(responseHeaders['server']).toBeDefined();
  229 |         expect(responseHeaders['date']).toBeDefined();
  230 |         expect(responseHeaders['access-control-allow-origin']).toBeDefined();
  231 |         expect(responseHeaders['access-control-allow-methods']).toBeDefined();
  232 |         expect(responseHeaders['access-control-allow-headers']).toBeDefined();
  233 |     });
  234 | 
  235 |     // ---------------------------------------------------------
  236 |     // POST - Add Pet Tests (TS002)
  237 |     // ---------------------------------------------------------
  238 | 
  239 |     test('TS002_TC001 - Validate POST add pet returns status code within 2XX @master @sanity @api', async ({ request }) => {
  240 |         
  241 |         const petPayload = RandomDataUtil.generatePetPayload();
  242 | 
  243 |         const response = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
  244 |             headers: {
  245 |                 'accept': 'application/json',
  246 |                 'Content-Type': 'application/json'
  247 |             },
  248 |             data: petPayload
  249 |         });
  250 | 
  251 |         console.log('Response Status:', response.status());
  252 |         console.log('Response Body:', JSON.stringify(await response.json(), null, 2));
  253 | 
  254 |         expect(response.status()).toBeLessThan(300); // Status code should be in the 2XX range
  255 |     });
  256 | 
  257 |     test('TS002_TC002 - Validate POST add pet returns 200 OK @master @sanity @api', async ({ request }) => {
  258 |         // NOTE: Petstore /v2/pet returns 200 (not 201) per API doc
  259 |         const petPayload = RandomDataUtil.generatePetPayload();
  260 | 
  261 |         const response = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
  262 |             headers: {
  263 |                 'accept': 'application/json',
  264 |                 'Content-Type': 'application/json'
  265 |             },
  266 |             data: petPayload
  267 |         });
  268 | 
  269 |         console.log('Response Status:', response.status());
  270 |         const responseBody = await response.json();
  271 |         console.log('Response Body:', JSON.stringify(responseBody, null, 2));
  272 | 
  273 |         expect(response.status()).toBe(200);
> 274 |         expect(responseBody.code).toBe(200);
      |                                   ^ Error: expect(received).toBe(expected) // Object.is equality
  275 |     });
  276 | 
  277 |     test('TS002_TC003 - Validate POST add pet returns response body when request body is sent @master @sanity @api', async ({ request }) => {
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
  289 |         const responseBody = await response.json();
  290 |         console.log('Response Status:', response.status());
  291 |         console.log('Response Body:', JSON.stringify(responseBody, null, 2));
  292 | 
  293 |         expect(responseBody).not.toBeNull();
  294 |         expect(responseBody.code).toBeDefined();
  295 |     });
  296 | 
  297 |     test('TS002_TC004 - Validate POST add pet returns non-empty response body and headers @master @regression @api', async ({ request }) => {
  298 |         const petPayload = RandomDataUtil.generatePetPayload();
  299 | 
  300 |         const response = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
  301 |             headers: {
  302 |                 'accept': 'application/json',
  303 |                 'Content-Type': 'application/json'
  304 |             },
  305 |             data: petPayload
  306 |         });
  307 | 
  308 |         const responseBody = await response.json();
  309 | 
  310 |         expect(responseBody).not.toBeNull();
  311 |         expect(response.headers()).not.toBeNull();
  312 | 
  313 |         console.log('Response Status:', response.status());
  314 |         console.log('Response Headers:', response.headers());
  315 |         console.log('Response Body:', JSON.stringify(responseBody, null, 2));
  316 | 
  317 |         expect(responseBody.code).toBeDefined();
  318 |         expect(responseBody.type).toBeDefined();
  319 |         expect(responseBody.message).toBeDefined();
  320 |     });
  321 | 
  322 |     test('TS002_TC005 - Validate POST add pet response type is JSON @master @sanity @api', async ({ request }) => {
  323 |         const petPayload = RandomDataUtil.generatePetPayload();
  324 | 
  325 |         const response = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
  326 |             headers: {
  327 |                 'accept': 'application/json',
  328 |                 'Content-Type': 'application/json'
  329 |             },
  330 |             data: petPayload
  331 |         });
  332 | 
  333 |         expect(response.status()).toBe(200);
  334 |         const responseHeaders = response.headers();
  335 |         expect(responseHeaders['content-type']).toContain('application/json');
  336 |         console.log('Response Status:', response.status());
  337 |         console.log('Response Headers:', response.headers());
  338 |     });
  339 | 
  340 |     test('TS002_TC006 - Validate POST add pet response body matches JSON schema @master @regression @api', async ({ request }) => {
  341 |         const petPayload = RandomDataUtil.generatePetPayload();
  342 | 
  343 |         const response = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
  344 |             headers: {
  345 |                 'accept': 'application/json',
  346 |                 'Content-Type': 'application/json'
  347 |             },
  348 |             data: petPayload
  349 |         });
  350 | 
  351 |         expect(response.status()).toBe(200);
  352 |         const responseBody = await response.json();
  353 | 
  354 |         const schemaPath = path.resolve(__dirname, '../../api/schemas/PET/POST.json');
  355 |         const isValid = await validateSchema(responseBody, schemaPath);
  356 |         expect(isValid).toBeTruthy();
  357 |     });
  358 | 
  359 |     test('TS002_TC007 - Validate POST add pet response body contains details as provided in request @master @sanity @api', async ({ request }) => {
  360 |         const petPayload = RandomDataUtil.generatePetPayload();
  361 | 
  362 |         const response = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
  363 |             headers: {
  364 |                 'accept': 'application/json',
  365 |                 'Content-Type': 'application/json'
  366 |             },
  367 |             data: petPayload
  368 |         });
  369 | 
  370 |         expect(response.status()).toBe(200);
  371 |         const responseBody = await response.json();
  372 |         console.log('Request Payload:', JSON.stringify(petPayload, null, 2));
  373 |         console.log('Response Body:', JSON.stringify(responseBody, null, 2));
  374 | 
```