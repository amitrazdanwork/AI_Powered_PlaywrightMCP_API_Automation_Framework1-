# Pet Store API Test Scenarios

Generated from: TEST SCENARIOS.xlsx

Application Under Test: PET STORE APIs
Refer: https://petstore.swagger.io/

---

## Module: PET_MODULE

### Scenario: TS001

#### Test Case: TS001_TC001

**Description:** Validate that API should return API status code within 2XX series

**HTTP Method:** GET

**Request URL:** https://petstore.swagger.io/v2/pet/{petId} 

**Request Payload:**

```
Request Headers = 
accept: application/json'
Api_key: amit' 

Request body = NA
```

**Steps to Reproduce:**

Send a GET request to the API endpoint

**Response Payload:**

```
Response body = 
{
"id":501,
"username":"testuser1",
"firstName":"Amit",
"lastName":"Kumar",
"email":"amitkumar@gmail.com",
"password":"password1",
"phone":"7845462612",
"userStatus":1
}

Response headers = 

 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:13:22 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Status code should fall in 2XX  series

---

#### Test Case: TS001_TC002

**Description:** Validate that API should return API status code = 200 OK

**HTTP Method:** GET

**Request URL:** https://petstore.swagger.io/v2/pet/{petId} 

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body = NA
```

**Steps to Reproduce:**

Send a GET request to the API endpoint

**Response Payload:**

```
Response body = 
{
"id":501,
"username":"testuser1",
"firstName":"Amit",
"lastName":"Kumar",
"email":"amitkumar@gmail.com",
"password":"password1",
"phone":"7845462612",
"userStatus":1
}

Response headers = 

 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:13:22 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response Status code = 200 Ok

---

#### Test Case: TS001_TC003

**Description:** Validate that API should return response body provided user don't send any request body

**HTTP Method:** GET

**Request URL:** https://petstore.swagger.io/v2/pet/{petId} 

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body = NA
```

**Steps to Reproduce:**

Send a GET request to the API endpoint

**Response Payload:**

```
Response body = 
{
"id":501,
"username":"testuser1",
"firstName":"Amit",
"lastName":"Kumar",
"email":"amitkumar@gmail.com",
"password":"password1",
"phone":"7845462612",
"userStatus":1
}

Response headers = 

 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:13:22 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response Status code = 200 Ok

---

#### Test Case: TS001_TC004

**Description:** Validate that API should return a response payload i.e. Non-empty response body and response header

**HTTP Method:** GET

**Request URL:** https://petstore.swagger.io/v2/pet/{petId} 

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body = NA
```

**Steps to Reproduce:**

Send a GET request to the API endpoint

**Response Payload:**

```
Response body = 
{
"id":501,
"username":"testuser1",
"firstName":"Amit",
"lastName":"Kumar",
"email":"amitkumar@gmail.com",
"password":"password1",
"phone":"7845462612",
"userStatus":1
}

Response headers = 

 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:13:22 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response Header= Non-empty

Response body= Non-Empty

---

#### Test Case: TS001_TC005

**Description:** Validate that API should return response of type = JSON

**HTTP Method:** GET

**Request URL:** https://petstore.swagger.io/v2/pet/{petId} 

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body = NA
```

**Steps to Reproduce:**

Send a GET request to the API endpoint

**Response Payload:**

```
Response body = 
{
"id":501,
"username":"testuser1",
"firstName":"Amit",
"lastName":"Kumar",
"email":"amitkumar@gmail.com",
"password":"password1",
"phone":"7845462612",
"userStatus":1
}

Response headers = 

 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:13:22 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response type= JSON

---

#### Test Case: TS001_TC006

**Description:** Validate that API should should adhere to Response structure as per data model mentioned in API Spec or API Doc.- JSON SCHEMA VALIDATION

**HTTP Method:** GET

**Request URL:** https://petstore.swagger.io/v2/pet/{petId} 

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body = NA
```

**Steps to Reproduce:**

Send a GET request to the API endpoint

**Response Payload:**

```
Response body = 
{
"id":501,
"username":"testuser1",
"firstName":"Amit",
"lastName":"Kumar",
"email":"amitkumar@gmail.com",
"password":"password1",
"phone":"7845462612",
"userStatus":1
}

Response headers = 

 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:13:22 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response body should match with JSON schema as per spec.
{
    "$schema": "http://json-schema.org/draft-06/schema#",
    "$ref": "#/definitions/Welcome6",
    "definitions": {
        "Welcome6": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "id": {
                    "type": "integer"
                },
                "username": {
                    "type": "string"
                },
                "firstName": {
                    "type": "string"
                },
                "lastName": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "phone": {
                    "type": "string"
                },
                "userStatus": {
                    "type": "integer"
                }
            },
            "required": [
                "email",
                "firstName",
                "id",
                "lastName",
                "password",
                "phone",
                "userStatus",
                "username"
            ],
            "title": "Welcome6"
        }
    }
}

---

#### Test Case: TS001_TC007

**Description:** Validate that API should return response body with details of existing user where id  = id of user has provided in API URL

**HTTP Method:** GET

**Request URL:** https://petstore.swagger.io/v2/pet/{petId} 

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body = NA
```

**Steps to Reproduce:**

Send a GET request to the API endpoint

**Response Payload:**

```
Response body = 
{
"id":501,
"username":"testuser1",
"firstName":"Amit",
"lastName":"Kumar",
"email":"amitkumar@gmail.com",
"password":"password1",
"phone":"7845462612",
"userStatus":1
}

Response headers = 

 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:13:22 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response body should have details of all existing users

---

#### Test Case: TS001_TC008

**Description:** Validate that API should return same details ( same record with same details ) on re-executing the same request just after first execution ie. - it should not make any change to database details ( i.e. GET API is idempotence ).

**HTTP Method:** GET

**Request URL:** https://petstore.swagger.io/v2/pet/{petId} 

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body = NA
```

**Steps to Reproduce:**

Send a GET request to the API endpoint

Send GET request again to the API endpoint

**Response Payload:**

```
Response body = 
{
"id":501,
"username":"testuser1",
"firstName":"Amit",
"lastName":"Kumar",
"email":"amitkumar@gmail.com",
"password":"password1",
"phone":"7845462612",
"userStatus":1
}

Response headers = 

 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:13:22 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response body should have same output fo both runs

---

#### Test Case: TS001_TC009

**Description:** Validate that API should return response headers - AS PER SPEC as follows:-
 access-control-allow-headers: Content-Type,api_key,Authorization 
 access-control-allow-methods: GET,POST,DELETE,PUT 
 access-control-allow-origin: * 
 content-type: application/json 
 date: Sat,31 Aug 2024 14:24:03 GMT 
 server: Jetty(9.2.9.v20150224) 

**HTTP Method:** GET

**Request URL:** https://petstore.swagger.io/v2/pet/{petId} 

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body = NA
```

**Steps to Reproduce:**

Send a GET request to the API endpoint

**Response Payload:**

