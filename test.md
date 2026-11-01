# Test Documentation - STORE MODULE

## TS001 - Get Store Order by ID

### Test Scenario: Get Store Order by ID
**Base URL:** https://petstore.swagger.io/v2/store/order/{orderId}
**HTTP Method:** GET
**Headers:** accept: application/json
**Request Body:** NA

---

### TS001_TC001 - Validate that API should return API status code within 2XX series
**Description:** Validate that API should return API status code within 2XX series
**Steps:**
1. Send a GET request to the API endpoint with order id of existing order
**Expected Result:** Status code should fall in 2XX series

---

### TS001_TC002 - Validate that API should return API status code = 200 OK
**Description:** Validate that API should return API status code = 200 OK
**Steps:**
1. Send a GET request to the API endpoint with order id of existing order
**Expected Result:** Response status code = 200 OK

---

### TS001_TC003 - Validate that API should return response body provided user don't send any request body
**Description:** Validate that API should return response body provided user don't send any request body
**Steps:**
1. Send a GET request to the API endpoint with order id of existing order
**Expected Result:** Response status code = 200 OK

---

### TS001_TC004 - Validate that API should return a response payload i.e. Non-empty response body and response header
**Description:** Validate that API should return a response payload i.e. Non-empty response body and response header
**Steps:**
1. Send a GET request to the API endpoint with order id of existing order
**Expected Result:** Response Header = Non-empty; Response body = Non-Empty

---

### TS001_TC005 - Validate that API should return response of type = JSON
**Description:** Validate that API should return response of type = JSON
**Steps:**
1. Send a GET request to the API endpoint with order id of existing order
**Expected Result:** Response type = JSON

---

### TS001_TC006 - Validate that API should should adhere to Response structure as per data model mentioned in API Spec or API Doc.- JSON SCHEMA VALIDATION
**Description:** Validate that API should adhere to Response structure as per data model mentioned in API Spec or API Doc. - JSON SCHEMA VALIDATION
**Steps:**
1. Send a GET request to the API endpoint with order id of existing order
**Expected Result:** Response payload should comply with expected JSON schema

Expected JSON Schema:
```json
{
    "type": "object",
    "properties": {
        "id": { "type": "number" },
        "petId": { "type": "number" },
        "quantity": { "type": "number" },
        "shipDate": { "type": "string" },
        "status": { "type": "string" },
        "complete": { "type": "boolean" }
    },
    "required": ["id", "petId", "quantity", "shipDate", "status", "complete"]
}
```

---

### TS001_TC007 - Validate that API should return response body with details of existing order where id = id of order provided in API URL
**Description:** Validate that API should return response body with details of existing order where id = id of order provided in API URL
**Steps:**
1. Send a GET request to the API endpoint with order id of existing order
**Expected Result:** Response body should have details of the existing order

---

### TS001_TC008 - Validate that API should return same details on re-executing the same request - GET API is idempotence
**Description:** Validate that API should return same details on re-executing the same request (i.e. GET API is idempotent)
**Steps:**
1. Send a GET request to the API endpoint with order id of existing order
2. Send GET request again to the API endpoint
**Expected Result:** Response body should have same output for both runs

---

### TS001_TC009 - Validate that API should return response headers - AS PER SPEC
**Description:** Validate that API should return response headers - AS PER SPEC
**Steps:**
1. Send a GET request to the API endpoint with order id of existing order
**Expected Result:** Response should include response headers - AS PER SPEC (including content-type, connection, cache-control, expires, access-control-allow-origin, keep-alive, HSTS, and other standard header fields)

---

## TS002 - Place Store Order (POST)

### Test Scenario: Place Store Order
**Base URL:** https://petstore.swagger.io/v2/store/order
**HTTP Method:** POST
**Headers:** accept: application/json, Content-Type: application/json
**Request Payload:**
```json
{
  "id": 8,
  "petId": 78,
  "quantity": 20,
  "shipDate": "2026-10-26T05:53:07.028Z",
  "status": "placed",
  "complete": true
}
```

---

### TS002_TC001 - Validate that API should return API status code within 2XX series
**Description:** Validate that API should return API status code within 2XX series
**Steps:**
1. Send a POST request to the API endpoint with adequate request body
**Expected Result:** Status code should fall in 2XX series

---

### TS002_TC002 - Validate that API should return API status code = 201 created
**Description:** Validate that API should return API status code = 201 created. NOTE: Usually POST leads to 201 created, but for this API as per API doc, we use 200
**Steps:**
1. Send a POST request to the API endpoint with adequate request body
**Expected Result:** Status code = 200 OK

---

### TS002_TC003 - Validate that API should return API response provided user sends request body with content of order to be saved
**Description:** Validate that API should return API response provided user sends request body with content of order to be saved
**Steps:**
1. Send a POST request to the API endpoint with adequate request body
**Expected Result:** API should return response provided user sends request body with content of order to be saved

---

