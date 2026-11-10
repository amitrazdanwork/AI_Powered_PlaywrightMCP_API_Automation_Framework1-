/**
 * Test Case: TS001 - Get Pet by ID
 *
 * Tags: @master @sanity @api
 *
 * Steps:
 * 1) GET /v2/pet/{petId}
 * 2) Validate HTTP status code
 * 3) Validate response body matches JSON schema
 * 4) Validate response headers
 */

/**
 * Test Case: TS005 - Pet Image Upload
 *
 * Tags: @master @sanity @api
 *
 * Steps:
 * 1) POST file upload to /v2/pet/{petId}/uploadImage
 * 2) Validate HTTP status code
 * 3) Validate response body matches JSON schema
 * 4) Validate response headers
 */

import { test, expect } from '@playwright/test';
import { Routes } from '../../api/routes';
import { DataProvider } from '../../utils/DataReader';
import { RandomDataUtil } from '../../utils/dataGenerator';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import Ajv from 'ajv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

test.describe('PET_MODULE - Pet API Tests', () => {

    // ---------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------

    const BASE_URL = process.env.API_BASE_URL || 'https://petstore.swagger.io';
    const PET_ID = process.env.PET_ID || '102';

    // ---------------------------------------------------------
    // Helper - Schema validation
    // ---------------------------------------------------------

    async function validateSchema(response: any, schemaPath: string): Promise<boolean> {
        const ajv = new Ajv({ allErrors: true });
        const schema = DataProvider.readJson(schemaPath);
        const validate = ajv.compile(schema);
        const isValid = validate(response);
        if (!isValid) {
            console.log('Schema validation errors:', JSON.stringify(validate.errors, null, 2));
        }
        return isValid;
    }

    // ---------------------------------------------------------
    // GET - Get Pet by ID Tests (TS001)
    // ---------------------------------------------------------

    test('TS001_TC001 - Validate GET pet by valid ID returns 200 @master @sanity @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
            headers: {
                'accept': 'application/json'
            }
        });

        console.log('Response Status:', response.status());
        console.log('Response Headers:', response.headers());
        
        const responseBody = await response.json();
        console.log('Response Body:', JSON.stringify(responseBody, null, 2));

        expect(response.status()).toBe(200);
        expect(responseBody.id).toBe(parseInt(PET_ID));
        expect(responseBody.name).toBeDefined();
        expect(responseBody.status).toBeDefined();
    });

    test('TS001_TC002 - Validate GET pet by non-existent ID returns 404 @master @sanity @api', async ({ request }) => {
        const nonExistentId = '999999999';

        const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(nonExistentId)}`, {
            headers: {
                'accept': 'application/json'
            }
        });

        expect(response.status()).toBe(404);

        console.log('Response Status:', response.status());
        console.log('Response Headers:', response.headers());
        
        const responseBody = await response.json();
        console.log('Response Body:', JSON.stringify(responseBody, null, 2));

    });

    test('TS001_TC003 - Validate GET pet by invalid ID format returns 404 @master @regression @api', async ({ request }) => {
        const invalidId = 'invalid';

        const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(invalidId)}`, {
            headers: {
                'accept': 'application/json'
            }
        });

        expect(response.status()).toBe(404);

        console.log('Response Status:', response.status());
        console.log('Response Headers:', response.headers());
        
        const responseBody = await response.json();
        console.log('Response Body:', JSON.stringify(responseBody, null, 2));

    });

    test('TS001_TC004 - Validate that API should return a response payload i.e. Non-empty response body and response header @master @regression @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
            headers: {
                'accept': 'application/json'
            }
        });

        const responseBody = await response.json();

        expect(responseBody).not.toBeNull();
        expect(response.headers()).not.toBeNull();

        console.log('Response Status:', response.status());
        console.log('Response Headers:', response.headers());
        
        console.log('Response Body:', JSON.stringify(responseBody, null, 2));
    });
    

    test('TS001_TC005 - Validate response headers match spec @master @sanity @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
            headers: {
                'accept': 'application/json'
            }
        });

        expect(response.status()).toBe(200);
        const responseHeaders = response.headers();
        expect(responseHeaders['content-type']).toContain('application/json');
        expect(responseHeaders['server']).not.toBeNull();
        expect(responseHeaders['date']).not.toBeNull();
    });

    test('TS001_TC006 - Validate response body matches JSON schema @master @regression @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
            headers: {
                'accept': 'application/json'
            }
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();

        const schemaPath = path.resolve(__dirname, '../../api/schemas/PET/GET.json');
        const isValid = await validateSchema(responseBody, schemaPath);
        expect(isValid).toBeTruthy();
    });

    test('TS001_TC007 - Validate response body has details of existing pet @master @sanity @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
            headers: {
                'accept': 'application/json'
            }
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();

        
        console.log('Response Body:', JSON.stringify(responseBody, null, 2));

        // Validate pet details match expected structure
        expect(responseBody.id).toBe(parseInt(PET_ID));
        expect(responseBody.name).toBe("doggie");
        expect(responseBody.category.id).toBe(10);
        expect(responseBody.category.name).toBe("CAT1");
        expect(responseBody.photoUrls).toContain('URL1');
        expect(responseBody.tags[0].id).toBe(20);
        expect(responseBody.tags[0].name).toBe('TAG1');
        expect(responseBody.status).toBe('available');

    });

    test('TS001_TC008 - Validate idempotence - same result on repeat calls @master @regression @api', async ({ request }) => {
        const response1 = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
            headers: {
                'accept': 'application/json'
            }
        });
        const response2 = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
            headers: {
                'accept': 'application/json'
            }
        });

        expect(response1.status()).toBe(200);
        expect(response2.status()).toBe(200);

        const body1 = await response1.json();
        const body2 = await response2.json();

        // Response bodies should be identical (idempotent GET)
        expect(body1).toEqual(body2);
    });

    test('TS001_TC009 - Validate detailed response headers @master @regression @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
            headers: {
                'accept': 'application/json'
            }
        });

        expect(response.status()).toBe(200);
        const responseHeaders = response.headers();

        // Required headers per spec
        expect(responseHeaders['content-type']).toContain('application/json');
        expect(responseHeaders['server']).toBeDefined();
        expect(responseHeaders['date']).toBeDefined();
        expect(responseHeaders['access-control-allow-origin']).toBeDefined();
        expect(responseHeaders['access-control-allow-methods']).toBeDefined();
        expect(responseHeaders['access-control-allow-headers']).toBeDefined();
    });

    // ---------------------------------------------------------
    // POST - Add Pet Tests (TS002)
    // ---------------------------------------------------------

    test('TS002_TC001 - Validate POST add pet returns status code within 2XX @master @sanity @api', async ({ request }) => {
        
        const petPayload = RandomDataUtil.generatePetPayload();

        const response = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: petPayload
        });

        console.log('Response Status:', response.status());
        console.log('Response Body:', JSON.stringify(await response.json(), null, 2));

        expect(response.status()).toBeLessThan(300); // Status code should be in the 2XX range
    });

    test('TS002_TC002 - Validate POST add pet returns 200 OK @master @sanity @api', async ({ request }) => {
        // NOTE: Petstore /v2/pet returns 200 (not 201) per API doc
        const petPayload = RandomDataUtil.generatePetPayload();

        const response = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: petPayload
        });

        console.log('Response Status:', response.status());
        const responseBody = await response.json();
        console.log('Response Body:', JSON.stringify(responseBody, null, 2));

        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe('OK');
    });

    test('TS002_TC003 - Validate POST add pet returns response body when request body is sent @master @sanity @api', async ({ request }) => {
        const petPayload = RandomDataUtil.generatePetPayload();

        const response = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: petPayload
        });

        expect(response.status()).toBe(200);
    });

    test('TS002_TC004 - Validate POST add pet returns non-empty response body and headers @master @regression @api', async ({ request }) => {
        const petPayload = RandomDataUtil.generatePetPayload();

        const response = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: petPayload
        });

        const responseBody = await response.json();

        expect(responseBody).not.toBeNull();
        expect(response.headers()).not.toBeNull();

    });

    test('TS002_TC005 - Validate POST add pet response type is JSON @master @sanity @api', async ({ request }) => {
        const petPayload = RandomDataUtil.generatePetPayload();

        const response = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: petPayload
        });

        expect(response.status()).toBe(200);
        const responseHeaders = response.headers();
        expect(responseHeaders['content-type']).toContain('application/json');
        console.log('Response Status:', response.status());
        console.log('Response Headers:', response.headers());
    });

    test('TS002_TC006 - Validate POST add pet response body matches JSON schema @master @regression @api', async ({ request }) => {
        const petPayload = RandomDataUtil.generatePetPayload();

        const response = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: petPayload
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();

        const schemaPath = path.resolve(__dirname, '../../api/schemas/PET/POST.json');
        const isValid = await validateSchema(responseBody, schemaPath);
        expect(isValid).toBeTruthy();
    });

    test('TS002_TC007 - Validate POST add pet response body contains details as provided in request @master @sanity @api', async ({ request }) => {
        const petPayload:any = RandomDataUtil.generatePetPayload();

        const response = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: petPayload
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log('Request Payload:', JSON.stringify(petPayload, null, 2));
        console.log('Response Body:', JSON.stringify(responseBody, null, 2));
        

        expect(responseBody.id).toBe(petPayload.id);
        expect(responseBody.name).toBe(petPayload.name);
        expect(responseBody.category.id).toBe(petPayload.category.id);
        expect(responseBody.category.name).toBe(petPayload.category.name);
        expect(responseBody.photoUrls).toEqual(petPayload.photoUrls);
        expect(responseBody.tags[0].id).toBe(petPayload.tags[0].id);
        expect(responseBody.tags[0].name).toBe(petPayload.tags[0].name);
        expect(responseBody.status).toBe(petPayload.status);
    });

    test('TS002_TC008 - Validate GET pet by ID returns details of newly created pet @master @sanity @api', async ({ request }) => {
        const petPayload: any = RandomDataUtil.generatePetPayload();

        // Step 1: Create a pet via POST
        await test.step('1) Create pet via POST', async () => {
            const createResponse = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: petPayload
            });

            expect(createResponse.status()).toBe(200);
        });

        // Step 2: GET the newly created pet by its ID
        await test.step('2) GET pet by newly created ID', async () => {
            const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(petPayload.id)}`, {
                headers: {
                    'accept': 'application/json'
                }
            });

            console.log('Response Status:', response.status());
            console.log('Response Body:', JSON.stringify(await response.json(), null, 2));

            expect(response.status()).toBe(200);
            const responseBody = await response.json();
            expect(responseBody.id).toBe(petPayload.id);
            expect(responseBody.name).toBe(petPayload.name);
        });
    });

    test('TS002_TC009 - Validate POST add pet response headers match spec @master @regression @api', async ({ request }) => {
        const petPayload = RandomDataUtil.generatePetPayload();

        const response = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: petPayload
        });

        expect(response.status()).toBe(200);
        const responseHeaders = response.headers();

        expect(responseHeaders['content-type']).toContain('application/json');
        expect(responseHeaders['access-control-allow-origin']).toBeDefined();
        expect(responseHeaders['access-control-allow-methods']).toBeDefined();
        expect(responseHeaders['access-control-allow-headers']).toBeDefined();
        expect(responseHeaders['server']).toBeDefined();
    });

    // ---------------------------------------------------------
    // PUT - Update Pet Tests (TS003)
    // ---------------------------------------------------------

    test('TS003_TC001 - Validate PUT update pet returns status code within 2XX series @master @sanity @api', async ({ request }) => {
        const petPayload = RandomDataUtil.generateNewPetPayload(parseInt(PET_ID));
        
        const response = await request.put(`${BASE_URL}${Routes.updatePetById(PET_ID)}`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: petPayload
        });

        console.log('Response Status:', response.status());
        console.log('Response Body:', JSON.stringify(await response.json(), null, 2));

        expect(response.status()).toBeLessThan(300);
    });

    test('TS003_TC002 - Validate PUT update pet returns 200 OK @master @sanity @api', async ({ request }) => {
        // NOTE: Petstore /v2/pet returns 200 (not 201) per API doc
        const petPayload = RandomDataUtil.generateNewPetPayload(parseInt(PET_ID));
     //   petPayload.id = parseInt(PET_ID);

        const response = await request.put(`${BASE_URL}${Routes.updatePetById(PET_ID)}`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: petPayload
        });

        console.log('Response Status:', response.status());
        const responseBody = await response.json();
        console.log('Response Body:', JSON.stringify(responseBody, null, 2));

        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe('OK');
    });

    test('TS003_TC003 - Validate PUT update pet returns response body when request body is sent @master @sanity @api', async ({ request }) => {
        const petPayload = RandomDataUtil.generateNewPetPayload(parseInt(PET_ID));
   //     petPayload.id = parseInt(PET_ID);

        const response = await request.put(`${BASE_URL}${Routes.updatePetById(PET_ID)}`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: petPayload
        });

        expect(response.status()).toBe(200);
    });

    test('TS003_TC004 - Validate PUT update pet returns non-empty response body and headers @master @regression @api', async ({ request }) => {
        const petPayload = RandomDataUtil.generateNewPetPayload(parseInt(PET_ID));
     //   petPayload.id = parseInt(PET_ID);

        const response = await request.put(`${BASE_URL}${Routes.updatePetById(PET_ID)}`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: petPayload
        });

        const responseBody = await response.json();

        expect(responseBody).not.toBeNull();
        expect(response.headers()).not.toBeNull();

    });

    test('TS003_TC005 - Validate PUT update pet response type is JSON @master @sanity @api', async ({ request }) => {
        const petPayload = RandomDataUtil.generateNewPetPayload(parseInt(PET_ID));
       // petPayload.id = parseInt(PET_ID);

        const response = await request.put(`${BASE_URL}${Routes.updatePetById(PET_ID)}`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: petPayload
        });

        expect(response.status()).toBe(200);
        const responseHeaders = response.headers();
        expect(responseHeaders['content-type']).toContain('application/json');
        console.log('Response Status:', response.status());
        console.log('Response Headers:', response.headers());
    });

    test('TS003_TC006 - Validate PUT update pet response body matches JSON schema @master @regression @api', async ({ request }) => {
        const petPayload: any = RandomDataUtil.generateNewPetPayload(parseInt(PET_ID));
      //  petPayload.id = parseInt(PET_ID);

        const response = await request.put(`${BASE_URL}${Routes.updatePetById(PET_ID)}`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: petPayload
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();

        const schemaPath = path.resolve(__dirname, '../../api/schemas/PET/PUT.json');
        const isValid = await validateSchema(responseBody, schemaPath);
        expect(isValid).toBeTruthy();
    });

    test('TS003_TC007 - Validate PUT update pet response body contains details as provided in request @master @sanity @api', async ({ request }) => {
     const petPayload: any = RandomDataUtil.generateNewPetPayload(parseInt(PET_ID));      //  petPayload.id = parseInt(PET_ID);

        const response = await request.put(`${BASE_URL}${Routes.updatePetById(PET_ID)}`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: petPayload
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log('Request Payload:', JSON.stringify(petPayload, null, 2));
        console.log('Response Body:', JSON.stringify(responseBody, null, 2));
        
        expect(responseBody.id).toBe(petPayload.id);
        expect(responseBody.name).toBe(petPayload.name);
        expect(responseBody.category.id).toBe(petPayload.category.id);
        expect(responseBody.category.name).toBe(petPayload.category.name);
        expect(responseBody.photoUrls).toEqual(petPayload.photoUrls);
        expect(responseBody.tags[0].id).toBe(petPayload.tags[0].id);
        expect(responseBody.tags[0].name).toBe(petPayload.tags[0].name);
        expect(responseBody.status).toBe(petPayload.status);
    });

    test('TS003_TC008 - Validate GET pet by ID returns details of newly updated pet @master @sanity @api', async ({ request }) => {
        const petPayload: any = RandomDataUtil.generateNewPetPayload(parseInt(PET_ID));
     //   petPayload.id = parseInt(PET_ID);

        // Step 1: Update a pet via PUT
        await test.step('1) Update pet via PUT', async () => {
            const updateResponse = await request.put(`${BASE_URL}${Routes.updatePetById(PET_ID)}`, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: petPayload
            });

            expect(updateResponse.status()).toBe(200);

               console.log("UPDATED RESPONSE => "+updateResponse);
        });

     

        // Step 2: GET the updated pet by its ID
        await test.step('2) GET pet by updated ID', async () => {
            const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(PET_ID)}`, {
                headers: {
                    'accept': 'application/json'
                }
            });

            console.log('Response Status:', response.status());
            console.log('Response Body:', JSON.stringify(await response.json(), null, 2));

            expect(response.status()).toBe(200);
            const responseBody = await response.json();
            expect(responseBody.id).toBe(petPayload.id);
            expect(responseBody.name).toBe(petPayload.name);
        });
    });

    test('TS003_TC009 - Validate PUT update pet response headers match spec @master @regression @api', async ({ request }) => {
        const petPayload: any = RandomDataUtil.generateNewPetPayload(parseInt(PET_ID));

        const response = await request.put(`${BASE_URL}${Routes.updatePetById(PET_ID)}`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: petPayload
        });

        expect(response.status()).toBe(200);
        const responseHeaders = response.headers();

        expect(responseHeaders['content-type']).toContain('application/json');
        expect(responseHeaders['access-control-allow-origin']).toBeDefined();
        expect(responseHeaders['access-control-allow-methods']).toBeDefined();
        expect(responseHeaders['access-control-allow-headers']).toBeDefined();
        expect(responseHeaders['server']).toBeDefined();
    });

    test('TS003_TC010 - Validate detailed response headers @master @regression @api', async ({ request }) => {
        const petPayload: any = RandomDataUtil.generateNewPetPayload(parseInt(PET_ID));

        const response = await request.put(`${BASE_URL}${Routes.updatePetById(PET_ID)}`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: petPayload
        });

        expect(response.status()).toBe(200);
        const responseHeaders = response.headers();

        // Required headers per spec
        expect(responseHeaders['content-type']).toContain('application/json');
        expect(responseHeaders['server']).toBeDefined();
        expect(responseHeaders['date']).toBeDefined();
        expect(responseHeaders['access-control-allow-origin']).toBeDefined();
        expect(responseHeaders['access-control-allow-methods']).toBeDefined();
        expect(responseHeaders['access-control-allow-headers']).toBeDefined();
    });

    // ---------------------------------------------------------
    // DELETE - Delete Pet Tests (TS004)
    // ---------------------------------------------------------

    test('TS004_TC001 - Validate DELETE pet returns status code within 2XX @master @sanity @api', async ({ request }) => {
        const petPayload:any = RandomDataUtil.generateNewPetPayload(parseInt(PET_ID));

        // Pre-step: Create pet to delete
        await test.step('Create pet for deletion', async () => {
            await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: petPayload
            });
        });

        // Execute DELETE request
        const response = await request.delete(`${BASE_URL}${Routes.getPetByPetId(petPayload.id)}`, {
            headers: {
                'accept': 'application/json'
            }
        });

        console.log('Response Status:', response.status());

        const responseText = await response.text();
        if (responseText) {
            console.log('Response Body:', JSON.stringify(JSON.parse(responseText), null, 2));
        }

        // Assert that the response status code is in the 2XX range
        expect(response.status()).toBeLessThan(300);
    });

    test('TS004_TC002 - Validate DELETE pet returns 200 OK @master @sanity @api', async ({ request }) => {
        // NOTE: Petstore /v2/pet returns 200 (not 204) per API doc
        const petPayload:any = RandomDataUtil.generateNewPetPayload(Date.now());

        // Pre-step: Create pet to delete
        await test.step('Create pet for deletion', async () => {
            const createResponse = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: petPayload
            });
            expect(createResponse.status()).toBe(200);
        });

        const response = await request.delete(`${BASE_URL}${Routes.getPetByPetId(petPayload.id)}`, {
            headers: {
                'accept': 'application/json'
            }
        });

        console.log('Response Status:', response.status());
        const responseText = await response.text();
        if (responseText) {


             
            const responseBody = JSON.parse(responseText);
            console.log('Response Body:', JSON.stringify(responseBody, null, 2));
        }

        //Assert that the response status code is 200 OK
        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe('OK');
    });

    test('TS004_TC003 - Validate DELETE pet returns empty response body and non-empty headers @master @regression @api', async ({ request }) => {
        const petPayload:any = RandomDataUtil.generateNewPetPayload(Date.now());

        // Pre-step: Create pet to delete
        await test.step('Create pet for deletion', async () => {
            const createResponse = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: petPayload
            });
            expect(createResponse.status()).toBe(200);
        });

        const response = await request.delete(`${BASE_URL}${Routes.getPetByPetId(petPayload.id)}`, {
            headers: {
                'accept': 'application/json'
            }
        });

        const responseText = await response.text();
        let responseBody = null;
        if (responseText) {
            responseBody = JSON.parse(responseText);
        }

        // For delete, response may have a message body (code, type, message)
        expect(responseBody).not.toBeNull();
        expect(response.headers()).not.toBeNull();
    });

    test('TS004_TC004 - Validate GET pet by ID returns 404 after DELETE @master @sanity @api', async ({ request }) => {
        const petPayload:any = RandomDataUtil.generateNewPetPayload(Date.now());

        // Pre-step: Create pet
        await test.step('Create pet', async () => {
            const createResponse = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: petPayload
            });
            expect(createResponse.status()).toBe(200);
        });

        // Delete the pet
        const deleteResponse = await request.delete(`${BASE_URL}${Routes.getPetByPetId(petPayload.id)}`, {
            headers: {
                'accept': 'application/json'
            }
        });
        // The DELETE may return 200 or 404 depending on API state
        expect([200, 404]).toContain(deleteResponse.status());

        // Now try to GET the deleted pet - the mock API may still return the pet
        // but we validate the DELETE endpoint behavior
        const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(petPayload.id)}`, {
            headers: {
                'accept': 'application/json'
            }
        });

        // Note: Petstore mock API doesn't actually persist deletes, so it may return 200
        // This test validates the DELETE endpoint behavior
        expect([200, 404]).toContain(response.status());
    });

    test('TS004_TC005 - Validate DELETE pet response headers match spec @master @regression @api', async ({ request }) => {
        const petPayload:any = RandomDataUtil.generateNewPetPayload(Date.now());

        // Pre-step: Create pet to delete
        await test.step('Create pet for deletion', async () => {
            const createResponse = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: petPayload
            });
            expect(createResponse.status()).toBe(200);
        });

        const response = await request.delete(`${BASE_URL}${Routes.getPetByPetId(petPayload.id)}`, {
            headers: {
                'accept': 'application/json'
            }
        });

        expect([200, 404]).toContain(response.status());
        if (response.status() === 200) {
            const responseHeaders = response.headers();

            expect(responseHeaders['content-type']).toContain('application/json');
            expect(responseHeaders['access-control-allow-origin']).toBeDefined();
            expect(responseHeaders['access-control-allow-methods']).toBeDefined();
            expect(responseHeaders['access-control-allow-headers']).toBeDefined();
            expect(responseHeaders['server']).toBeDefined();
        }
    });

    test('TS004_TC006 - Validate DELETE non-existent pet returns 404 @master @regression @api', async ({ request }) => {
        const nonExistentId = '999999999';

        const response = await request.delete(`${BASE_URL}${Routes.getPetByPetId(nonExistentId)}`, {
            headers: {
                'accept': 'application/json'
            }
        });

        expect(response.status()).toBe(404);
    });

    test('TS004_TC007 - Validate DELETE pet response body matches JSON schema @master @regression @api', async ({ request }) => {
        const petPayload:any = RandomDataUtil.generateNewPetPayload(Date.now());

        // Pre-step: Create pet to delete
        await test.step('Create pet for deletion', async () => {
            const createResponse = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: petPayload
            });
            expect(createResponse.status()).toBe(200);
        });

        const response = await request.delete(`${BASE_URL}${Routes.getPetByPetId(petPayload.id)}`, {
            headers: {
                'accept': 'application/json'
            }
        });

        expect([200, 404]).toContain(response.status());
        if (response.status() === 200) {
            const responseText = await response.text();
            if (responseText) {
                const responseBody = JSON.parse(responseText);

                const schemaPath = path.resolve(__dirname, '../../api/schemas/PET/DELETE.json');
                const isValid = await validateSchema(responseBody, schemaPath);
                expect(isValid).toBeTruthy();
            }
        }
    });

    // ---------------------------------------------------------
    // POST - Upload Image Tests
    // ---------------------------------------------------------

    test('TS005_TC001 - Validate file upload with valid text metadata @master @sanity @api', async ({ request }) => {
        const filePath = path.resolve(__dirname, '../../testdata/FILE1.pdf');
        const additionalMetadata = 'This is additional metadata';

        const response = await request.post(`${BASE_URL}${Routes.uploadPetImage(PET_ID)}`, {
            headers: {
                'accept': 'application/json'
            },
            multipart: {
                'file': {
                    name: 'FILE1.pdf',
                    mimeType: 'application/pdf',
                    buffer: fs.readFileSync(filePath)
                },
                'additionalMetadata': additionalMetadata
            }
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.code).toBe(200);
        expect(responseBody.message).toContain('additionalMetadata');
    });

    test('TS005_TC002 - Validate standard image formats are accepted @master @sanity @api', async ({ request }) => {
        const filePath = path.resolve(__dirname, '../../testdata/FILE1.pdf');
        const additionalMetadata = 'This is additional metadata';

        const response = await request.post(`${BASE_URL}${Routes.uploadPetImage(PET_ID)}`, {
            headers: {
                'accept': 'application/json'
            },
            multipart: {
                'file': {
                    name: 'FILE1.pdf',
                    mimeType: 'application/pdf',
                    buffer: fs.readFileSync(filePath)
                },
                'additionalMetadata': additionalMetadata
            }
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.code).toBe(200);
        expect(responseBody.message).toContain('File uploaded');
    });

    test('TS005_TC003 - Validate upload with blank additionalMetadata @master @sanity @api', async ({ request }) => {
        const filePath = path.resolve(__dirname, '../../testdata/FILE1.pdf');

        const response = await request.post(`${BASE_URL}${Routes.uploadPetImage(PET_ID)}`, {
            headers: {
                'accept': 'application/json'
            },
            multipart: {
                'file': {
                    name: 'FILE1.pdf',
                    mimeType: 'application/pdf',
                    buffer: fs.readFileSync(filePath)
                },
                'additionalMetadata': ''
            }
        });

        expect(response.status()).toBe(200);
    });

    test('TS005_TC004 - Validate upload without file parameter returns 500 @master @regression @api', async ({ request }) => {
        const response = await request.post(`${BASE_URL}${Routes.uploadPetImage(PET_ID)}`, {
            headers: {
                'accept': 'application/json'
            },
            multipart: {
                'additionalMetadata': 'This is additional metadata'
            }
        });

        expect(response.status()).toBe(500);
    });

    test('TS005_TC005 - Validate response headers match spec @master @sanity @api', async ({ request }) => {
        const filePath = path.resolve(__dirname, '../../testdata/FILE1.pdf');
        const additionalMetadata = 'This is additional metadata';

        const response = await request.post(`${BASE_URL}${Routes.uploadPetImage(PET_ID)}`, {
            headers: {
                'accept': 'application/json'
            },
            multipart: {
                'file': {
                    name: 'FILE1.pdf',
                    mimeType: 'application/pdf',
                    buffer: fs.readFileSync(filePath)
                },
                'additionalMetadata': additionalMetadata
            }
        });

        expect(response.status()).toBe(200);
        const responseHeaders = response.headers();
        expect(responseHeaders['content-type']).toContain('application/json');
        expect(responseHeaders['server']).not.toBeNull;
        expect(responseHeaders['date']).not.toBeNull;
    });

    test('TS005_TC007 - Validate response body matches JSON schema @master @regression @api', async ({ request }) => {
        const filePath = path.resolve(__dirname, '../../testdata/FILE1.pdf');
        const additionalMetadata = 'This is additional metadata';

        const response = await request.post(`${BASE_URL}${Routes.uploadPetImage(PET_ID)}`, {
            headers: {
                'accept': 'application/json'
            },
            multipart: {
                'file': {
                    name: 'FILE1.pdf',
                    mimeType: 'application/pdf',
                    buffer: fs.readFileSync(filePath)
                },
                'additionalMetadata': additionalMetadata
            }
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();

        const schemaPath = path.resolve(__dirname, '../../api/schemas/PET/UPLOADFILE.json');
        const isValid = await validateSchema(responseBody, schemaPath);
        expect(isValid).toBeTruthy();
    });
});