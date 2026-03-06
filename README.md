End point:

Books:
 
1. *GET* /books -list of all the book
```json
{ 
    "books":
    [ 
        {
        "id": 1,  
        "title": "Harry Potter and the sorcerer stone",
        "author": "JK Rowling",
        "available": "true",
        },
        {
        "id": 2,
        "title": "The Hobbit",
        "author": "J.R.R. Tolkien",
        "available": true
        }
    ]
}


```



2.	*POST* /books -create book
    - 201 created

```json
{
    "title": "Harry Potter and the sorcerer stone",
    "ISBN": "9780590353427",
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
    - 204 success
4.	*PUT* /books/:id -edit specific book
5. *PATCH* /books/:id - update specific book NOTE: We need to allow to update the quantities of a book

6.	*GET* /books/:id -list books by ID
    - 200 success
```json
{
    "id": 4,
    "title": "Harry Potter and the sorcerer stone",
    "ISBN": "9780590353427",
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
        {"name":"AI", "checkoudate":"02/28/2026", "returndate":"03/03/2026"},
        {"name":"RW", "checkoudate":"01/18/2026", "returndate":"02/01/2026"},
        {"name":"HP", "checkoudate":"07/31/2025", "returndate":"09/01/2025"},  
    ]
}

```

Users:

1. *POST* /users -signing up
2. *GET* /users -list users
3. *GET* users/:id -list user by ID
4. *PUT* /users/:id -update/edit user ID
5. *DELETE* /users/:id -delete user based out of ID

Authors:

1. *GET* /authors -list of the authors
```json
{
    "authors": [
       {
        "lastName": "Rowling",
        "firstName": "JK",
        "dob": "07/31/1965",
        "id": 1,
        },

        {
        "lastName": "Tolkien",
        "firstName": "J.R.R.",
        "dob": "01/03/1892",
        "id": 2,
        }

    ]



}

```
2. *DELETE* /authors/:id -delete specific author
3. *POST* /authors -create author
```json
{
"lastName": "Rowling",
"firstName": "JK",
"dob": "07/31/1965",
}
```
response
```json
{
    "id":2
}


```
4. *PUT* /authors/:id -edit author
5. *GET* /authors/:id -list author by ID
```json
{
"lastName": "tolkien",
"firstName": "J.R.R",
"id": 2,
"uniqueQuantity": 1,
"books": [
    {
    "title": "The Hobbit",
    "id": 2,
    "year": 1937
    }
]

}

```

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

2. *PATCH* /loans/:id/return

```json

{
    "bookId": 12,
    "message": "Book returned",
    "returnDate": "2026-03-25",
    "userId": 5,
}

```

3. *GET* /loans

```json

{
    "loans": [
        {
            "bookId": 5,
            "userId": 1,
            "checkOutDate": "2026-03-05",
            "dueDate": "2026-04-05",
        }
    ]

}

```