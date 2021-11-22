## Backend — Java Spring REST API

[![Spring](https://img.shields.io/badge/Java%20Spring-6DB33F?logo=spring&logoColor=white)](https://spring.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1.svg?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-%230db7ed.svg?logo=docker&logoColor=white)](https://www.docker.com/)

**`*` — Requires authentication of `User` / `Moderator` / `Admin`**

### `GET` List of Articles
— ``{HOST}/api/v1/articles``

**Query**
* size : `number`
* page : `number`
* search : `string`
* published* : `boolean`

**Example**:
```curl --location --request GET 'http://localhost:8080/api/v1/articles?size=30&published=false&search=hello'```

**Authentication**
* None
* User
* Moderator*
* Admin*

---

### `GET` List of Articles by `Category`
— ``{HOST}/api/v1/articles/{category}``

**Parameter**
* category : `string`


**Example**:
```curl --location --request GET 'http://localhost:8080/api/v1/articles/category/Новости'```

**Authentication**
* None
* User
* Moderator
* Admin

---

### `GET` Article by `ID`
— ``{HOST}/api/v1/articles/id/{id}``

**Parameter**
* id : `number`

**Example**:
```curl --location --request GET 'http://localhost:8080/api/v1/articles/id/1802'```

**Authentication**
* None
* User
* Moderator*
* Admin*

---

### `GET` List of Users
— ``{HOST}/api/v1/users``

**Example**:
```curl --location --request GET 'http://localhost:8080/api/v1/users' --header 'Authorization: Bearer {TOKEN}'```

**Authentication**
* Admin

---

### `GET` List of current user Roles
— ``{HOST}/api/v1/auth/preauthorize``

**Example**:
```curl --location --request GET 'http://localhost:8080/api/v1/auth/preauthorize' --header 'Authorization: Bearer {TOKEN}'```

**Authentication**
* User
* Moderator
* Admin

---

### `POST` Post new Article
— ``{HOST}/api/v1/articles``

**Body**
```
{
  "published": true,
  "author": "User",
  "title": "Title",
  "subtitle": "Subtitle",
  "preview": "https://.../.jpg",
  "tags": ["Новости"],
  "content": [
    {
      "type": "text",
      "value": "value"
    },
    {
      "type": "quote",
      "value": "value"
    },
    {
      "type": "link",
      "value": "value",
      "url": "https://..."
    },
    {
      "type": "link",
      "value": "value",
      "url": "https://..."
    },
    {
      "type": "video",
      "url": "https://www.youtube.com/..."
    },
    {
      "type": "image",
      "url": "https://..."
    }
  ]
}
```

**Authentication**
* Moderator
* Admin

---

### `POST` Register
— ``{HOST}/api/v1/auth/signup``

**Body**
```
{
  "username": "user",
  "email": "user@uncos.com",
  "password": "password"
}
```

**Authentication**
* None

---

### `POST` Login
— ``{HOST}/api/v1/auth/signin``

**Body**
```
{
  "username": "user",
  "password": "password"
}
```

**Authentication**
* None

---

### `PUT` Edit Article
— ``{HOST}/api/v1/articles/id/{id}``

**Parameter**
* id : `number`

**Body**
```
{
  "published": true,
  "author": "User",
  "title": "Title",
  "subtitle": "Subtitle",
  "preview": "https://.../.jpg",
  "tags": ["Новости"],
  "content": [
    {
      "type": "text",
      "value": "value"
    },
    {
      "type": "quote",
      "value": "value"
    },
    {
      "type": "link",
      "value": "value",
      "url": "https://..."
    },
    {
      "type": "link",
      "value": "value",
      "url": "https://..."
    },
    {
      "type": "video",
      "url": "https://www.youtube.com/..."
    },
    {
      "type": "image",
      "url": "https://..."
    }
  ]
}
```

**Authentication**
* Moderator
* Admin

---

### `PUT` Edit User
— ``{HOST}/api/v1/users/{id}/roles``

**Parameter**
* id : `number`

**Body**
```
{
  "role": ["ROLE_MODERATOR"]
}
```

**Authentication**
* Admin

---

### `DELETE` Delete Article
— ``{HOST}/api/v1/articles/id/{id}``

**Parameter**
* id : `number`

**Example**:
```curl --location --request GET 'http://localhost:8080/api/v1/articles/id/{id}' --header 'Authorization: Bearer {TOKEN}'```

**Authentication**
* Moderator
* Admin

---

### `DELETE` Delete User
— ``{HOST}/api/v1/users/{id}``

**Parameter**
* id : `number`

**Example**:
```curl --location --request GET 'http://localhost:8080/api/v1/users/{id}' --header 'Authorization: Bearer {TOKEN}'```

**Authentication**
* Admin