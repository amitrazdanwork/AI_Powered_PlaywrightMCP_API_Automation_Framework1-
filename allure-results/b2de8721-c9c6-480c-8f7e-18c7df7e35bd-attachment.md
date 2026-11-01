# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\store.spec.ts >> STORE_MODULE - Store API Tests >> TS003_TC005 - Validate DELETE store order response headers match spec @master @regression @api
- Location: tests\api\store.spec.ts:830:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
```

# Test source

```ts
  753 |         }
  754 | 
  755 |         // Assert that the response status code is 200 OK
  756 |         expect(response.status()).toBe(200);
  757 |         expect(response.statusText()).toBe('OK');
  758 |     });
  759 | 
  760 |     test('TS003_TC003 - Validate DELETE store order returns response body and non-empty headers @master @regression @api', async ({ request }) => {
  761 |         const orderPayload: any = RandomDataUtil.generateOrderPayload();
  762 | 
  763 |         // Pre-step: Create order to delete
  764 |         await test.step('Create order for deletion', async () => {
  765 |             const createResponse = await request.post(`${BASE_URL}${Routes.placeOrder()}`, {
  766 |                 headers: {
  767 |                     'accept': 'application/json',
  768 |                     'Content-Type': 'application/json'
  769 |                 },
  770 |                 data: orderPayload
  771 |             });
  772 |             expect(createResponse.status()).toBe(200);
  773 |         });
  774 | 
  775 |         const response = await request.delete(`${BASE_URL}${Routes.deleteOrder(orderPayload.id)}`, {
  776 |             headers: {
  777 |                 'accept': 'application/json'
  778 |             }
  779 |         });
  780 | 
  781 |         expect(response.status()).toBe(200);
  782 | 
  783 |         const responseText = await response.text();
  784 |         let responseBody = null;
  785 |         if (responseText) {
  786 |             responseBody = JSON.parse(responseText);
  787 |         }
  788 | 
  789 |         // For store delete, response contains message body (code, type, message)
  790 |         // Petstore mock may return empty body on delete, so check text
  791 |         expect(responseBody).not.toBeNull();
  792 |         expect(response.headers()).not.toBeNull();
  793 |     });
  794 | 
  795 |     test('TS003_TC004 - Validate GET order by ID returns 404 after DELETE @master @sanity @api', async ({ request }) => {
  796 |         const orderPayload: any = RandomDataUtil.generateOrderPayload();
  797 | 
  798 |         // Pre-step: Create order
  799 |         await test.step('Create order', async () => {
  800 |             const createResponse = await request.post(`${BASE_URL}${Routes.placeOrder()}`, {
  801 |                 headers: {
  802 |                     'accept': 'application/json',
  803 |                     'Content-Type': 'application/json'
  804 |                 },
  805 |                 data: orderPayload
  806 |             });
  807 |             expect(createResponse.status()).toBe(200);
  808 |         });
  809 | 
  810 |         // Delete the order
  811 |         const deleteResponse = await request.delete(`${BASE_URL}${Routes.deleteOrder(orderPayload.id)}`, {
  812 |             headers: {
  813 |                 'accept': 'application/json'
  814 |             }
  815 |         });
  816 |         expect([200, 404]).toContain(deleteResponse.status());
  817 | 
  818 |         // Now try to GET the deleted order - should return 404
  819 |         const response = await request.get(`${BASE_URL}${Routes.getOrderById(orderPayload.id)}`, {
  820 |             headers: {
  821 |                 'accept': 'application/json'
  822 |             }
  823 |         });
  824 | 
  825 |         // Store order should not be found after deletion
  826 |         // Petstore mock API may return 404 for any order lookup
  827 |         expect([404]).toContain(response.status());
  828 |     });
  829 | 
  830 |     test('TS003_TC005 - Validate DELETE store order response headers match spec @master @regression @api', async ({ request }) => {
  831 |         const orderPayload: any = RandomDataUtil.generateOrderPayload();
  832 | 
  833 |         // Pre-step: Create order to delete
  834 |         await test.step('Create order for deletion', async () => {
  835 |             const createResponse = await request.post(`${BASE_URL}${Routes.placeOrder()}`, {
  836 |                 headers: {
  837 |                     'accept': 'application/json',
  838 |                     'Content-Type': 'application/json'
  839 |                 },
  840 |                 data: orderPayload
  841 |             });
  842 |             expect(createResponse.status()).toBe(200);
  843 |         });
  844 | 
  845 |         //Delete order
  846 |         const response = await request.delete(`${BASE_URL}${Routes.deleteOrder(orderPayload.id)}`, {
  847 |             headers: {
  848 |                 'accept': 'application/json'
  849 |             }
  850 |         });
  851 | 
  852 |         // Assert that the response status code is 200 OK
> 853 |         expect(response.status()).toBe(200);
      |                                   ^ Error: expect(received).toBe(expected) // Object.is equality
  854 | 
  855 |         // Validate response headers
  856 |         if (response.status() === 200) {
  857 |             const responseHeaders = response.headers();
  858 | 
  859 |             expect(responseHeaders['content-type']).toContain('application/json');
  860 |             expect(responseHeaders['access-control-allow-origin']).toBeDefined();
  861 |             expect(responseHeaders['access-control-allow-methods']).toBeDefined();
  862 |             expect(responseHeaders['access-control-allow-headers']).toBeDefined();
  863 |             expect(responseHeaders['server']).toBeDefined();
  864 |         }
  865 |     });
  866 | 
  867 |     test('TS003_TC006 - Validate DELETE non-existing store order returns 404 @master @regression @api', async ({ request }) => {
  868 |         const nonExistentId = '999999999';
  869 | 
  870 |         const response = await request.delete(`${BASE_URL}${Routes.deleteOrder(nonExistentId)}`, {
  871 |             headers: {
  872 |                 'accept': 'application/json'
  873 |             }
  874 |         });
  875 | 
  876 |         console.log('Response Status:', response.status());
  877 |         console.log('Response Headers:', response.headers());
  878 | 
  879 |         const responseText = await response.text();
  880 |         if (responseText) {
  881 |             console.log('Response Body:', responseText);
  882 |         }
  883 | 
  884 |         //Assert that the response status code is 404 Not Found for non-existing order
  885 |         expect(response.status()).toBe(404);
  886 |     });
  887 | 
  888 |     test('TS003_TC007 - Validate DELETE store order response body matches JSON schema @master @regression @api', async ({ request }) => {
  889 |         const orderPayload: any = RandomDataUtil.generateOrderPayload();
  890 | 
  891 |         // Pre-step: Create order to delete
  892 |         await test.step('Create order for deletion', async () => {
  893 |             const createResponse = await request.post(`${BASE_URL}${Routes.placeOrder()}`, {
  894 |                 headers: {
  895 |                     'accept': 'application/json',
  896 |                     'Content-Type': 'application/json'
  897 |                 },
  898 |                 data: orderPayload
  899 |             });
  900 |             expect(createResponse.status()).toBe(200);
  901 |         });
  902 | 
  903 |         const response = await request.delete(`${BASE_URL}${Routes.deleteOrder(orderPayload.id)}`, {
  904 |             headers: {
  905 |                 'accept': 'application/json'
  906 |             }
  907 |         });
  908 | 
  909 |         expect([200]).toContain(response.status());
  910 |         if (response.status() === 200) {
  911 |             const responseText = await response.text();
  912 |             if (responseText) {
  913 |                 const responseBody = JSON.parse(responseText);
  914 | 
  915 |                 const schemaPath = path.resolve(__dirname, '../../api/schemas/STORE/DELETE.json');
  916 |                 const isValid = await validateSchema(responseBody, schemaPath);
  917 |                 expect(isValid).toBeTruthy();
  918 |             }
  919 |         }
  920 |     });
  921 | });
  922 | 
```