```
Response body = 
{
"id":501,
"username":"testuser1",
"firstName":"Amit",
"lastName":"Kumar",
"email":"amitkumar@gmail.com",
"password":"password1",
"phone":"7845462612",
"userStatus":1
}

Response headers = 

 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:13:22 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

response headers - AS PER SPEC as follows:-
including content-type, connection, cache-control, expires, access-control-allow-origin, keep-alive, HSTS, and other standard header fields ... You can alse mention which headers should be empty/non-empty with what values.

---

### Scenario: TS002

#### Test Case: TS002_TC001

**Description:** Validate that API should return API status code within 2XX series

**HTTP Method:** POST

**Request URL:** https://petstore.swagger.io/v2/pet

**Request Payload:**

```
Body = 
{
  "id": 103,
  "category": {
    "id": 101,
    "name": "CAT2"
  },
  "name": "catie",
  "photoUrls": [
    "URL2"
  ],
  "tags": [
    {
      "id": 9,
      "name": "TAGO1"
    }
  ],
  "status": "available"
}

Headers=
accept: application/json
Content-Type: application/json 
```

**Steps to Reproduce:**

Send a POST request to the API endpoint with adequate Request body

**Response Payload:**

```
Body= 
{"code":200,"type":"unknown","message":"501"}

Response headers = 
 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:11:28 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Status code should fall in 2XX  series

---

#### Test Case: TS002_TC002

**Description:** Validate that API should return API status code = 201 created

NOTE: Usually POST required leads to 201 created response status code, but for this API as per API doc, we have to use 200

**HTTP Method:** POST

**Request URL:** https://petstore.swagger.io/v2/pet 

**Request Payload:**

```
Body = 
{
  "id": 103,
  "category": {
    "id": 101,
    "name": "CAT2"
  },
  "name": "catie",
  "photoUrls": [
    "URL2"
  ],
  "tags": [
    {
      "id": 9,
      "name": "TAGO1"
    }
  ],
  "status": "available"
}

Headers=
accept: application/json
Content-Type: application/json 
```

**Steps to Reproduce:**

Send a POST request to the API endpoint with adequate Request body

**Response Payload:**

```
Body= 
{"code":200,"type":"unknown","message":"501"}

Response headers = 
 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:11:28 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Status code=201 created

---

#### Test Case: TS002_TC003

**Description:** Validate that API should return API response provided user sends request body with content of user to be saved

**HTTP Method:** POST

**Request URL:** https://petstore.swagger.io/v2/pet 

**Request Payload:**

```
Body = 
{
  "id": 103,
  "category": {
    "id": 101,
    "name": "CAT2"
  },
  "name": "catie",
  "photoUrls": [
    "URL2"
  ],
  "tags": [
    {
      "id": 9,
      "name": "TAGO1"
    }
  ],
  "status": "available"
}

Headers=
accept: application/json
Content-Type: application/json 
```

**Steps to Reproduce:**

Send a POST request to the API endpoint with adequate Request body

**Response Payload:**

```
Body= 
{"code":200,"type":"unknown","message":"501"}

Response headers = 
 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:11:28 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

API should return response provided user sends request body with content of user to be saved

---

#### Test Case: TS002_TC004

**Description:** Validate that API should return a response payload ie. Non-empty response body and response header

**HTTP Method:** POST

**Request URL:** https://petstore.swagger.io/v2/pet 

**Request Payload:**

```
Body = 
{
  "id": 103,
  "category": {
    "id": 101,
    "name": "CAT2"
  },
  "name": "catie",
  "photoUrls": [
    "URL2"
  ],
  "tags": [
    {
      "id": 9,
      "name": "TAGO1"
    }
  ],
  "status": "available"
}

Headers=
accept: application/json
Content-Type: application/json 
```

**Steps to Reproduce:**

Send a POST request to the API endpoint with adequate Request body

**Response Payload:**

```
Body= 
{"code":200,"type":"unknown","message":"501"}

Response headers = 
 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:11:28 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response Body= Non-empty 
body= {
  "code": 200,
  "type": "unknown",
  "message": "9223372036854761889"
}

Response headers = (Non-Empty)
access-control-allow-headers: Content-Type,api_key,Authorization 
 access-control-allow-methods: GET,POST,DELETE,PUT 
 access-control-allow-origin: * 
 content-type: application/json 
 date: Sat,31 Aug 2024 14:23:08 GMT 
 server: Jetty(9.2.9.v20150224) 

---

#### Test Case: TS002_TC005

**Description:** Validate that API should return response of type = JSON

**HTTP Method:** POST

**Request URL:** https://petstore.swagger.io/v2/pet 

**Request Payload:**

```
Body = 
{
  "id": 103,
  "category": {
    "id": 101,
    "name": "CAT2"
  },
  "name": "catie",
  "photoUrls": [
    "URL2"
  ],
  "tags": [
    {
      "id": 9,
      "name": "TAGO1"
    }
  ],
  "status": "available"
}

Headers=
accept: application/json
Content-Type: application/json 
```

**Steps to Reproduce:**

Send a POST request to the API endpoint with adequate Request body

**Response Payload:**

```
Body= 
{"code":200,"type":"unknown","message":"501"}

Response headers = 
 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:11:28 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response type= JSON

---

#### Test Case: TS002_TC006

**Description:** Validate that API should should adhere to Response structure as per data model mentioned in API Spec or API Doc.- JSON SCHEMA VALIDATION

**HTTP Method:** POST

**Request URL:** https://petstore.swagger.io/v2/pet 

**Request Payload:**

```
Body = 
{
  "id": 103,
  "category": {
    "id": 101,
    "name": "CAT2"
  },
  "name": "catie",
  "photoUrls": [
    "URL2"
  ],
  "tags": [
    {
      "id": 9,
      "name": "TAGO1"
    }
  ],
  "status": "available"
}

Headers=
accept: application/json
Content-Type: application/json 
```

**Steps to Reproduce:**

Send a POST request to the API endpoint with adequate Request body

**Response Payload:**

```
Body= 
{"code":200,"type":"unknown","message":"501"}

Response headers = 
 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:11:28 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response payload should comply with expected JSON schema

Expected JSON-Schema: 
{
    "$schema": "http://json-schema.org/draft-06/schema#",
    "$ref": "#/definitions/Welcome7",
    "definitions": {
        "Welcome7": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "code": {
                    "type": "integer"
                },
                "type": {
                    "type": "string"
                },
                "message": {
                    "type": "string"
                }
            },
            "required": [
                "code",
                "message",
                "type"
            ],
            "title": "Welcome7"
        }
    }
}


---

#### Test Case: TS002_TC007

**Description:** Validate that API should return response body with content containing details as provided in request body.

**HTTP Method:** POST

**Request URL:** https://petstore.swagger.io/v2/pet 

**Request Payload:**

```
Body = 
{
  "id": 103,
  "category": {
    "id": 101,
    "name": "CAT2"
  },
  "name": "catie",
  "photoUrls": [
    "URL2"
  ],
  "tags": [
    {
      "id": 9,
      "name": "TAGO1"
    }
  ],
  "status": "available"
}

Headers=
accept: application/json
Content-Type: application/json 
```

**Steps to Reproduce:**

Send a POST request to the API endpoint with adequate Request body

**Response Payload:**

```
Body= 
{"code":200,"type":"unknown","message":"501"}

Response headers = 
 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:11:28 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

body= {
  "code": 200,
  "type": "unknown",
  "message": "9223372036854761889"
}

Response headers = 
access-control-allow-headers: Content-Type,api_key,Authorization 
 access-control-allow-methods: GET,POST,DELETE,PUT 
 access-control-allow-origin: * 
 content-type: application/json 
 date: Sat,31 Aug 2024 14:23:08 GMT 
 server: Jetty(9.2.9.v20150224) 

