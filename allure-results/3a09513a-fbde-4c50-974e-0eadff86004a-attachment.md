# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\pet-store-pet.spec.ts >> PET_MODULE - Pet API Tests >> TS001_TC007 - Validate response body has details of existing pet @master @sanity @api
- Location: tests\api\pet-store-pet.spec.ts:169:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "CAT1"
Received: "string"
```

# Test source

```ts
  86  |         const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(nonExistentId)}`, {
  87  |             headers: {
  88  |                 'accept': 'application/json'
  89  |             }
  90  |         });
  91  | 
  92  |         expect(response.status()).toBe(404);
  93  | 
  94  |         console.log('Response Status:', response.status());
  95  |         console.log('Response Headers:', response.headers());
  96  |         
  97  |         const responseBody = await response.json();
  98  |         console.log('Response Body:', JSON.stringify(responseBody, null, 2));
  99  | 
  100 |     });
  101 | 
  102 |     test('TS001_TC003 - Validate GET pet by invalid ID format returns 404 @master @regression @api', async ({ request }) => {
  103 |         const invalidId = 'invalid';
  104 | 
  105 |         const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(invalidId)}`, {
  106 |             headers: {
  107 |                 'accept': 'application/json'
  108 |             }
  109 |         });
  110 | 
  111 |         expect(response.status()).toBe(404);
  112 | 
  113 |         console.log('Response Status:', response.status());
  114 |         console.log('Response Headers:', response.headers());
  115 |         
  116 |         const responseBody = await response.json();
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
> 186 |         expect(responseBody.category.name).toBe("CAT1");
      |                                            ^ Error: expect(received).toBe(expected) // Object.is equality
  187 |         expect(responseBody.photoUrls).toContain('URL1');
  188 |         expect(responseBody.tags.id).toBe(20);
  189 |         expect(responseBody.tags.name).toBe('TAG1');
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
  236 |     // POST - Upload Image Tests
  237 |     // ---------------------------------------------------------
  238 | 
  239 |     test('TS005_TC001 - Validate file upload with valid text metadata @master @sanity @api', async ({ request }) => {
  240 |         const filePath = path.resolve(__dirname, '../../testdata/FILE1.pdf');
  241 |         const additionalMetadata = 'This is additional metadata';
  242 | 
  243 |         const response = await request.post(`${BASE_URL}${Routes.uploadPetImage(PET_ID)}`, {
  244 |             headers: {
  245 |                 'accept': 'application/json'
  246 |             },
  247 |             multipart: {
  248 |                 'file': {
  249 |                     name: 'FILE1.pdf',
  250 |                     mimeType: 'application/pdf',
  251 |                     buffer: fs.readFileSync(filePath)
  252 |                 },
  253 |                 'additionalMetadata': additionalMetadata
  254 |             }
  255 |         });
  256 | 
  257 |         expect(response.status()).toBe(200);
  258 |         const responseBody = await response.json();
  259 |         expect(responseBody.code).toBe(200);
  260 |         expect(responseBody.message).toContain('additionalMetadata');
  261 |     });
  262 | 
  263 |     test('TS005_TC002 - Validate standard image formats are accepted @master @sanity @api', async ({ request }) => {
  264 |         const filePath = path.resolve(__dirname, '../../testdata/FILE1.pdf');
  265 |         const additionalMetadata = 'This is additional metadata';
  266 | 
  267 |         const response = await request.post(`${BASE_URL}${Routes.uploadPetImage(PET_ID)}`, {
  268 |             headers: {
  269 |                 'accept': 'application/json'
  270 |             },
  271 |             multipart: {
  272 |                 'file': {
  273 |                     name: 'FILE1.pdf',
  274 |                     mimeType: 'application/pdf',
  275 |                     buffer: fs.readFileSync(filePath)
  276 |                 },
  277 |                 'additionalMetadata': additionalMetadata
  278 |             }
  279 |         });
  280 | 
  281 |         expect(response.status()).toBe(200);
  282 |         const responseBody = await response.json();
  283 |         expect(responseBody.code).toBe(200);
  284 |         expect(responseBody.message).toContain('File uploaded');
  285 |     });
  286 | 
```