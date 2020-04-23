# Instant photo sharing

---

## Usage

1. Build the docker container images

```
docker-compose up
```

There are three containers:

- web (NodeJS custom image)
- mongo
- rabbitmq

2. Go to the frontend URL below and submit the form

### Frontend: http://localhost:3000

![Frontend](/public/docs/frontend.png)

3. Use the documentation below to get the resources from the backend

### Backend: http://localhost:3000/api/v1

## API Documentation

[Postman docs link](https://documenter.getpostman.com/view/5733214/Szf9XTbm?version=latest)

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
URL: http://localhost:3000/api/v1/instants
```

**_Body:_**

| Key       | Value                    |
| --------- | ------------------------ |
| photo     |                          |
| user      | Riccardo Sacco           |
| latitude  | 45.12345                 |
| longitude | 12.12345                 |
| timestamp | 2020-04-22T12:29:18+0000 |

### 2. Get single instant

**_Endpoint:_**

```bash
Method: GET
URL: http://localhost:3000/api/v1/instants/5ea1d4dd71817200123343ac
```

### 3. Get all instants

**_Endpoint:_**

```bash
Method: GET
URL: http://localhost:3000/api/v1/instants
```