---

#### Test Case: TS002_TC008

**Description:** Validate that GET User with ID = Id of newly created record should return response with details of newly created user

**HTTP Method:** GET

**Request URL:** https://petstore.swagger.io/v2/pet/{petId} 

**Steps to Reproduce:**

Send a GET request to the API endpoint with #= id of newly created record

**Expected Result:**

Response payload should return detail of newly created record

---

#### Test Case: TS002_TC009

**Description:** Validate that API should return response headers - AS PER SPEC as follows:-
access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:35:35 GMT  server: Jetty(9.2.9.v20150224) 

**HTTP Method:** POST

**Request URL:** https://petstore.swagger.io/v2/pet 

**Request Payload:**

```
Body = 
{
  "id": 103,
  "category": {
    "id": 101,
    "name": "CAT2"
  },
  "name": "catie",
  "photoUrls": [
    "URL2"
  ],
  "tags": [
    {
      "id": 9,
      "name": "TAGO1"
    }
  ],
  "status": "available"
}

Headers=
accept: application/json
Content-Type: application/json 
```

**Steps to Reproduce:**

Send a POST request to the API endpoint with adequate Request body

**Response Payload:**

```
Body= 
{"code":200,"type":"unknown","message":"501"}

Response headers = 
access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:35:35 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response paysload should return headers - AS PER SPEC as follows:-
access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:35:35 GMT  server: Jetty(9.2.9.v20150224) 

---

### Scenario: TS003

#### Test Case: TS003_TC001

**Description:** Validate that API should return API status code within 2XX series

**HTTP Method:** PUT

**Request URL:** https://petstore.swagger.io/v2/pet/{petId} 

**Request Payload:**

```
Body = {
  "id": 0,
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "userStatus": 0
}

headers = 
accept: application/json
Content-Type: application/json
```

**Steps to Reproduce:**

Send a PUT request to the API endpoint with user id of existing user 

**Response Payload:**

```
Body = 
{    
"code": 200,    
"type": "unknown",    
"message": "202"
} 

Headers = 
access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:39:15 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Status code should fall in 2XX  series

---

#### Test Case: TS003_TC002

**Description:** Validate that API should return API status code = 200 resource updated successfully or 201 in case record got saved successfully 

**HTTP Method:** PUT

**Request URL:** https://petstore.swagger.io/v2/pet/{petId} 

**Request Payload:**

```
Body = {
  "id": 0,
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "userStatus": 0
}

headers = 
accept: application/json
Content-Type: application/json
```

**Steps to Reproduce:**

Send a PUT request to the API endpoint with user id of existing user 

**Response Payload:**

```
Body = 
{    
"code": 200,    
"type": "unknown",    
"message": "202"
} 

Headers = 
access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:39:15 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Status code=200

---

#### Test Case: TS003_TC003

**Description:** Validate that API should return API response body provided user sends request body with new values user wants to update for an existing user 

**HTTP Method:** PUT

**Request URL:** https://petstore.swagger.io/v2/pet/{petId} 

**Request Payload:**

```
Body = {
  "id": 0,
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "userStatus": 0
}

headers = 
accept: application/json
Content-Type: application/json
```

**Steps to Reproduce:**

Send a PUT request to the API endpoint with user id of existing user 

**Response Payload:**

```
Body = {
  "code": 200,
  "type": "unknown",
  "message": "9223372036854762097"
}

Headers = 
 access-control-allow-headers: Content-Type,api_key,Authorization 
 access-control-allow-methods: GET,POST,DELETE,PUT 
 access-control-allow-origin: * 
 content-type: application/json 
 date: Day,Date Mon yyyy 14:49:12 GMT 
 server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Status code=200

---

#### Test Case: TS003_TC004

**Description:** Validate that API should return a response payload ie. Non-empty response body and response header

**HTTP Method:** PUT

**Request URL:** https://petstore.swagger.io/v2/pet/{petId} 

**Request Payload:**

```
Body = {
  "id": 0,
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "userStatus": 0
}

headers = 
accept: application/json
Content-Type: application/json
```

**Steps to Reproduce:**

Send a PUT request to the API endpoint with user id of existing user 

**Response Payload:**

```
Body = 
{    
"code": 200,    
"type": "unknown",    
"message": "202"
} 

Headers = 
access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:39:15 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response payload should have Non-empty response body and response header

---

#### Test Case: TS003_TC005

**Description:** Validate that API should return response of type = JSON

**HTTP Method:** PUT

**Request URL:** https://petstore.swagger.io/v2/pet/{petId} 

**Request Payload:**

```
Body = {
  "id": 0,
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "userStatus": 0
}

headers = 
accept: application/json
Content-Type: application/json
```

**Steps to Reproduce:**

Send a PUT request to the API endpoint with user id of existing user 

**Response Payload:**

```
Body = 
{    
"code": 200,    
"type": "unknown",    
"message": "202"
} 

Headers = 
access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:39:15 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response type= JSON

---

#### Test Case: TS003_TC006

**Description:** Validate that API should should adhere to Response structure as per data model mentioned in API Spec or API Doc.- JSON SCHEMA VALIDATION

**HTTP Method:** PUT

**Request URL:** https://petstore.swagger.io/v2/pet/{petId} 

**Request Payload:**

```
Body = {
  "id": 0,
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "userStatus": 0
}

headers = 
accept: application/json
Content-Type: application/json
```

**Steps to Reproduce:**

Send a PUT request to the API endpoint with user id of existing user 

**Response Payload:**

```
Body = {
  "code": 200,
  "type": "unknown",
  "message": "9223372036854762097"
}

Headers = 
 access-control-allow-headers: Content-Type,api_key,Authorization 
 access-control-allow-methods: GET,POST,DELETE,PUT 
 access-control-allow-origin: * 
 content-type: application/json 
 date: Day,Date Mon yyyy 14:49:12 GMT 
 server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Json schema validation should pass

---

#### Test Case: TS003_TC007

**Description:** Valdiate that API should return response body with content containing details as provided in request body .

**HTTP Method:** PUT

**Request URL:** https://petstore.swagger.io/v2/pet/{petId} 

**Request Payload:**

```
Body = {
  "id": 0,
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "userStatus": 0
}

headers = 
accept: application/json
Content-Type: application/json
```

**Steps to Reproduce:**

Send a PUT request to the API endpoint with user id of existing user 

**Response Payload:**

```
Body = {
  "code": 200,
  "type": "unknown",
  "message": "9223372036854762097"
}

Headers = 
 access-control-allow-headers: Content-Type,api_key,Authorization 
 access-control-allow-methods: GET,POST,DELETE,PUT 
 access-control-allow-origin: * 
 content-type: application/json 
 date: Day,Date Mon yyyy 14:49:12 GMT 
 server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response body should have content containing details as provided in request body

---

#### Test Case: TS003_TC008

**Description:** Validate that GET User with ID = Id used in API request url / request header should return response with newly udpated details

**HTTP Method:** GET

**Request URL:** https://petstore.swagger.io/v2/pet/{petId} 

**Steps to Reproduce:**

Send a GET request to the API endpoint with user id of existing user which got updated in previous test case

**Expected Result:**

Response payload should contain response with newly updated details

---

#### Test Case: TS003_TC009

