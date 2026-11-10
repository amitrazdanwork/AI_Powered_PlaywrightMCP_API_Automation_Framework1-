# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/pet-store-pet.spec.ts >> PET_MODULE - Pet API Tests >> TS001_TC001 - Validate GET pet by valid ID returns 200 @master @sanity @api
- Location: tests/api/pet-store-pet.spec.ts:64:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
```

# Test source

```ts
  1   | /**
  2   |  * Test Case: TS001 - Get Pet by ID
  3   |  *
  4   |  * Tags: @master @sanity @api
  5   |  *
  6   |  * Steps:
  7   |  * 1) GET /v2/pet/{petId}
  8   |  * 2) Validate HTTP status code
  9   |  * 3) Validate response body matches JSON schema
  10  |  * 4) Validate response headers
  11  |  */
  12  | 
  13  | /**
  14  |  * Test Case: TS005 - Pet Image Upload
  15  |  *
  16  |  * Tags: @master @sanity @api
  17  |  *
  18  |  * Steps:
  19  |  * 1) POST file upload to /v2/pet/{petId}/uploadImage
  20  |  * 2) Validate HTTP status code
  21  |  * 3) Validate response body matches JSON schema
  22  |  * 4) Validate response headers
  23  |  */
  24  | 
  25  | import { test, expect } from '@playwright/test';
  26  | import { Routes } from '../../api/routes';
  27  | import { DataProvider } from '../../utils/DataReader';
  28  | import { RandomDataUtil } from '../../utils/dataGenerator';
  29  | import * as dotenv from 'dotenv';
  30  | import * as path from 'path';
  31  | import * as fs from 'fs';
  32  | import Ajv from 'ajv';
  33  | 
  34  | dotenv.config({ path: path.resolve(__dirname, '../../.env') });
  35  | 
  36  | test.describe('PET_MODULE - Pet API Tests', () => {
  37  | 
  38  |     // ---------------------------------------------------------
  39  |     // Configuration
  40  |     // ---------------------------------------------------------
  41  | 
  42  |     const BASE_URL = process.env.API_BASE_URL || 'https://petstore.swagger.io';
  43  |     const PET_ID = process.env.PET_ID || '102';
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
> 77  |         expect(response.status()).toBe(200);
      |                                   ^ Error: expect(received).toBe(expected) // Object.is equality
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
```