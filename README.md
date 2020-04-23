# Instant sharing backend

---

## API Documentation

# Instants

## Indices

- [Create single instant](#1-create-single-instant)
- [Get single instant](#2-get-single-instant)
- [Get all instants](#3-get-all-instants)

## Endpoints

### 1. Create single instant

**_Endpoint:_**

```bash
Method: POST
Type: FORMDATA
URL: {{APIURL}}/api/v1/instants
```

**_Body:_**

| Key       | Value                    | Description |
| --------- | ------------------------ | ----------- |
| photo     |                          |             |
| user      | Riccardo Sacco           |             |
| latitude  | 45.12345                 |             |
| longitude | 12.12345                 |             |
| timestamp | 2020-04-22T12:29:18+0000 |             |

### 2. Get single instant

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{APIURL}}/api/v1/instants/5ea1d4dd71817200123343ac
```

### 3. Get all instants

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{APIURL}}/api/v1/instants
```

---

## Generate documentation

### HTML

```
docgen build -i public/docs/postman.json -o public/docs/index.html
```

### Markdown

```
docgen build -i public/docs/postman.json -o public/docs/index.md -m
```