**Description:** Validate that GET All Users should return response with details of all users with updated values for user with id = id used in PUT request

**HTTP Method:** GET

**Request URL:** https://petstore.swagger.io/v2/pet/{petId} 

**Steps to Reproduce:**

Send a GET request to the API endpoint

**Expected Result:**

Response payload should contain response including newly updated record

---

#### Test Case: TS003_TC010

**Description:** Validate that API should return response headers - AS PER SPEC as follows:-
including content-type, connection, cache-control, expires, access-control-allow-origin, keep-alive, HSTS, and other standard header fields ... You can alse mention which headers should be empty/non-empty with what values.

**HTTP Method:** PUT

**Request URL:** https://petstore.swagger.io/v2/pet/{petId} 

**Request Payload:**

```
Body = {
  "id": 0,
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "userStatus": 0
}

headers = 
accept: application/json
Content-Type: application/json
```

**Steps to Reproduce:**

Send a PUT request to the API endpoint with user id of existing user 

**Response Payload:**

```
Body = 
{    
"code": 200,    
"type": "unknown",    
"message": "202"
} 

Headers = 
access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:39:15 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response payload should return response headers - AS PER SPEC as follows:-
including content-type, connection, cache-control, expires, access-control-allow-origin, keep-alive, HSTS, and other standard header fields ... You can alse mention which headers should be empty/non-empty with what values.

---

### Scenario: TS004

#### Test Case: TS004_TC001

**Description:** Validate that API should return API status code within 2XX series

**HTTP Method:** DELETE

**Request URL:** https://petstore.swagger.io/v2/user/{username}

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body = NA
```

**Steps to Reproduce:**

Send a DELETE request to the API endpoint with user id of existing user 

**Response Payload:**

```
Body =
{
  "code": 200,
  "type": "unknown",
  "message": "<username>"
}

Headers = 
access-control-allow-headers: Content-Type,api_key,Authorization 
 access-control-allow-methods: GET,POST,DELETE,PUT 
 access-control-allow-origin: * 
 content-type: application/json 
 date: Sat,31 Aug 2024 16:32:33 GMT 
 server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

 

---

#### Test Case: TS004_TC002

**Description:** Validate that API should return API status code = 204 No content

**HTTP Method:** DELETE

**Request URL:** https://petstore.swagger.io/v2/user/{username}

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body = NA
```

**Steps to Reproduce:**

Send a DELETE request to the API endpoint with user id of existing user 

**Response Payload:**

```
Body ={
  "code": 200,
  "type": "unknown",
  "message": "<username>"
}

Headers = 
access-control-allow-headers: Content-Type,api_key,Authorization 
 access-control-allow-methods: GET,POST,DELETE,PUT 
 access-control-allow-origin: * 
 content-type: application/json 
 date: Sat,31 Aug 2024 16:32:33 GMT 
 server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response status code = 204 No Content

---

#### Test Case: TS004_TC003

**Description:** Validate that API should return a response payload with Empty response body and Non-empty response header

**HTTP Method:** DELETE

**Request URL:** https://petstore.swagger.io/v2/user/{username}

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body = NA
```

**Steps to Reproduce:**

Send a DELETE request to the API endpoint with user id of existing user 

**Response Payload:**

```
Body ={
  "code": 200,
  "type": "unknown",
  "message": "<username>"
}

Headers = 
access-control-allow-headers: Content-Type,api_key,Authorization 
 access-control-allow-methods: GET,POST,DELETE,PUT 
 access-control-allow-origin: * 
 content-type: application/json 
 date: Sat,31 Aug 2024 16:32:33 GMT 
 server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response payload with Empty response body and Non-empty response header

---

#### Test Case: TS004_TC004

**Description:** Validate that GET User with ID = Id used in API request url / request header should return Blank response body executed Delete request for target id

**HTTP Method:** GET

**Request URL:** https://petstore.swagger.io/v2/user/{username}

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body = NA
```

**Steps to Reproduce:**

Send a GET request to the API endpoint with user id of removed user

**Expected Result:**

Response body= Empty

---

#### Test Case: TS004_TC005

**Description:** Validate that API should return response headers - AS PER SPEC as follows:-
including content-type, connection, cache-control, expires, access-control-allow-origin, keep-alive, HSTS, and other standard header fields ... You can alse mention which headers should be empty/non-empty with what values.

**HTTP Method:** DELETE

**Request URL:** https://petstore.swagger.io/v2/user/{username}

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body = NA
```

**Steps to Reproduce:**

Send a DELETE request to the API endpoint with user id of existing user 

**Expected Result:**

Response payload with response headers - AS PER SPEC as follows:-
including content-type, connection, cache-control, expires, access-control-allow-origin, keep-alive, HSTS, and other standard header fields ... You can alse mention which headers should be empty/non-empty with what values.

---

#### Test Case: TS004_TC006

**Description:** Validate that re-running the same API again should not return any response payload with response code = 404 Not Found

**HTTP Method:** DELETE

**Request URL:** https://petstore.swagger.io/v2/user/{username}

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body = NA
```

**Steps to Reproduce:**

Send a DELETE request to the API endpoint with user id of non-existing user 

**Response Payload:**

```
Body =
Headers = 
access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-length: 0  date: Tue,04 Mar 2025 06:57:12 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response code should be 404 Not Found.

---

#### Test Case: TS004_TC007

**Description:** Validate that API should should adhere to Response structure as per data model mentioned in API Spec or API Doc.- JSON SCHEMA VALIDATION

**HTTP Method:** DELETE

**Request URL:** https://petstore.swagger.io/v2/user/{username}

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body = NA
```

**Steps to Reproduce:**

Send a PUT request to the API endpoint with user id of existing user 

**Response Payload:**

```
Body =
{
  "code": 200,
  "type": "unknown",
  "message": "additionalMetadata: sd\nFile uploaded to ./file-sample_150kB.pdf, 142786 bytes"
}

Headers = 
access-control-allow-headers: Content-Type,api_key,Authorization 
 access-control-allow-methods: GET,POST,DELETE,PUT 
 access-control-allow-origin: * 
 content-type: application/json 
 date: Sat,31 Aug 2024 16:32:33 GMT 
 server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response payload should comply with expected JSON schema

Expected JSON-Schema: 
{
    "$schema": "http://json-schema.org/draft-06/schema#",
    "$ref": "#/definitions/Welcome1",
    "definitions": {
        "Welcome1": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "code": {
                    "type": "integer"
                },
                "type": {
                    "type": "string"
                },
                "message": {
                    "type": "string"
                }
            },
            "required": [
                "code",
                "message",
                "type"
            ],
            "title": "Welcome1"
        }
    }
}

---

### Scenario: TS005

#### Test Case: TS005_TC001

**Description:** Validate that a user can successfully upload a .pdf file with valid text metadata.

**HTTP Method:** POST

**Request URL:** https://petstore.swagger.io/v2/pet/{petId}/uploadImage

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body =
file: '../FRAMEWORK2/Files/FILE1.pdf', 
additionalMetadata: 'This is additional metadata'

```

**Steps to Reproduce:**

Send a POST request to the API endpoint with user id of existing user 

**Response Payload:**