### TS002_TC004 - Validate that API should return a response payload i.e. Non-empty response body and response header
**Description:** Validate that API should return a response payload i.e. Non-empty response body and response header
**Steps:**
1. Send a POST request to the API endpoint with adequate request body
**Expected Result:** Response body = Non-empty; Response headers = Non-empty

---

### TS002_TC005 - Validate that API should return response of type = JSON
**Description:** Validate that API should return response of type = JSON
**Steps:**
1. Send a POST request to the API endpoint with adequate request body
**Expected Result:** Response type = JSON

---

### TS002_TC006 - Validate that API should adhere to Response structure as per data model - JSON SCHEMA VALIDATION
**Description:** Validate that API should adhere to Response structure as per data model mentioned in API Spec or API Doc. - JSON SCHEMA VALIDATION
**Steps:**
1. Send a POST request to the API endpoint with adequate request body
**Expected Result:** Response payload should comply with expected JSON schema

Expected JSON Schema:
```json
{
    "type": "object",
    "properties": {
        "id": { "type": "number" },
        "petId": { "type": "number" },
        "quantity": { "type": "number" },
        "shipDate": { "type": "string" },
        "status": { "type": "string" },
        "complete": { "type": "boolean" }
    },
    "required": ["id", "petId", "quantity", "shipDate", "status", "complete"]
}
```

---

### TS002_TC007 - Validate that API should return response body with content containing details as provided in request body
**Description:** Validate that API should return response body with content containing details as provided in request body
**Steps:**
1. Send a POST request to the API endpoint with adequate request body
**Expected Result:** Response body should contain details as provided in request body

---

### TS002_TC008 - Validate that GET order by ID = Id of newly created record should return details of newly created order
**Description:** Validate that GET order by ID = Id of newly created record should return response with details of newly created order
**Steps:**
1. Send a POST request to create a new order
2. Send a GET request to the API endpoint with order id of newly created record
**Expected Result:** Response payload should return details of newly created record

---

### TS002_TC009 - Validate that API should return response headers - AS PER SPEC
**Description:** Validate that API should return response headers - AS PER SPEC
**Steps:**
1. Send a POST request to the API endpoint with adequate request body
**Expected Result:** Response should return headers - AS PER SPEC (including content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers, server, etc.)

---

## TS003 - Delete Store Order by ID

### Test Scenario: Delete Store Order by ID
**Base URL:** https://petstore.swagger.io/v2/store/order/{orderId}
**HTTP Method:** DELETE
**Headers:** accept: application/json
**Request Body:** NA

---

### TS003_TC001 - Validate that API should return API status code within 2XX series
**Description:** Validate that API should return API status code within 2XX series
**Steps:**
1. Send a DELETE request to the API endpoint with order id of existing order
**Expected Result:** Status code should fall in 2XX series

---

### TS003_TC002 - Validate that API should return API status code = 204 No content
**Description:** Validate that API should return API status code = 204 No content. NOTE: Petstore API returns 200 (not 204) per API doc
**Steps:**
1. Send a DELETE request to the API endpoint with order id of existing order
**Expected Result:** Response status code = 200 OK

---

### TS003_TC003 - Validate that API should return a response payload with response body and Non-empty response header
**Description:** Validate that API should return a response payload with response body and Non-empty response header
**Steps:**
1. Send a DELETE request to the API endpoint with order id of existing order
**Expected Result:** Response payload with response body and Non-empty response header

---

### TS003_TC004 - Validate that GET order by ID = Id used in DELETE request should return blank response body
**Description:** Validate that GET order by ID = Id used in API request url / request header should return Blank response body after executing Delete request for target id
**Steps:**
1. Send a DELETE request to the API endpoint with order id of existing order
2. Send a GET request to the API endpoint with order id of deleted order
**Expected Result:** Response body = Empty (404 Not Found)

---

### TS003_TC005 - Validate that API should return response headers - AS PER SPEC
**Description:** Validate that API should return response headers - AS PER SPEC (including content-type, connection, cache-control, expires, access-control-allow-origin, keep-alive, HSTS, and other standard header fields)
**Steps:**
1. Send a DELETE request to the API endpoint with order id of existing order
**Expected Result:** Response payload with response headers - AS PER SPEC

---

### TS003_TC006 - Validate that re-running the same API again should return response code = 404 Not Found
**Description:** Validate that re-running the same DELETE API again should not return any response payload with response code = 404 Not Found
**Steps:**
1. Send a DELETE request to the API endpoint with order id of non-existing order
**Expected Result:** Response code should be 404 Not Found

---

### TS003_TC007 - Validate that API should adhere to Response structure as per data model - JSON SCHEMA VALIDATION
**Description:** Validate that API should adhere to Response structure as per data model mentioned in API Spec or API Doc. - JSON SCHEMA VALIDATION
**Steps:**
1. Send a DELETE request to the API endpoint with order id of existing order
**Expected Result:** Response payload should comply with expected JSON schema

Expected JSON Schema:
```json
{
    "type": "object",
    "properties": {
        "code": { "type": "number" },
        "type": { "type": "string" },
        "message": { "type": "string" }
    },
    "required": ["code", "type", "message"]
}
```
