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
  114 | 
  115 |                 console.log('Order Payload for POST:', orderPayload.id);
  116 | 
  117 |                 
  118 |         const createResponse = await request.post(`${BASE_URL}${Routes.placeOrder()}`, {
  119 |             headers: {
  120 |                 'accept': 'application/json',
  121 |                 'Content-Type': 'application/json'
  122 |             },
  123 |             data: orderPayload
  124 |         });
  125 |         expect(createResponse.status()).toBe(200);
  126 |         const createdBody = await createResponse.json();
  127 | 
  128 |         // Clean up
  129 |         await request.delete(`${BASE_URL}${Routes.deleteOrder(createdBody.id)}`, {
  130 |             headers: { 'accept': 'application/json' }
  131 |         });
  132 | 
  133 |         // Step 2: GET the order by ID
  134 |         const response = await request.get(`${BASE_URL}${Routes.getOrderById(createdBody.id)}`, {
  135 |             headers: {
  136 |                 'accept': 'application/json'
  137 |             }
  138 |         });
  139 | 
  140 |         console.log('Response Status:', response.status());
  141 |         const responseText = await response.text();
  142 |         if (responseText) {
  143 |             console.log('Response Body:', responseText);
  144 |         }
  145 | 
  146 |         // Petstore mock API may return 404 since it does not persist orders
> 147 |         expect(response.status()).toBe(200);
      |                                   ^ Error: expect(received).toBe(expected) // Object.is equality
  148 |         expect(response.statusText()).toBe('OK');
  149 |     });
  150 | 
  151 |     test('TS001_TC003 - Validate GET store order returns response body without sending request body @master @sanity @api', async ({ request }) => {
  152 |         // Step 1: Create an order via POST
  153 |         const orderPayload: any = RandomDataUtil.generateOrderPayload();
  154 | 
  155 | 
  156 |         const createResponse = await request.post(`${BASE_URL}${Routes.placeOrder()}`, {
  157 |             headers: {
  158 |                 'accept': 'application/json',
  159 |                 'Content-Type': 'application/json'
  160 |             },
  161 |             data: orderPayload
  162 |         });
  163 |         expect(createResponse.status()).toBe(200);
  164 |         const createdBody = await createResponse.json();
  165 | 
  166 |         // Clean up
  167 |         await request.delete(`${BASE_URL}${Routes.deleteOrder(createdBody.id)}`, {
  168 |             headers: { 'accept': 'application/json' }
  169 |         });
  170 | 
  171 |         // Step 2: GET the order by ID
  172 |         const response = await request.get(`${BASE_URL}${Routes.getOrderById(createdBody.id)}`, {
  173 |             headers: {
  174 |                 'accept': 'application/json'
  175 |             }
  176 |         });
  177 | 
  178 |         console.log('Response Status:', response.status());
  179 |         const responseText = await response.text();
  180 |         if (responseText) {
  181 |             console.log('Response Body:', responseText);
  182 |         }
  183 | 
  184 |         // Petstore mock API may return 404 since it does not persist orders
  185 |         expect([200, 404]).toContain(response.status());
  186 |     });
  187 | 
  188 |     test('TS001_TC004 - Validate GET store order returns non-empty response body and headers @master @regression @api', async ({ request }) => {
  189 |         // Step 1: Create an order via POST
  190 |         const orderPayload: any = RandomDataUtil.generateOrderPayload();
  191 |         const createResponse = await request.post(`${BASE_URL}${Routes.placeOrder()}`, {
  192 |             headers: {
  193 |                 'accept': 'application/json',
  194 |                 'Content-Type': 'application/json'
  195 |             },
  196 |             data: orderPayload
  197 |         });
  198 |         expect(createResponse.status()).toBe(200);
  199 |         const createdBody = await createResponse.json();
  200 | 
  201 |         // Clean up
  202 |         await request.delete(`${BASE_URL}${Routes.deleteOrder(createdBody.id)}`, {
  203 |             headers: { 'accept': 'application/json' }
  204 |         });
  205 | 
  206 |         // Step 2: GET the order by ID
  207 |         const response = await request.get(`${BASE_URL}${Routes.getOrderById(createdBody.id)}`, {
  208 |             headers: {
  209 |                 'accept': 'application/json'
  210 |             }
  211 |         });
  212 | 
  213 |         const responseText = await response.text();
  214 | 
  215 |         // When 200, validate non-empty body and headers
  216 |         // When 404, validate error response body and headers
  217 |         if (response.status() === 200) {
  218 |             expect(responseText).not.toBeNull();
  219 |             expect(responseText.length).toBeGreaterThan(0);
  220 |             expect(response.headers()).not.toBeNull();
  221 |         }
  222 | 
  223 |         console.log('Response Status:', response.status());
  224 |         console.log('Response Headers:', response.headers());
  225 |         if (responseText) {
  226 |             console.log('Response Body:', responseText);
  227 |         }
  228 |     });
  229 | 
  230 |     test('TS001_TC005 - Validate GET store order response type is JSON @master @sanity @api', async ({ request }) => {
  231 |         // Step 1: Create an order via POST
  232 |         const orderPayload: any = RandomDataUtil.generateOrderPayload();
  233 |         const createResponse = await request.post(`${BASE_URL}${Routes.placeOrder()}`, {
  234 |             headers: {
  235 |                 'accept': 'application/json',
  236 |                 'Content-Type': 'application/json'
  237 |             },
  238 |             data: orderPayload
  239 |         });
  240 |         expect(createResponse.status()).toBe(200);
  241 |         const createdBody = await createResponse.json();
  242 | 
  243 |         // Clean up
  244 |         await request.delete(`${BASE_URL}${Routes.deleteOrder(createdBody.id)}`, {
  245 |             headers: { 'accept': 'application/json' }
  246 |         });
  247 | 
```