```
Body =
{
  "code": 200,
  "type": "unknown",
  "message": "additionalMetadata: sd\nFile uploaded to ./file-sample_150kB.pdf, 142786 bytes"
}

Headers = 
access-control-allow-headers: Content-Type,api_key,Authorization 
 access-control-allow-methods: GET,POST,DELETE,PUT 
 access-control-allow-origin: * 
 content-type: application/json 
 date: Sat,31 Aug 2024 16:32:33 GMT 
 server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

 HTTP Status 200 OK, and response contains "message": "additionalMetadata: ..." showing the file was saved.

---

#### Test Case: TS005_TC002

**Description:** Validate that standard image formats are accepted by the server.

**HTTP Method:** POST

**Request URL:** https://petstore.swagger.io/v2/pet/{petId}/uploadImage

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body =
file: '../FRAMEWORK2/Files/FILE1.pdf', 
additionalMetadata: 'This is additional metadata'

```

**Steps to Reproduce:**

Send a POST request to the API endpoint with user id of existing user 

**Response Payload:**

```
Body =
{
  "code": 200,
  "type": "unknown",
  "message": "additionalMetadata: sd\nFile uploaded to ./file-sample_150kB.pdf, 142786 bytes"
}

Headers = 
access-control-allow-headers: Content-Type,api_key,Authorization 
 access-control-allow-methods: GET,POST,DELETE,PUT 
 access-control-allow-origin: * 
 content-type: application/json 
 date: Sat,31 Aug 2024 16:32:33 GMT 
 server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

 HTTP Status 200 OK, and response contains "message": "additionalMetadata: ..." showing the file was saved.

---

#### Test Case: TS005_TC003

**Description:** : Send only the file buffer payload and leave the additionalMetadata string completely blank or empty.

**HTTP Method:** POST

**Request URL:** https://petstore.swagger.io/v2/pet/{petId}/uploadImage

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body =
file: '../FRAMEWORK2/Files/FILE1.pdf', 
additionalMetadata: 'This is additional metadata'

```

**Steps to Reproduce:**

Send a POST request to the API endpoint with user id of existing user 

**Response Payload:**

```
Body =
{
  "code": 200,
  "type": "unknown",
  "message": "additionalMetadata: sd\nFile uploaded to ./file-sample_150kB.pdf, 142786 bytes"
}

Headers = 
access-control-allow-headers: Content-Type,api_key,Authorization 
 access-control-allow-methods: GET,POST,DELETE,PUT 
 access-control-allow-origin: * 
 content-type: application/json 
 date: Sat,31 Aug 2024 16:32:33 GMT 
 server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

HTTP Status 200 OK (verifies metadata is truly optional).

---

#### Test Case: TS005_TC004

**Description:**  Send the request without appending the file parameter at all (only send additionalMetadata).

**HTTP Method:** POST

**Request URL:** https://petstore.swagger.io/v2/pet/{petId}/uploadImage

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body =
file: '../FRAMEWORK2/Files/FILE1.pdf', 
additionalMetadata: 'This is additional metadata'

```

**Steps to Reproduce:**

Send a POST request to the API endpoint with user id of existing user 

**Response Payload:**

```
Body =
{
  "code": 200,
  "type": "unknown",
  "message": "additionalMetadata: sd\nFile uploaded to ./file-sample_150kB.pdf, 142786 bytes"
}

Headers = 
access-control-allow-headers: Content-Type,api_key,Authorization 
 access-control-allow-methods: GET,POST,DELETE,PUT 
 access-control-allow-origin: * 
 content-type: application/json 
 date: Sat,31 Aug 2024 16:32:33 GMT 
 server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

HTTP Status 400 Bad Request or a custom error message indicating the file is missing.

---

#### Test Case: TS005_TC005

**Description:** Validate that API should return response headers - AS PER SPEC as follows:-
including content-type, connection, cache-control, expires, access-control-allow-origin, keep-alive, HSTS, and other standard header fields ... You can alse mention which headers should be empty/non-empty with what values.

**HTTP Method:** POST

**Request URL:** https://petstore.swagger.io/v2/pet/{petId}/uploadImage

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body =
file: '../FRAMEWORK2/Files/FILE1.pdf', 
additionalMetadata: 'This is additional metadata'

```

**Steps to Reproduce:**

Send a POST request to the API endpoint with user id of existing user 

**Response Payload:**

```
Body =
{
  "code": 200,
  "type": "unknown",
  "message": "additionalMetadata: sd\nFile uploaded to ./file-sample_150kB.pdf, 142786 bytes"
}

Headers = 
access-control-allow-headers: Content-Type,api_key,Authorization 
 access-control-allow-methods: GET,POST,DELETE,PUT 
 access-control-allow-origin: * 
 content-type: application/json 
 date: Sat,31 Aug 2024 16:32:33 GMT 
 server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response payload with response headers - AS PER SPEC as follows:-
including content-type, connection, cache-control, expires, access-control-allow-origin, keep-alive, HSTS, and other standard header fields ... You can alse mention which headers should be empty/non-empty with what values.

---

#### Test Case: TS005_TC006

**Description:**  Attempt to upload a very large file (e.g., > 20MB or 50MB dummy file)

**HTTP Method:** POST

**Request URL:** https://petstore.swagger.io/v2/pet/{petId}/uploadImage

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body =
file: '../FRAMEWORK2/Files/FILE1.pdf', 
additionalMetadata: 'This is additional metadata'

```

**Steps to Reproduce:**

Send a POST request to the API endpoint with user id of existing user 

**Response Payload:**

```
Body =
{
  "code": 200,
  "type": "unknown",
  "message": "additionalMetadata: sd\nFile uploaded to ./file-sample_150kB.pdf, 142786 bytes"
}

Headers = 
access-control-allow-headers: Content-Type,api_key,Authorization 
 access-control-allow-methods: GET,POST,DELETE,PUT 
 access-control-allow-origin: * 
 content-type: application/json 
 date: Sat,31 Aug 2024 16:32:33 GMT 
 server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

HTTP Status 413 Payload Too Large or standard server limitation rejection.

---

#### Test Case: TS005_TC007

**Description:** Validate that API should should adhere to Response structure as per data model mentioned in API Spec or API Doc.- JSON SCHEMA VALIDATION

**HTTP Method:** POST

**Request URL:** https://petstore.swagger.io/v2/pet/{petId}/uploadImage

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body =
file: '../FRAMEWORK2/Files/FILE1.pdf', 
additionalMetadata: 'This is additional metadata'

```

**Steps to Reproduce:**

Send a POST request to the API endpoint with user id of existing user 

**Response Payload:**

```
Body =
{
  "code": 200,
  "type": "unknown",
  "message": "additionalMetadata: sd\nFile uploaded to ./file-sample_150kB.pdf, 142786 bytes"
}

Headers = 
access-control-allow-headers: Content-Type,api_key,Authorization 
 access-control-allow-methods: GET,POST,DELETE,PUT 
 access-control-allow-origin: * 
 content-type: application/json 
 date: Sat,31 Aug 2024 16:32:33 GMT 
 server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response payload should comply with expected JSON schema

Expected JSON-Schema: 
{
    "$schema": "http://json-schema.org/draft-06/schema#",
    "$ref": "#/definitions/Welcome1",
    "definitions": {
        "Welcome1": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "code": {
                    "type": "integer"
                },
                "type": {
                    "type": "string"
                },
                "message": {
                    "type": "string"
                }
            },
            "required": [
                "code",
                "message",
                "type"
            ],
            "title": "Welcome1"
        }
    }
}

---

#### Test Case: TS005_TC008

**Description:** Send a valid file upload request, but pass a completely random or massive numeric id in the URL that doesn't exist in the store database.

**HTTP Method:** POST

**Request URL:** https://petstore.swagger.io/v2/pet/{petId}/uploadImage

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body =
file: '../FRAMEWORK2/Files/FILE1.pdf', 
additionalMetadata: 'This is additional metadata'

```

