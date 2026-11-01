# Playwright MCP AI - API Automation Framework

A Playwright + TypeScript API automation framework for testing the Swagger Petstore API. Features centralized route management, JSON schema validation, random data generation, and comprehensive reporting.

**Target API:** https://petstore.swagger.io

## Architecture

```
API Test Prompt → Endpoint/Route Analysis → Schemas → Test Data/Utilities → API Tests
```

| Component      | Location                           | Purpose                                      |
| -------------- | ---------------------------------- | -------------------------------------------- |
| Routes         | `api/routes.ts`                  | Centralized API endpoint definitions         |
| API Operations | `api/ApiOperations.ts`           | Reusable API operation methods               |
| Schemas        | `api/schemas/`                   | JSON schemas for request/response validation |
| Test Specs     | `tests/api/`                     | Test files containing test cases             |
| Utilities      | `utils/`                         | Reusable helper classes and functions        |
| Test Data      | `testdata/`                      | Static test data files                       |
| Configuration  | `.env`, `playwright.config.ts` | Environment variables and Playwright config  |

## Directory Structure

```
├── api/
│   ├── routes.ts                 # API endpoint definitions
│   ├── ApiOperations.ts          # API operation wrapper class
│   └── schemas/                  # JSON schema files
├── tests/
│   └── api/                      # API test specifications
├── utils/                        # Utility classes
│   ├── CustomReporter.ts         # Custom HTML test reporter
│   ├── DataReader.ts             # Data file reader (JSON/CSV/Excel)
│   ├── TokenManager.ts           # Authentication token management
│   └── dataGenerator.ts          # Random test data generation (Faker)
├── testdata/                     # Test data files
├── playwright.config.ts          # Playwright configuration
├── test.md                       # Test documentation
└── tsconfig.json                 # TypeScript configuration
```

## Features

- **Centralized Route Management** - All API endpoints defined in one place
- **JSON Schema Validation** - Request/response validation using AJV
- **Random Data Generation** - Faker-based test data generation
- **Multiple Reporters** - List, HTML, JUnit, Allure, and custom reporter
- **Schema Validation** - Response structure validation against API spec

## Dependencies

- `@playwright/test` - Test framework
- `@faker-js/faker` - Random data generation
- `ajv` - JSON schema validation
- `allure-playwright` - Allure report integration
- `mysql2` - MySQL database support
- `xlsx` - Excel file reading

## Getting Started

```bash
npm install
npm test
```

## Configuration

Environment variables are managed via `.env` file. See `playwright.config.ts` for test configuration including timeouts, retries, reporters, and browser projects.

## Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test tests/api/store.spec.ts

# Run with specific reporter
npm test --reporter=line
```

## Test Organization

Tests are organized by module under `tests/api/`:

- `pet-store-pet.spec.ts` - Pet module tests
- `store.spec.ts` - Store module tests

Test scenarios are documented in `test.md` with detailed steps and expected results.
