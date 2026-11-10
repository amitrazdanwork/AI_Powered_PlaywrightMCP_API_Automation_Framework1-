# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/pet-store-pet.spec.ts >> PET_MODULE - Pet API Tests >> TS004_TC007 - Validate DELETE pet response body matches JSON schema @master @regression @api
- Location: tests/api/pet-store-pet.spec.ts:839:9

# Error details

```
Error: apiRequestContext.post: write EPROTO 402D396BB6760000:error:0A00010B:SSL routines:tls_validate_record_header:wrong version number:../deps/openssl/openssl/ssl/record/methods/tlsany_meth.c:77:

Call log:
  - → POST https://petstore.swagger.io/v2/pet
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.8078.4 Safari/537.36
    - accept: application/json
    - accept-encoding: gzip,deflate,br
    - Content-Type: application/json
    - content-length: 146

```

# Test source

```ts
  744 |         });
  745 | 
  746 |         const responseText = await response.text();
  747 |         let responseBody = null;
  748 |         if (responseText) {
  749 |             responseBody = JSON.parse(responseText);
  750 |         }
  751 | 
  752 |         // For delete, response may have a message body (code, type, message)
  753 |         expect(responseBody).not.toBeNull();
  754 |         expect(response.headers()).not.toBeNull();
  755 |     });
  756 | 
  757 |     test('TS004_TC004 - Validate GET pet by ID returns 404 after DELETE @master @sanity @api', async ({ request }) => {
  758 |         const petPayload:any = RandomDataUtil.generateNewPetPayload(Date.now());
  759 | 
  760 |         // Pre-step: Create pet
  761 |         await test.step('Create pet', async () => {
  762 |             const createResponse = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
  763 |                 headers: {
  764 |                     'accept': 'application/json',
  765 |                     'Content-Type': 'application/json'
  766 |                 },
  767 |                 data: petPayload
  768 |             });
  769 |             expect(createResponse.status()).toBe(200);
  770 |         });
  771 | 
  772 |         // Delete the pet
  773 |         const deleteResponse = await request.delete(`${BASE_URL}${Routes.getPetByPetId(petPayload.id)}`, {
  774 |             headers: {
  775 |                 'accept': 'application/json'
  776 |             }
  777 |         });
  778 |         // The DELETE may return 200 or 404 depending on API state
  779 |         expect([200, 404]).toContain(deleteResponse.status());
  780 | 
  781 |         // Now try to GET the deleted pet - the mock API may still return the pet
  782 |         // but we validate the DELETE endpoint behavior
  783 |         const response = await request.get(`${BASE_URL}${Routes.getPetByPetId(petPayload.id)}`, {
  784 |             headers: {
  785 |                 'accept': 'application/json'
  786 |             }
  787 |         });
  788 | 
  789 |         // Note: Petstore mock API doesn't actually persist deletes, so it may return 200
  790 |         // This test validates the DELETE endpoint behavior
  791 |         expect([200, 404]).toContain(response.status());
  792 |     });
  793 | 
  794 |     test('TS004_TC005 - Validate DELETE pet response headers match spec @master @regression @api', async ({ request }) => {
  795 |         const petPayload:any = RandomDataUtil.generateNewPetPayload(Date.now());
  796 | 
  797 |         // Pre-step: Create pet to delete
  798 |         await test.step('Create pet for deletion', async () => {
  799 |             const createResponse = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
  800 |                 headers: {
  801 |                     'accept': 'application/json',
  802 |                     'Content-Type': 'application/json'
  803 |                 },
  804 |                 data: petPayload
  805 |             });
  806 |             expect(createResponse.status()).toBe(200);
  807 |         });
  808 | 
  809 |         const response = await request.delete(`${BASE_URL}${Routes.getPetByPetId(petPayload.id)}`, {
  810 |             headers: {
  811 |                 'accept': 'application/json'
  812 |             }
  813 |         });
  814 | 
  815 |         expect([200, 404]).toContain(response.status());
  816 |         if (response.status() === 200) {
  817 |             const responseHeaders = response.headers();
  818 | 
  819 |             expect(responseHeaders['content-type']).toContain('application/json');
  820 |             expect(responseHeaders['access-control-allow-origin']).toBeDefined();
  821 |             expect(responseHeaders['access-control-allow-methods']).toBeDefined();
  822 |             expect(responseHeaders['access-control-allow-headers']).toBeDefined();
  823 |             expect(responseHeaders['server']).toBeDefined();
  824 |         }
  825 |     });
  826 | 
  827 |     test('TS004_TC006 - Validate DELETE non-existent pet returns 404 @master @regression @api', async ({ request }) => {
  828 |         const nonExistentId = '999999999';
  829 | 
  830 |         const response = await request.delete(`${BASE_URL}${Routes.getPetByPetId(nonExistentId)}`, {
  831 |             headers: {
  832 |                 'accept': 'application/json'
  833 |             }
  834 |         });
  835 | 
  836 |         expect(response.status()).toBe(404);
  837 |     });
  838 | 
  839 |     test('TS004_TC007 - Validate DELETE pet response body matches JSON schema @master @regression @api', async ({ request }) => {
  840 |         const petPayload:any = RandomDataUtil.generateNewPetPayload(Date.now());
  841 | 
  842 |         // Pre-step: Create pet to delete
  843 |         await test.step('Create pet for deletion', async () => {
> 844 |             const createResponse = await request.post(`${BASE_URL}${Routes.addPetToStore()}`, {
      |                                                  ^ Error: apiRequestContext.post: write EPROTO 402D396BB6760000:error:0A00010B:SSL routines:tls_validate_record_header:wrong version number:../deps/openssl/openssl/ssl/record/methods/tlsany_meth.c:77:
  845 |                 headers: {
  846 |                     'accept': 'application/json',
  847 |                     'Content-Type': 'application/json'
  848 |                 },
  849 |                 data: petPayload
  850 |             });
  851 |             expect(createResponse.status()).toBe(200);
  852 |         });
  853 | 
  854 |         const response = await request.delete(`${BASE_URL}${Routes.getPetByPetId(petPayload.id)}`, {
  855 |             headers: {
  856 |                 'accept': 'application/json'
  857 |             }
  858 |         });
  859 | 
  860 |         expect([200, 404]).toContain(response.status());
  861 |         if (response.status() === 200) {
  862 |             const responseText = await response.text();
  863 |             if (responseText) {
  864 |                 const responseBody = JSON.parse(responseText);
  865 | 
  866 |                 const schemaPath = path.resolve(__dirname, '../../api/schemas/PET/DELETE.json');
  867 |                 const isValid = await validateSchema(responseBody, schemaPath);
  868 |                 expect(isValid).toBeTruthy();
  869 |             }
  870 |         }
  871 |     });
  872 | 
  873 |     // ---------------------------------------------------------
  874 |     // POST - Upload Image Tests
  875 |     // ---------------------------------------------------------
  876 | 
  877 |     test('TS005_TC001 - Validate file upload with valid text metadata @master @sanity @api', async ({ request }) => {
  878 |         const filePath = path.resolve(__dirname, '../../testdata/FILE1.pdf');
  879 |         const additionalMetadata = 'This is additional metadata';
  880 | 
  881 |         const response = await request.post(`${BASE_URL}${Routes.uploadPetImage(PET_ID)}`, {
  882 |             headers: {
  883 |                 'accept': 'application/json'
  884 |             },
  885 |             multipart: {
  886 |                 'file': {
  887 |                     name: 'FILE1.pdf',
  888 |                     mimeType: 'application/pdf',
  889 |                     buffer: fs.readFileSync(filePath)
  890 |                 },
  891 |                 'additionalMetadata': additionalMetadata
  892 |             }
  893 |         });
  894 | 
  895 |         expect(response.status()).toBe(200);
  896 |         const responseBody = await response.json();
  897 |         expect(responseBody.code).toBe(200);
  898 |         expect(responseBody.message).toContain('additionalMetadata');
  899 |     });
  900 | 
  901 |     test('TS005_TC002 - Validate standard image formats are accepted @master @sanity @api', async ({ request }) => {
  902 |         const filePath = path.resolve(__dirname, '../../testdata/FILE1.pdf');
  903 |         const additionalMetadata = 'This is additional metadata';
  904 | 
  905 |         const response = await request.post(`${BASE_URL}${Routes.uploadPetImage(PET_ID)}`, {
  906 |             headers: {
  907 |                 'accept': 'application/json'
  908 |             },
  909 |             multipart: {
  910 |                 'file': {
  911 |                     name: 'FILE1.pdf',
  912 |                     mimeType: 'application/pdf',
  913 |                     buffer: fs.readFileSync(filePath)
  914 |                 },
  915 |                 'additionalMetadata': additionalMetadata
  916 |             }
  917 |         });
  918 | 
  919 |         expect(response.status()).toBe(200);
  920 |         const responseBody = await response.json();
  921 |         expect(responseBody.code).toBe(200);
  922 |         expect(responseBody.message).toContain('File uploaded');
  923 |     });
  924 | 
  925 |     test('TS005_TC003 - Validate upload with blank additionalMetadata @master @sanity @api', async ({ request }) => {
  926 |         const filePath = path.resolve(__dirname, '../../testdata/FILE1.pdf');
  927 | 
  928 |         const response = await request.post(`${BASE_URL}${Routes.uploadPetImage(PET_ID)}`, {
  929 |             headers: {
  930 |                 'accept': 'application/json'
  931 |             },
  932 |             multipart: {
  933 |                 'file': {
  934 |                     name: 'FILE1.pdf',
  935 |                     mimeType: 'application/pdf',
  936 |                     buffer: fs.readFileSync(filePath)
  937 |                 },
  938 |                 'additionalMetadata': ''
  939 |             }
  940 |         });
  941 | 
  942 |         expect(response.status()).toBe(200);
  943 |     });
  944 | 
```