**Steps to Reproduce:**

Send a POST request to the API endpoint with user id of existing user 

**Response Payload:**

```
Body =
{
  "code": 200,
  "type": "unknown",
  "message": "additionalMetadata: sd\nFile uploaded to ./file-sample_150kB.pdf, 142786 bytes"
}

Headers = 
access-control-allow-headers: Content-Type,api_key,Authorization 
 access-control-allow-methods: GET,POST,DELETE,PUT 
 access-control-allow-origin: * 
 content-type: application/json 
 date: Sat,31 Aug 2024 16:32:33 GMT 
 server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Depending on system setup, either 404 Not Found or 200 OK with an unknown status (since this mock store auto-caches new IDs).

---

## Module: STORE_MODULE

### Scenario: TS001

#### Test Case: TS001_TC001

**Description:** Validate that API should return API status code within 2XX series

**HTTP Method:** GET

**Request URL:** https://petstore.swagger.io/v2/pet/{petId} 

**Request Payload:**

```
Request Headers = 
accept: application/json'
Api_key: amit' 

Request body = NA
```

**Steps to Reproduce:**

Send a GET request to the API endpoint

**Response Payload:**

```
Response body = 
{
"id":501,
"username":"testuser1",
"firstName":"Amit",
"lastName":"Kumar",
"email":"amitkumar@gmail.com",
"password":"password1",
"phone":"7845462612",
"userStatus":1
}

Response headers = 

 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:13:22 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Status code should fall in 2XX  series

---

#### Test Case: TS001_TC002

**Description:** Validate that API should return API status code = 200 OK

**HTTP Method:** GET

**Request URL:** https://petstore.swagger.io/v2/pet/{petId} 

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body = NA
```

**Steps to Reproduce:**

Send a GET request to the API endpoint

**Response Payload:**

```
Response body = 
{
"id":501,
"username":"testuser1",
"firstName":"Amit",
"lastName":"Kumar",
"email":"amitkumar@gmail.com",
"password":"password1",
"phone":"7845462612",
"userStatus":1
}

Response headers = 

 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:13:22 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response Status code = 200 Ok

---

#### Test Case: TS001_TC003

**Description:** Validate that API should return response body provided user don't send any request body

**HTTP Method:** GET

**Request URL:** https://petstore.swagger.io/v2/pet/{petId} 

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body = NA
```

**Steps to Reproduce:**

Send a GET request to the API endpoint

**Response Payload:**

```
Response body = 
{
"id":501,
"username":"testuser1",
"firstName":"Amit",
"lastName":"Kumar",
"email":"amitkumar@gmail.com",
"password":"password1",
"phone":"7845462612",
"userStatus":1
}

Response headers = 

 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:13:22 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response Status code = 200 Ok

---

#### Test Case: TS001_TC004

**Description:** Validate that API should return a response payload i.e. Non-empty response body and response header

**HTTP Method:** GET

**Request URL:** https://petstore.swagger.io/v2/pet/{petId} 

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body = NA
```

**Steps to Reproduce:**

Send a GET request to the API endpoint

**Response Payload:**

```
Response body = 
{
"id":501,
"username":"testuser1",
"firstName":"Amit",
"lastName":"Kumar",
"email":"amitkumar@gmail.com",
"password":"password1",
"phone":"7845462612",
"userStatus":1
}

Response headers = 

 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:13:22 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response Header= Non-empty

Response body= Non-Empty

---

#### Test Case: TS001_TC005

**Description:** Validate that API should return response of type = JSON

**HTTP Method:** GET

**Request URL:** https://petstore.swagger.io/v2/pet/{petId} 

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body = NA
```

**Steps to Reproduce:**

Send a GET request to the API endpoint

**Response Payload:**

```
Response body = 
{
"id":501,
"username":"testuser1",
"firstName":"Amit",
"lastName":"Kumar",
"email":"amitkumar@gmail.com",
"password":"password1",
"phone":"7845462612",
"userStatus":1
}

Response headers = 

 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:13:22 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response type= JSON

---

#### Test Case: TS001_TC006

**Description:** Validate that API should should adhere to Response structure as per data model mentioned in API Spec or API Doc.- JSON SCHEMA VALIDATION

**HTTP Method:** GET

**Request URL:** https://petstore.swagger.io/v2/pet/{petId} 

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body = NA
```

**Steps to Reproduce:**

Send a GET request to the API endpoint

**Response Payload:**

```
Response body = 
{
"id":501,
"username":"testuser1",
"firstName":"Amit",
"lastName":"Kumar",
"email":"amitkumar@gmail.com",
"password":"password1",
"phone":"7845462612",
"userStatus":1
}

Response headers = 

 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:13:22 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response body should match with JSON schema as per spec.
{
    "$schema": "http://json-schema.org/draft-06/schema#",
    "$ref": "#/definitions/Welcome6",
    "definitions": {
        "Welcome6": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "id": {
                    "type": "integer"
                },
                "username": {
                    "type": "string"
                },
                "firstName": {
                    "type": "string"
                },
                "lastName": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "phone": {
                    "type": "string"
                },
                "userStatus": {
                    "type": "integer"
                }
            },
            "required": [
                "email",
                "firstName",
                "id",
                "lastName",
                "password",
                "phone",
                "userStatus",
                "username"
            ],
            "title": "Welcome6"
        }
    }
}

---

#### Test Case: TS001_TC007

**Description:** Validate that API should return response body with details of existing user where id  = id of user has provided in API URL

**HTTP Method:** GET

**Request URL:** https://petstore.swagger.io/v2/pet/{petId} 

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body = NA
```

**Steps to Reproduce:**

Send a GET request to the API endpoint

**Response Payload:**

```
Response body = 
{
"id":501,
"username":"testuser1",
"firstName":"Amit",
"lastName":"Kumar",
"email":"amitkumar@gmail.com",
"password":"password1",
"phone":"7845462612",
"userStatus":1
}

Response headers = 

 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:13:22 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response body should have details of all existing users

---

#### Test Case: TS001_TC008

**Description:** Validate that API should return same details ( same record with same details ) on re-executing the same request just after first execution ie. - it should not make any change to database details ( i.e. GET API is idempotence ).

**HTTP Method:** GET

**Request URL:** https://petstore.swagger.io/v2/pet/{petId} 

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body = NA
```

**Steps to Reproduce:**

Send a GET request to the API endpoint

Send GET request again to the API endpoint

**Response Payload:**

```
Response body = 
{
"id":501,
"username":"testuser1",
"firstName":"Amit",
"lastName":"Kumar",
"email":"amitkumar@gmail.com",
"password":"password1",
"phone":"7845462612",
"userStatus":1
}

Response headers = 

 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:13:22 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response body should have same output fo both runs

---

#### Test Case: TS001_TC009

