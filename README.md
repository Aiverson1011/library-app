End point:

Books:
 
1. *GET* /books -list of all the book


```json
{
    "id": 4,
    "title": "Harry Potter and the sorcerer stone",
    "author": "JK Rowling",
    "genre": "Fantasy",
    "year": 1998,
    "availability": { 
    "total": 5,
        "available": 3,
    },
    "description": "Follow our brave little wizards in their adventures",
    "age": 8,
    "history": [
        {"name":"AI", "checkoudate":02/28/26, "returndate":03/03/26},
        {"name":"RW", "checkoudate":01/18/26, "returndate":02/01/26},
        {"name":"HP", "checkoudate":07/31/25, "returndate":09/01/25},  
    ]
}

```

2.	*POST* /books -create book

```json
{
    "title": "Harry Potter and the sorcerer stone",
    "author": 1,
    "genre": "Fantasy",
    "year": 1998,
    "availability": { 
        "total": 5
    },
    "description": "Follow our brave little wizards in their adventures",
    "age": 8
}
```

3.	*DELETE* /books/:id -delete book based out of ID
4.	*PUT* /books/:id -edit specific book
5.	*GET* /books/:id -list books by ID

Users:

1. *POST* /users -signing up
2. *GET* /users -list users
3. *GET* users/:id -list user by ID
4. *PUT* /users/:id -update/edit user ID
5. *DELETE* /users/:id -delete user based out of ID

Authors:

1. *GET* /authors -list of the authors
2. *DELETE* /authors/:id -delete specific author
3. *POST* /authors -create author
4. *PUT* /authors/:id -edit author
5. *GET* /authors/:id -list author by ID


Inventory

1. *GET* /inventory -list all inventory


Checkout

1. *POST* /loans

```json
{
  "bookId": 12,
  "userId": 5,
  "dueDate": "2026-04-01"
}

```