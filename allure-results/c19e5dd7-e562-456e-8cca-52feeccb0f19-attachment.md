# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\pet-store-pet.spec.ts >> PET_MODULE - Pet API Tests >> TS001_TC006 - Validate response body matches JSON schema @master @regression @api
- Location: tests\api\pet-store-pet.spec.ts:131:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
```

# Test source

```ts
  38  |     // ---------------------------------------------------------
  39  |     // Configuration
  40  |     // ---------------------------------------------------------
  41  | 
  42  |     const BASE_URL = process.env.API_BASE_URL || 'https://petstore.swagger.io';
  43  |     const PET_ID = process.env.PET_ID || '1';
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
  71  |         expect(response.status()).toBe(200);
  72  |         const responseBody = await response.json();
  73  |         expect(responseBody.id).toBe(parseInt(PET_ID));
  74  |         expect(responseBody.name).toBeDefined();
  75  |         expect(responseBody.status).toBeDefined();
  76  |     });
  77  | 
  78  |     test('TS001_TC002 - Validate GET pet by non-existent ID returns 404 @master @sanity @api', async ({ request }) => {
  79  |         const nonExistentId = '999999999';
  80  | 
  81  |         const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(nonExistentId)}`, {
  82  |             headers: {
  83  |                 'accept': 'application/json'
  84  |             }
  85  |         });
  86  | 
  87  |         expect(response.status()).toBe(404);
  88  |     });
  89  | 
  90  |     test('TS001_TC003 - Validate GET pet by invalid ID format returns 404 @master @regression @api', async ({ request }) => {
  91  |         const invalidId = 'invalid';
  92  | 
  93  |         const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(invalidId)}`, {
  94  |             headers: {
  95  |                 'accept': 'application/json'
  96  |             }
  97  |         });
  98  | 
  99  |         expect(response.status()).toBe(404);
  100 |     });
  101 | 
  102 |     test('TS001_TC004 - Validate response body matches JSON schema @master @regression @api', async ({ request }) => {
  103 |         const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
  104 |             headers: {
  105 |                 'accept': 'application/json'
  106 |             }
  107 |         });
  108 | 
  109 |         expect(response.status()).toBe(200);
  110 |         const responseBody = await response.json();
  111 | 
  112 |         const schemaPath = path.resolve(__dirname, '../../api/schemas/PET/GET.json');
  113 |         const isValid = await validateSchema(responseBody, schemaPath);
  114 |         expect(isValid).toBeTruthy();
  115 |     });
  116 | 
  117 |     test('TS001_TC005 - Validate response headers match spec @master @sanity @api', async ({ request }) => {
  118 |         const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
  119 |             headers: {
  120 |                 'accept': 'application/json'
  121 |             }
  122 |         });
  123 | 
  124 |         expect(response.status()).toBe(200);
  125 |         const responseHeaders = response.headers();
  126 |         expect(responseHeaders['content-type']).toContain('application/json');
  127 |         expect(responseHeaders['server']).not.toBeNull();
  128 |         expect(responseHeaders['date']).not.toBeNull();
  129 |     });
  130 | 
  131 |     test('TS001_TC006 - Validate response body matches JSON schema @master @regression @api', async ({ request }) => {
  132 |         const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
  133 |             headers: {
  134 |                 'accept': 'application/json'
  135 |             }
  136 |         });
  137 | 