**Description:** Validate that API should return response headers - AS PER SPEC as follows:-
 access-control-allow-headers: Content-Type,api_key,Authorization 
 access-control-allow-methods: GET,POST,DELETE,PUT 
 access-control-allow-origin: * 
 content-type: application/json 
 date: Sat,31 Aug 2024 14:24:03 GMT 
 server: Jetty(9.2.9.v20150224) 

**HTTP Method:** GET

**Request URL:** https://petstore.swagger.io/v2/pet/{petId} 

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body = NA
```

**Steps to Reproduce:**

Send a GET request to the API endpoint

**Response Payload:**

```
Response body = 
{
"id":501,
"username":"testuser1",
"firstName":"Amit",
"lastName":"Kumar",
"email":"amitkumar@gmail.com",
"password":"password1",
"phone":"7845462612",
"userStatus":1
}

Response headers = 

 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:13:22 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

response headers - AS PER SPEC as follows:-
including content-type, connection, cache-control, expires, access-control-allow-origin, keep-alive, HSTS, and other standard header fields ... You can alse mention which headers should be empty/non-empty with what values.

---

### Scenario: TS002

#### Test Case: TS002_TC001

**Description:** Validate that API should return API status code within 2XX series

**HTTP Method:** POST

**Request URL:** https://petstore.swagger.io/v2/user 

**Request Payload:**

```
Body = 
{  "id": 501,  "username": "testuser1",  "firstName": "Amit",  "lastName": "Kumar",  "email": "amitkumar@gmail.com",  "password": "password1",  "phone": "7845462612",  "userStatus": 1} 

Headers=
accept: application/json
Content-Type: application/json 
```

**Steps to Reproduce:**

Send a POST request to the API endpoint with adequate Request body

**Response Payload:**

```
Body= 
{"code":200,"type":"unknown","message":"501"}

Response headers = 
 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:11:28 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Status code should fall in 2XX  series

---

#### Test Case: TS002_TC002

**Description:** Validate that API should return API status code = 201 created

NOTE: Usually POST required leads to 201 created response status code, but for this API as per API doc, we have to use 200

**HTTP Method:** POST

**Request URL:** https://petstore.swagger.io/v2/user 

**Request Payload:**

```
Body = 
{  "id": 501,  "username": "testuser1",  "firstName": "Amit",  "lastName": "Kumar",  "email": "amitkumar@gmail.com",  "password": "password1",  "phone": "7845462612",  "userStatus": 1} 

Headers=
accept: application/json
Content-Type: application/json 
```

**Steps to Reproduce:**

Send a POST request to the API endpoint with adequate Request body

**Response Payload:**

```
Body= 
{"code":200,"type":"unknown","message":"501"}

Response headers = 
 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:11:28 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Status code=201 created

---

#### Test Case: TS002_TC003

**Description:** Validate that API should return API response provided user sends request body with content of user to be saved

**HTTP Method:** POST

**Request URL:** https://petstore.swagger.io/v2/user 

**Request Payload:**

```
Body = 
{  "id": 501,  "username": "testuser1",  "firstName": "Amit",  "lastName": "Kumar",  "email": "amitkumar@gmail.com",  "password": "password1",  "phone": "7845462612",  "userStatus": 1} 

Headers=
accept: application/json
Content-Type: application/json 
```

**Steps to Reproduce:**

Send a POST request to the API endpoint with adequate Request body

**Response Payload:**

```
Body= 
{"code":200,"type":"unknown","message":"501"}

Response headers = 
 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:11:28 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

API should return response provided user sends request body with content of user to be saved

---

#### Test Case: TS002_TC004

**Description:** Validate that API should return a response payload ie. Non-empty response body and response header

**HTTP Method:** POST

**Request URL:** https://petstore.swagger.io/v2/user 

**Request Payload:**

```
Body = 
{  "id": 501,  "username": "testuser1",  "firstName": "Amit",  "lastName": "Kumar",  "email": "amitkumar@gmail.com",  "password": "password1",  "phone": "7845462612",  "userStatus": 1} 

Headers=
accept: application/json
Content-Type: application/json 
```

**Steps to Reproduce:**

Send a POST request to the API endpoint with adequate Request body

**Response Payload:**

```
Body= 
{"code":200,"type":"unknown","message":"501"}

Response headers = 
 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:11:28 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response Body= Non-empty 
body= {
  "code": 200,
  "type": "unknown",
  "message": "9223372036854761889"
}

Response headers = (Non-Empty)
access-control-allow-headers: Content-Type,api_key,Authorization 
 access-control-allow-methods: GET,POST,DELETE,PUT 
 access-control-allow-origin: * 
 content-type: application/json 
 date: Sat,31 Aug 2024 14:23:08 GMT 
 server: Jetty(9.2.9.v20150224) 

---

#### Test Case: TS002_TC005

**Description:** Validate that API should return response of type = JSON

**HTTP Method:** POST

**Request URL:** https://petstore.swagger.io/v2/user 

**Request Payload:**

```
Body = 
{  "id": 501,  "username": "testuser1",  "firstName": "Amit",  "lastName": "Kumar",  "email": "amitkumar@gmail.com",  "password": "password1",  "phone": "7845462612",  "userStatus": 1} 

Headers=
accept: application/json
Content-Type: application/json 
```

**Steps to Reproduce:**

Send a POST request to the API endpoint with adequate Request body

**Response Payload:**

```
Body= 
{"code":200,"type":"unknown","message":"501"}

Response headers = 
 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:11:28 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response type= JSON

---

#### Test Case: TS002_TC006

**Description:** Validate that API should should adhere to Response structure as per data model mentioned in API Spec or API Doc.- JSON SCHEMA VALIDATION

**HTTP Method:** POST

**Request URL:** https://petstore.swagger.io/v2/user 

**Request Payload:**

```
Body = 
{  "id": 501,  "username": "testuser1",  "firstName": "Amit",  "lastName": "Kumar",  "email": "amitkumar@gmail.com",  "password": "password1",  "phone": "7845462612",  "userStatus": 1} 

Headers=
accept: application/json
Content-Type: application/json 
```

**Steps to Reproduce:**

Send a POST request to the API endpoint with adequate Request body

**Response Payload:**

```
Body= 
{"code":200,"type":"unknown","message":"501"}

Response headers = 
 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:11:28 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response payload should comply with expected JSON schema

Expected JSON-Schema: 
{
    "$schema": "http://json-schema.org/draft-06/schema#",
    "$ref": "#/definitions/Welcome7",
    "definitions": {
        "Welcome7": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "code": {
                    "type": "integer"
                },
                "type": {
                    "type": "string"
                },
                "message": {
                    "type": "string"
                }
            },
            "required": [
                "code",
                "message",
                "type"
            ],
            "title": "Welcome7"
        }
    }
}


---

#### Test Case: TS002_TC007

**Description:** Validate that API should return response body with content containing details as provided in request body.

**HTTP Method:** POST

**Request URL:** https://petstore.swagger.io/v2/user 

**Request Payload:**

```
Body = 
{  "id": 501,  "username": "testuser1",  "firstName": "Amit",  "lastName": "Kumar",  "email": "amitkumar@gmail.com",  "password": "password1",  "phone": "7845462612",  "userStatus": 1} 

Headers=
accept: application/json
Content-Type: application/json 
```

**Steps to Reproduce:**

Send a POST request to the API endpoint with adequate Request body

**Response Payload:**

