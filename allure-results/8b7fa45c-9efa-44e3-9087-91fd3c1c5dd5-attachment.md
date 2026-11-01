# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\pet-store-pet.spec.ts >> PET_MODULE - Pet API Tests >> TS001_TC004 - Validate response body matches JSON schema @master @regression @api
- Location: tests\api\pet-store-pet.spec.ts:121:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 404
Received: 200
```

# Test source

```ts
  35  | 
  36  | test.describe('PET_MODULE - Pet API Tests', () => {
  37  | 
  38  |     // ---------------------------------------------------------
  39  |     // Configuration
  40  |     // ---------------------------------------------------------
  41  | 
  42  |     const BASE_URL = process.env.API_BASE_URL || 'https://petstore.swagger.io';
  43  |     const PET_ID = process.env.PET_ID || '10';
  44  | 
  45  |     // ---------------------------------------------------------
  46  |     // Helper - Schema validation
  47  |     // ---------------------------------------------------------
  48  | 
  49  |     async function validateSchema(response: any, schemaPath: string): Promise<boolean> {
  50  |         const ajv = new Ajv({ allErrors: true });
  51  |         const schema = DataProvider.readJson(schemaPath);
  52  |         const validate = ajv.compile(schema);
  53  |         const isValid = validate(response);
  54  |         if (!isValid) {
  55  |             console.log('Schema validation errors:', JSON.stringify(validate.errors, null, 2));
  56  |         }
  57  |         return isValid;
  58  |     }
  59  | 
  60  |     // ---------------------------------------------------------
  61  |     // GET - Get Pet by ID Tests (TS001)
  62  |     // ---------------------------------------------------------
  63  | 
  64  |     test('TS001_TC001 - Validate GET pet by valid ID returns 200 @master @sanity @api', async ({ request }) => {
  65  |         const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
  66  |             headers: {
  67  |                 'accept': 'application/json'
  68  |             }
  69  |         });
  70  | 
  71  |         console.log('Response Status:', response.status());
  72  |         console.log('Response Headers:', response.headers());
  73  |         
  74  |         const responseBody = await response.json();
  75  |         console.log('Response Body:', JSON.stringify(responseBody, null, 2));
  76  | 
  77  |         expect(response.status()).toBe(200);
  78  |         expect(responseBody.id).toBe(parseInt(PET_ID));
  79  |         expect(responseBody.name).toBeDefined();
  80  |         expect(responseBody.status).toBeDefined();
  81  |     });
  82  | 
  83  |     test('TS001_TC002 - Validate GET pet by non-existent ID returns 404 @master @sanity @api', async ({ request }) => {
  84  |         const nonExistentId = '999999999';
  85  | 
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
  121 |     test('TS001_TC004 - Validate response body matches JSON schema @master @regression @api', async ({ request }) => {
  122 |         const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
  123 |             headers: {
  124 |                 'accept': 'application/json'
  125 |             }
  126 |         });
  127 | 
  128 |         expect(response.status()).toBe(200);
  129 |         const responseBody = await response.json();
  130 | 
  131 |         const schemaPath = path.resolve(__dirname, '../../api/schemas/PET/GET.json');
  132 |         const isValid = await validateSchema(responseBody, schemaPath);
  133 |         expect(isValid).toBeTruthy();
  134 | 
> 135 |         expect(response.status()).toBe(404);
      |                                   ^ Error: expect(received).toBe(expected) // Object.is equality
  136 | 
  137 |         console.log('Response Status:', response.status());
  138 |         console.log('Response Headers:', response.headers());
  139 |         
  140 |         console.log('Response Body:', JSON.stringify(responseBody, null, 2));
  141 |     });
  142 | 
  143 |     test('TS001_TC005 - Validate response headers match spec @master @sanity @api', async ({ request }) => {
  144 |         const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
  145 |             headers: {
  146 |                 'accept': 'application/json'
  147 |             }
  148 |         });
  149 | 
  150 |         expect(response.status()).toBe(200);
  151 |         const responseHeaders = response.headers();
  152 |         expect(responseHeaders['content-type']).toContain('application/json');
  153 |         expect(responseHeaders['server']).not.toBeNull();
  154 |         expect(responseHeaders['date']).not.toBeNull();
  155 |     });
  156 | 
  157 |     test('TS001_TC006 - Validate response body matches JSON schema @master @regression @api', async ({ request }) => {
  158 |         const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
  159 |             headers: {
  160 |                 'accept': 'application/json'
  161 |             }
  162 |         });
  163 | 
  164 |         expect(response.status()).toBe(200);
  165 |         const responseBody = await response.json();
  166 | 
  167 |         const schemaPath = path.resolve(__dirname, '../../api/schemas/PET/GET.json');
  168 |         const isValid = await validateSchema(responseBody, schemaPath);
  169 |         expect(isValid).toBeTruthy();
  170 |     });
  171 | 
  172 |     test('TS001_TC007 - Validate response body has details of existing pet @master @sanity @api', async ({ request }) => {
  173 |         const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
  174 |             headers: {
  175 |                 'accept': 'application/json'
  176 |             }
  177 |         });
  178 | 
  179 |         expect(response.status()).toBe(200);
  180 |         const responseBody = await response.json();
  181 | 
  182 |         // Validate pet details match expected structure
  183 |         expect(responseBody.id).toBe(parseInt(PET_ID));
  184 |         expect(responseBody.name).toBeDefined();
  185 |         expect(responseBody.category).toBeDefined();
  186 |         expect(responseBody.photoUrls).toBeDefined();
  187 |         expect(Array.isArray(responseBody.photoUrls)).toBeTruthy();
  188 |         expect(responseBody.tags).toBeDefined();
  189 |         expect(Array.isArray(responseBody.tags)).toBeTruthy();
  190 |         expect(responseBody.status).toBeDefined();
  191 |     });
  192 | 
  193 |     test('TS001_TC008 - Validate idempotence - same result on repeat calls @master @regression @api', async ({ request }) => {
  194 |         const response1 = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
  195 |             headers: {
  196 |                 'accept': 'application/json'
  197 |             }
  198 |         });
  199 |         const response2 = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
  200 |             headers: {
  201 |                 'accept': 'application/json'
  202 |             }
  203 |         });
  204 | 
  205 |         expect(response1.status()).toBe(200);
  206 |         expect(response2.status()).toBe(200);
  207 | 
  208 |         const body1 = await response1.json();
  209 |         const body2 = await response2.json();
  210 | 
  211 |         // Response bodies should be identical (idempotent GET)
  212 |         expect(body1).toEqual(body2);
  213 |     });
  214 | 
  215 |     test('TS001_TC009 - Validate detailed response headers @master @regression @api', async ({ request }) => {
  216 |         const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
  217 |             headers: {
  218 |                 'accept': 'application/json'
  219 |             }
  220 |         });
  221 | 
  222 |         expect(response.status()).toBe(200);
  223 |         const responseHeaders = response.headers();
  224 | 
  225 |         // Required headers per spec
  226 |         expect(responseHeaders['content-type']).toContain('application/json');
  227 |         expect(responseHeaders['server']).toBeDefined();
  228 |         expect(responseHeaders['date']).toBeDefined();
  229 |         expect(responseHeaders['access-control-allow-origin']).toBeDefined();
  230 |         expect(responseHeaders['access-control-allow-methods']).toBeDefined();
  231 |         expect(responseHeaders['access-control-allow-headers']).toBeDefined();
  232 |     });
  233 | 
  234 |     // ---------------------------------------------------------
  235 |     // POST - Upload Image Tests
```