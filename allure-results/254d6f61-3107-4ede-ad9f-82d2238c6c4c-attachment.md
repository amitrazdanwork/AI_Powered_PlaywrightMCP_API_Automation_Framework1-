# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\store.spec.ts >> STORE_MODULE - Store API Tests >> TS001_TC002 - Validate GET store order returns 200 OK @master @sanity @api
- Location: tests\api\store.spec.ts:111:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
```

# Test source

```ts
  43  | import Ajv from 'ajv';
  44  | 
  45  | dotenv.config({ path: path.resolve(__dirname, '../../.env') });
  46  | 
  47  | test.describe('STORE_MODULE - Store API Tests', () => {
  48  | 
  49  |     // ---------------------------------------------------------
  50  |     // Configuration
  51  |     // ---------------------------------------------------------
  52  | 
  53  |     const BASE_URL = process.env.API_BASE_URL || 'https://petstore.swagger.io';
  54  | 
  55  |     // ---------------------------------------------------------
  56  |     // Helper - Schema validation
  57  |     // ---------------------------------------------------------
  58  | 
  59  |     async function validateSchema(response: any, schemaPath: string): Promise<boolean> {
  60  |         const ajv = new Ajv({ allErrors: true });
  61  |         const schema = DataProvider.readJson(schemaPath);
  62  |         const validate = ajv.compile(schema);
  63  |         const isValid = validate(response);
  64  |         if (!isValid) {
  65  |             console.log('Schema validation errors:', JSON.stringify(validate.errors, null, 2));
  66  |         }
  67  |         return isValid;
  68  |     }
  69  | 
  70  |     // ---------------------------------------------------------
  71  |     // GET - Get Store Order by ID Tests (TS001)
  72  |     // ---------------------------------------------------------
  73  | 
  74  |     test('TS001_TC001 - Validate GET store order returns status code within 2XX @master @sanity @api', async ({ request }) => {
  75  |         // Step 1: Create an order via POST to obtain a valid order ID
  76  |         const orderPayload: any = RandomDataUtil.generateOrderPayload();
  77  |         const createResponse = await request.post(`${BASE_URL}${Routes.placeOrder()}`, {
  78  |             headers: {
  79  |                 'accept': 'application/json',
  80  |                 'Content-Type': 'application/json'
  81  |             },
  82  |             data: orderPayload
  83  |         });
  84  |         expect(createResponse.status()).toBe(200);
  85  |         const createdBody = await createResponse.json();
  86  | 
  87  |         // Clean up
  88  |         await request.delete(`${BASE_URL}${Routes.deleteOrder(createdBody.id)}`, {
  89  |             headers: { 'accept': 'application/json' }
  90  |         });
  91  | 
  92  |         // Step 2: GET the order by ID
  93  |         const response = await request.get(`${BASE_URL}${Routes.getOrderById(createdBody.id)}`, {
  94  |             headers: {
  95  |                 'accept': 'application/json'
  96  |             }
  97  |         });
  98  | 
  99  |         console.log('Response Status:', response.status());
  100 |         console.log('Response Headers:', response.headers());
  101 | 
  102 |         const responseText = await response.text();
  103 |         if (responseText) {
  104 |             console.log('Response Body:', responseText);
  105 |         }
  106 | 
  107 |         // Petstore mock API may return 404 since it does not persist orders
  108 |         expect([200, 404]).toContain(response.status());
  109 |     });
  110 | 
  111 |     test('TS001_TC002 - Validate GET store order returns 200 OK @master @sanity @api', async ({ request }) => {
  112 |         // Step 1: Create an order via POST
  113 |         const orderPayload: any = RandomDataUtil.generateOrderPayload();
  114 |         const createResponse = await request.post(`${BASE_URL}${Routes.placeOrder()}`, {
  115 |             headers: {
  116 |                 'accept': 'application/json',
  117 |                 'Content-Type': 'application/json'
  118 |             },
  119 |             data: orderPayload
  120 |         });
  121 |         expect(createResponse.status()).toBe(200);
  122 |         const createdBody = await createResponse.json();
  123 | 
  124 |         // Clean up
  125 |         await request.delete(`${BASE_URL}${Routes.deleteOrder(createdBody.id)}`, {
  126 |             headers: { 'accept': 'application/json' }
  127 |         });
  128 | 
  129 |         // Step 2: GET the order by ID
  130 |         const response = await request.get(`${BASE_URL}${Routes.getOrderById(createdBody.id)}`, {
  131 |             headers: {
  132 |                 'accept': 'application/json'
  133 |             }
  134 |         });
  135 | 
  136 |         console.log('Response Status:', response.status());
  137 |         const responseText = await response.text();
  138 |         if (responseText) {
  139 |             console.log('Response Body:', responseText);
  140 |         }
  141 | 
  142 |         // Petstore mock API may return 404 since it does not persist orders
> 143 |         expect(response.status()).toBe(200);
      |                                   ^ Error: expect(received).toBe(expected) // Object.is equality
  144 |         expect(response.statusText()).toBe('OK');
  145 |     });
  146 | 
  147 |     test('TS001_TC003 - Validate GET store order returns response body without sending request body @master @sanity @api', async ({ request }) => {
  148 |         // Step 1: Create an order via POST
  149 |         const orderPayload: any = RandomDataUtil.generateOrderPayload();
  150 |         const createResponse = await request.post(`${BASE_URL}${Routes.placeOrder()}`, {
  151 |             headers: {
  152 |                 'accept': 'application/json',
  153 |                 'Content-Type': 'application/json'
  154 |             },
  155 |             data: orderPayload
  156 |         });
  157 |         expect(createResponse.status()).toBe(200);
  158 |         const createdBody = await createResponse.json();
  159 | 
  160 |         // Clean up
  161 |         await request.delete(`${BASE_URL}${Routes.deleteOrder(createdBody.id)}`, {
  162 |             headers: { 'accept': 'application/json' }
  163 |         });
  164 | 
  165 |         // Step 2: GET the order by ID
  166 |         const response = await request.get(`${BASE_URL}${Routes.getOrderById(createdBody.id)}`, {
  167 |             headers: {
  168 |                 'accept': 'application/json'
  169 |             }
  170 |         });
  171 | 
  172 |         console.log('Response Status:', response.status());
  173 |         const responseText = await response.text();
  174 |         if (responseText) {
  175 |             console.log('Response Body:', responseText);
  176 |         }
  177 | 
  178 |         // Petstore mock API may return 404 since it does not persist orders
  179 |         expect([200, 404]).toContain(response.status());
  180 |     });
  181 | 
  182 |     test('TS001_TC004 - Validate GET store order returns non-empty response body and headers @master @regression @api', async ({ request }) => {
  183 |         // Step 1: Create an order via POST
  184 |         const orderPayload: any = RandomDataUtil.generateOrderPayload();
  185 |         const createResponse = await request.post(`${BASE_URL}${Routes.placeOrder()}`, {
  186 |             headers: {
  187 |                 'accept': 'application/json',
  188 |                 'Content-Type': 'application/json'
  189 |             },
  190 |             data: orderPayload
  191 |         });
  192 |         expect(createResponse.status()).toBe(200);
  193 |         const createdBody = await createResponse.json();
  194 | 
  195 |         // Clean up
  196 |         await request.delete(`${BASE_URL}${Routes.deleteOrder(createdBody.id)}`, {
  197 |             headers: { 'accept': 'application/json' }
  198 |         });
  199 | 
  200 |         // Step 2: GET the order by ID
  201 |         const response = await request.get(`${BASE_URL}${Routes.getOrderById(createdBody.id)}`, {
  202 |             headers: {
  203 |                 'accept': 'application/json'
  204 |             }
  205 |         });
  206 | 
  207 |         const responseText = await response.text();
  208 | 
  209 |         // When 200, validate non-empty body and headers
  210 |         // When 404, validate error response body and headers
  211 |         if (response.status() === 200) {
  212 |             expect(responseText).not.toBeNull();
  213 |             expect(responseText.length).toBeGreaterThan(0);
  214 |             expect(response.headers()).not.toBeNull();
  215 |         }
  216 | 
  217 |         console.log('Response Status:', response.status());
  218 |         console.log('Response Headers:', response.headers());
  219 |         if (responseText) {
  220 |             console.log('Response Body:', responseText);
  221 |         }
  222 |     });
  223 | 
  224 |     test('TS001_TC005 - Validate GET store order response type is JSON @master @sanity @api', async ({ request }) => {
  225 |         // Step 1: Create an order via POST
  226 |         const orderPayload: any = RandomDataUtil.generateOrderPayload();
  227 |         const createResponse = await request.post(`${BASE_URL}${Routes.placeOrder()}`, {
  228 |             headers: {
  229 |                 'accept': 'application/json',
  230 |                 'Content-Type': 'application/json'
  231 |             },
  232 |             data: orderPayload
  233 |         });
  234 |         expect(createResponse.status()).toBe(200);
  235 |         const createdBody = await createResponse.json();
  236 | 
  237 |         // Clean up
  238 |         await request.delete(`${BASE_URL}${Routes.deleteOrder(createdBody.id)}`, {
  239 |             headers: { 'accept': 'application/json' }
  240 |         });
  241 | 
  242 |         // Step 2: GET the order by ID
  243 |         const response = await request.get(`${BASE_URL}${Routes.getOrderById(createdBody.id)}`, {
```