```
Body= 
{"code":200,"type":"unknown","message":"501"}

Response headers = 
 access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:11:28 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

body= {
  "code": 200,
  "type": "unknown",
  "message": "9223372036854761889"
}

Response headers = 
access-control-allow-headers: Content-Type,api_key,Authorization 
 access-control-allow-methods: GET,POST,DELETE,PUT 
 access-control-allow-origin: * 
 content-type: application/json 
 date: Sat,31 Aug 2024 14:23:08 GMT 
 server: Jetty(9.2.9.v20150224) 

---

#### Test Case: TS002_TC008

**Description:** Validate that GET User with ID = Id of newly created record should return response with details of newly created user

**HTTP Method:** GET

**Request URL:** https://petstore.swagger.io/v2/pet/{petId} 

**Steps to Reproduce:**

Send a GET request to the API endpoint with #= id of newly created record

**Expected Result:**

Response payload should return detail of newly created record

---

#### Test Case: TS002_TC009

**Description:** Validate that API should return response headers - AS PER SPEC as follows:-
access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:35:35 GMT  server: Jetty(9.2.9.v20150224) 

**HTTP Method:** POST

**Request URL:** https://petstore.swagger.io/v2/user 

**Request Payload:**

```
Body = 
{  "id": 501,  "username": "testuser1",  "firstName": "Amit",  "lastName": "Kumar",  "email": "amitkumar@gmail.com",  "password": "password1",  "phone": "7845462612",  "userStatus": 1} 

Headers=
accept: application/json
Content-Type: application/json 
```

**Steps to Reproduce:**

Send a POST request to the API endpoint with adequate Request body

**Response Payload:**

```
Body= 
{"code":200,"type":"unknown","message":"501"}

Response headers = 
access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:35:35 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response paysload should return headers - AS PER SPEC as follows:-
access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-type: application/json  date: Tue,04 Mar 2025 06:35:35 GMT  server: Jetty(9.2.9.v20150224) 

---

### Scenario: TS003

#### Test Case: TS003_TC001

**Description:** Validate that API should return API status code within 2XX series

**HTTP Method:** DELETE

**Request URL:** https://petstore.swagger.io/v2/user/{username}

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body = NA
```

**Steps to Reproduce:**

Send a DELETE request to the API endpoint with user id of existing user 

**Response Payload:**

```
Body =
{
  "code": 200,
  "type": "unknown",
  "message": "<username>"
}

Headers = 
access-control-allow-headers: Content-Type,api_key,Authorization 
 access-control-allow-methods: GET,POST,DELETE,PUT 
 access-control-allow-origin: * 
 content-type: application/json 
 date: Sat,31 Aug 2024 16:32:33 GMT 
 server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

 

---

#### Test Case: TS003_TC002

**Description:** Validate that API should return API status code = 204 No content

**HTTP Method:** DELETE

**Request URL:** https://petstore.swagger.io/v2/user/{username}

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body = NA
```

**Steps to Reproduce:**

Send a DELETE request to the API endpoint with user id of existing user 

**Response Payload:**

```
Body ={
  "code": 200,
  "type": "unknown",
  "message": "<username>"
}

Headers = 
access-control-allow-headers: Content-Type,api_key,Authorization 
 access-control-allow-methods: GET,POST,DELETE,PUT 
 access-control-allow-origin: * 
 content-type: application/json 
 date: Sat,31 Aug 2024 16:32:33 GMT 
 server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response status code = 204 No Content

---

#### Test Case: TS003_TC003

**Description:** Validate that API should return a response payload with  response body and Non-empty response header

**HTTP Method:** DELETE

**Request URL:** https://petstore.swagger.io/v2/user/{username}

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body = NA
```

**Steps to Reproduce:**

Send a DELETE request to the API endpoint with user id of existing user 

**Response Payload:**

```
Body ={
  "code": 200,
  "type": "unknown",
  "message": "<username>"
}

Headers = 
access-control-allow-headers: Content-Type,api_key,Authorization 
 access-control-allow-methods: GET,POST,DELETE,PUT 
 access-control-allow-origin: * 
 content-type: application/json 
 date: Sat,31 Aug 2024 16:32:33 GMT 
 server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response payload with Empty response body and Non-empty response header

---

#### Test Case: TS003_TC004

**Description:** Validate that GET User with ID = Id used in API request url / request header should return Blank response body executed Delete request for target id

**HTTP Method:** GET

**Request URL:** https://petstore.swagger.io/v2/user/{username}

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body = NA
```

**Steps to Reproduce:**

Send a GET request to the API endpoint with user id of removed user

**Expected Result:**

Response body= Empty

---

#### Test Case: TS003_TC005

**Description:** Validate that API should return response headers - AS PER SPEC as follows:-
including content-type, connection, cache-control, expires, access-control-allow-origin, keep-alive, HSTS, and other standard header fields ... You can alse mention which headers should be empty/non-empty with what values.

**HTTP Method:** DELETE

**Request URL:** https://petstore.swagger.io/v2/user/{username}

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body = NA
```

**Steps to Reproduce:**

Send a DELETE request to the API endpoint with user id of existing user 

**Expected Result:**

Response payload with response headers - AS PER SPEC as follows:-
including content-type, connection, cache-control, expires, access-control-allow-origin, keep-alive, HSTS, and other standard header fields ... You can alse mention which headers should be empty/non-empty with what values.

---

#### Test Case: TS003_TC006

**Description:** Validate that re-running the same API again should not return any response payload with response code = 404 Not Found

**HTTP Method:** DELETE

**Request URL:** https://petstore.swagger.io/v2/user/{username}

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body = NA
```

**Steps to Reproduce:**

Send a DELETE request to the API endpoint with user id of non-existing user 

**Response Payload:**

```
Body =
Headers = 
access-control-allow-headers: Content-Type,api_key,Authorization  access-control-allow-methods: GET,POST,DELETE,PUT  access-control-allow-origin: *  content-length: 0  date: Tue,04 Mar 2025 06:57:12 GMT  server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response code should be 404 Not Found.

---

#### Test Case: TS003_TC007

**Description:** Validate that API should should adhere to Response structure as per data model mentioned in API Spec or API Doc.- JSON SCHEMA VALIDATION

**HTTP Method:** DELETE

**Request URL:** https://petstore.swagger.io/v2/user/{username}

**Request Payload:**

```
Request Headers = 
accept: application/json

Request body = NA
```

**Steps to Reproduce:**

Send a PUT request to the API endpoint with user id of existing user 

**Response Payload:**

```
Body ={
  "code": 200,
  "type": "unknown",
  "message": "<username>"
}

Headers = 
access-control-allow-headers: Content-Type,api_key,Authorization 
 access-control-allow-methods: GET,POST,DELETE,PUT 
 access-control-allow-origin: * 
 content-type: application/json 
 date: Sat,31 Aug 2024 16:32:33 GMT 
 server: Jetty(9.2.9.v20150224) 
```

**Expected Result:**

Response payload should comply with expected JSON schema

Expected JSON-Schema: 
{
    "$schema": "http://json-schema.org/draft-06/schema#",
    "$ref": "#/definitions/Welcome1",
    "definitions": {
        "Welcome1": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "code": {
                    "type": "integer"
                },
                "type": {
                    "type": "string"
                },
                "message": {
                    "type": "string"
                }
            },
            "required": [
                "code",
                "message",
                "type"
            ],
            "title": "Welcome1"
        }
    }
}

---

