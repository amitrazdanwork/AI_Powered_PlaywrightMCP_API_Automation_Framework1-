# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/pet-store-pet.spec.ts >> PET_MODULE - Pet API Tests >> TS001_TC009 - Validate detailed response headers @master @regression @api
- Location: tests/api/pet-store-pet.spec.ts:216:9

# Error details

```
Error: apiRequestContext.get: write EPROTO 406DC91485740000:error:0A00010B:SSL routines:tls_validate_record_header:wrong version number:../deps/openssl/openssl/ssl/record/methods/tlsany_meth.c:77:

Call log:
  - → GET https://petstore.swagger.io/v2/pet/102
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.8078.4 Safari/537.36
    - accept: application/json
    - accept-encoding: gzip,deflate,br

```

# Test source

```ts
  117 |         console.log('Response Body:', JSON.stringify(responseBody, null, 2));
  118 | 
  119 |     });
  120 | 
  121 |     test('TS001_TC004 - Validate that API should return a response payload i.e. Non-empty response body and response header @master @regression @api', async ({ request }) => {
  122 |         const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
  123 |             headers: {
  124 |                 'accept': 'application/json'
  125 |             }
  126 |         });
  127 | 
  128 |         const responseBody = await response.json();
  129 | 
  130 |         expect(responseBody).not.toBeNull();
  131 |         expect(response.headers()).not.toBeNull();
  132 | 
  133 |         console.log('Response Status:', response.status());
  134 |         console.log('Response Headers:', response.headers());
  135 |         
  136 |         console.log('Response Body:', JSON.stringify(responseBody, null, 2));
  137 |     });
  138 |     
  139 | 
  140 |     test('TS001_TC005 - Validate response headers match spec @master @sanity @api', async ({ request }) => {
  141 |         const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
  142 |             headers: {
  143 |                 'accept': 'application/json'
  144 |             }
  145 |         });
  146 | 
  147 |         expect(response.status()).toBe(200);
  148 |         const responseHeaders = response.headers();
  149 |         expect(responseHeaders['content-type']).toContain('application/json');
  150 |         expect(responseHeaders['server']).not.toBeNull();
  151 |         expect(responseHeaders['date']).not.toBeNull();
  152 |     });
  153 | 
  154 |     test('TS001_TC006 - Validate response body matches JSON schema @master @regression @api', async ({ request }) => {
  155 |         const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
  156 |             headers: {
  157 |                 'accept': 'application/json'
  158 |             }
  159 |         });
  160 | 
  161 |         expect(response.status()).toBe(200);
  162 |         const responseBody = await response.json();
  163 | 
  164 |         const schemaPath = path.resolve(__dirname, '../../api/schemas/PET/GET.json');
  165 |         const isValid = await validateSchema(responseBody, schemaPath);
  166 |         expect(isValid).toBeTruthy();
  167 |     });
  168 | 
  169 |     test('TS001_TC007 - Validate response body has details of existing pet @master @sanity @api', async ({ request }) => {
  170 |         const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
  171 |             headers: {
  172 |                 'accept': 'application/json'
  173 |             }
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
> 217 |         const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
      |                                        ^ Error: apiRequestContext.get: write EPROTO 406DC91485740000:error:0A00010B:SSL routines:tls_validate_record_header:wrong version number:../deps/openssl/openssl/ssl/record/methods/tlsany_meth.c:77:
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
  274 |         expect(response.statusText()).toBe('OK');
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
```