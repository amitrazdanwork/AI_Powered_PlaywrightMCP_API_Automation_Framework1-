# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\pet-store-pet.spec.ts >> PET_MODULE - Pet Image Upload API Tests >> TS005_TC007 - Validate response body matches JSON schema @master @regression @api
- Location: tests\api\pet-store-pet.spec.ts:157:9

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Test source

```ts
  80  |             headers: {
  81  |                 'accept': 'application/json'
  82  |             },
  83  |             multipart: {
  84  |                 'file': {
  85  |                     name: 'FILE1.pdf',
  86  |                     mimeType: 'application/pdf',
  87  |                     buffer: fs.readFileSync(filePath)
  88  |                 },
  89  |                 'additionalMetadata': additionalMetadata
  90  |             }
  91  |         });
  92  | 
  93  |         expect(response.status()).toBe(200);
  94  |         const responseBody = await response.json();
  95  |         expect(responseBody.code).toBe(200);
  96  |         expect(responseBody.message).toContain('File uploaded');
  97  |     });
  98  | 
  99  |     test('TS005_TC003 - Validate upload with blank additionalMetadata @master @sanity @api', async ({ request }) => {
  100 |         const filePath = path.resolve(__dirname, '../../testdata/FILE1.pdf');
  101 | 
  102 |         const response = await request.post(`${BASE_URL}${Routes.uploadPetImage(PET_ID)}`, {
  103 |             headers: {
  104 |                 'accept': 'application/json'
  105 |             },
  106 |             multipart: {
  107 |                 'file': {
  108 |                     name: 'FILE1.pdf',
  109 |                     mimeType: 'application/pdf',
  110 |                     buffer: fs.readFileSync(filePath)
  111 |                 },
  112 |                 'additionalMetadata': ''
  113 |             }
  114 |         });
  115 | 
  116 |         expect(response.status()).toBe(200);
  117 |     });
  118 | 
  119 |     test('TS005_TC004 - Validate upload without file parameter returns 500 @master @regression @api', async ({ request }) => {
  120 |         const response = await request.post(`${BASE_URL}${Routes.uploadPetImage(PET_ID)}`, {
  121 |             headers: {
  122 |                 'accept': 'application/json'
  123 |             },
  124 |             multipart: {
  125 |                 'additionalMetadata': 'This is additional metadata'
  126 |             }
  127 |         });
  128 | 
  129 |         expect(response.status()).toBe(500);
  130 |     });
  131 | 
  132 |     test('TS005_TC005 - Validate response headers match spec @master @sanity @api', async ({ request }) => {
  133 |         const filePath = path.resolve(__dirname, '../../testdata/FILE1.pdf');
  134 |         const additionalMetadata = 'This is additional metadata';
  135 | 
  136 |         const response = await request.post(`${BASE_URL}${Routes.uploadPetImage(PET_ID)}`, {
  137 |             headers: {
  138 |                 'accept': 'application/json'
  139 |             },
  140 |             multipart: {
  141 |                 'file': {
  142 |                     name: 'FILE1.pdf',
  143 |                     mimeType: 'application/pdf',
  144 |                     buffer: fs.readFileSync(filePath)
  145 |                 },
  146 |                 'additionalMetadata': additionalMetadata
  147 |             }
  148 |         });
  149 | 
  150 |         expect(response.status()).toBe(200);
  151 |         const responseHeaders = response.headers();
  152 |         expect(responseHeaders['content-type']).toContain('application/json');
  153 |         expect(responseHeaders['server']).not.toBeNull;
  154 |         expect(responseHeaders['date']).not.toBeNull;
  155 |     });
  156 | 
  157 |     test('TS005_TC007 - Validate response body matches JSON schema @master @regression @api', async ({ request }) => {
  158 |         const filePath = path.resolve(__dirname, '../../testdata/FILE1.pdf');
  159 |         const additionalMetadata = 'This is additional metadata';
  160 | 
  161 |         const response = await request.post(`${BASE_URL}${Routes.uploadPetImage(PET_ID)}`, {
  162 |             headers: {
  163 |                 'accept': 'application/json'
  164 |             },
  165 |             multipart: {
  166 |                 'file': {
  167 |                     name: 'FILE1.pdf',
  168 |                     mimeType: 'application/pdf',
  169 |                     buffer: fs.readFileSync(filePath)
  170 |                 },
  171 |                 'additionalMetadata': additionalMetadata
  172 |             }
  173 |         });
  174 | 
  175 |         expect(response.status()).toBe(200);
  176 |         const responseBody = await response.json();
  177 | 
  178 |         const schemaPath = path.resolve(__dirname, '../../api/schemas/PET/POST.json');
  179 |         const isValid = await validateSchema(responseBody, schemaPath);
> 180 |         expect(isValid).toBeTruthy();
      |                         ^ Error: expect(received).toBeTruthy()
  181 |     });
  182 | });
```