> 138 |         expect(response.status()).toBe(200);
      |                                   ^ Error: expect(received).toBe(expected) // Object.is equality
  139 |         const responseBody = await response.json();
  140 | 
  141 |         const schemaPath = path.resolve(__dirname, '../../api/schemas/PET/GET.json');
  142 |         const isValid = await validateSchema(responseBody, schemaPath);
  143 |         expect(isValid).toBeTruthy();
  144 |     });
  145 | 
  146 |     test('TS001_TC007 - Validate response body has details of existing pet @master @sanity @api', async ({ request }) => {
  147 |         const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
  148 |             headers: {
  149 |                 'accept': 'application/json'
  150 |             }
  151 |         });
  152 | 
  153 |         expect(response.status()).toBe(200);
  154 |         const responseBody = await response.json();
  155 | 
  156 |         // Validate pet details match expected structure
  157 |         expect(responseBody.id).toBe(parseInt(PET_ID));
  158 |         expect(responseBody.name).toBeDefined();
  159 |         expect(responseBody.category).toBeDefined();
  160 |         expect(responseBody.photoUrls).toBeDefined();
  161 |         expect(Array.isArray(responseBody.photoUrls)).toBeTruthy();
  162 |         expect(responseBody.tags).toBeDefined();
  163 |         expect(Array.isArray(responseBody.tags)).toBeTruthy();
  164 |         expect(responseBody.status).toBeDefined();
  165 |     });
  166 | 
  167 |     test('TS001_TC008 - Validate idempotence - same result on repeat calls @master @regression @api', async ({ request }) => {
  168 |         const response1 = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
  169 |             headers: {
  170 |                 'accept': 'application/json'
  171 |             }
  172 |         });
  173 |         const response2 = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
  174 |             headers: {
  175 |                 'accept': 'application/json'
  176 |             }
  177 |         });
  178 | 
  179 |         expect(response1.status()).toBe(200);
  180 |         expect(response2.status()).toBe(200);
  181 | 
  182 |         const body1 = await response1.json();
  183 |         const body2 = await response2.json();
  184 | 
  185 |         // Response bodies should be identical (idempotent GET)
  186 |         expect(body1).toEqual(body2);
  187 |     });
  188 | 
  189 |     test('TS001_TC009 - Validate detailed response headers @master @regression @api', async ({ request }) => {
  190 |         const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
  191 |             headers: {
  192 |                 'accept': 'application/json'
  193 |             }
  194 |         });
  195 | 
  196 |         expect(response.status()).toBe(200);
  197 |         const responseHeaders = response.headers();
  198 | 
  199 |         // Required headers per spec
  200 |         expect(responseHeaders['content-type']).toContain('application/json');
  201 |         expect(responseHeaders['server']).toBeDefined();
  202 |         expect(responseHeaders['date']).toBeDefined();
  203 |         expect(responseHeaders['access-control-allow-origin']).toBeDefined();
  204 |         expect(responseHeaders['access-control-allow-methods']).toBeDefined();
  205 |         expect(responseHeaders['access-control-allow-headers']).toBeDefined();
  206 |     });
  207 | 
  208 |     // ---------------------------------------------------------
  209 |     // POST - Upload Image Tests
  210 |     // ---------------------------------------------------------
  211 | 
  212 |     test('TS005_TC001 - Validate file upload with valid text metadata @master @sanity @api', async ({ request }) => {
  213 |         const filePath = path.resolve(__dirname, '../../testdata/FILE1.pdf');
  214 |         const additionalMetadata = 'This is additional metadata';
  215 | 
  216 |         const response = await request.post(`${BASE_URL}${Routes.uploadPetImage(PET_ID)}`, {
  217 |             headers: {
  218 |                 'accept': 'application/json'
  219 |             },
  220 |             multipart: {
  221 |                 'file': {
  222 |                     name: 'FILE1.pdf',
  223 |                     mimeType: 'application/pdf',
  224 |                     buffer: fs.readFileSync(filePath)
  225 |                 },
  226 |                 'additionalMetadata': additionalMetadata
  227 |             }
  228 |         });
  229 | 
  230 |         expect(response.status()).toBe(200);
  231 |         const responseBody = await response.json();
  232 |         expect(responseBody.code).toBe(200);
  233 |         expect(responseBody.message).toContain('additionalMetadata');
  234 |     });
  235 | 
  236 |     test('TS005_TC002 - Validate standard image formats are accepted @master @sanity @api', async ({ request }) => {
  237 |         const filePath = path.resolve(__dirname, '../../testdata/FILE1.pdf');
  238 |         const additionalMetadata = 'This is additional metadata';
```