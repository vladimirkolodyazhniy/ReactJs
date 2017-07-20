# Notes

## How to run Backend (API)

API is very simple and can be started in these 3 steps:

1. `npm install`

2. Скопируйте `backend/etc/config.js.sample` в `backend/etc/config.js`

3. `npm run backend`

4. Server is available now on port 8080

**NOTE**

You need to have NodeJS v5.1.0 and higher installed

You need to have MongoDB installed. [Download](https://www.mongodb.org/downloads) | [How to install MongoDB on Windows machine](http://metanit.com/nosql/mongodb/1.2.php).

## API Documentation

### Add Note

`POST /notes`

**Payload:**

```
{
    "title": "My new amazing note",
    "text": "My new amazing note text",
    "color": "#FF0000"
}
```

**Fields:**

`title` *(optional)* - Title of the note

`text` *(required)* - Text of the note

`color` *(required)* - Color of the note


**Response example:**

```
{
    "_id": "56e14f2d24eb6bcf75de7bd1",
    "title": "My new amazing note",
    "text": "My new amazing note text",
    "color": "#FF0000",
    "createdAt": "2016-03-10T10:40:45.123Z"
 }
```

### List Notes

`GET /notes`

**Response example:**

```
[
  {
    "_id": "56e14f2d24eb6bcf75de7bd1",
    "title": "Integer ante arcu accumsan a ",
    "text": "Praesent ut ligula non mi varius sagittis. Cras id dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Maecenas nec odio et ante tincidunt tempus. Curabitur a felis in nunc fringilla tristique. ",
    "color": "#80D8FF",
    "createdAt": "2016-03-10T10:40:45.123Z"
  },
  {
    "_id": "56e14f6924eb6bcf75de7bd6",
    "title": "Aenean posuere tortor sed cursus ",
    "text": "Praesent venenatis metus at tortor pulvinar varius. Cras sagittis. Etiam imperdiet imperdiet orci.\n\nVivamus laoreet. Curabitur a felis in nunc fringilla tristique. Morbi mattis ullamcorper velit. ",
    "color": "#FFD180",
    "createdAt": "2016-03-10T10:41:45.727Z"
  }
]
```

### Delete Notes

`DELETE /notes/:id`

**URL parameters**

`id` - id of the note to delete

**Response example:**

```
{
    "ok": 1
}
```
