---
title: "Building a Simple Sync System"
slug: building-a-simple-sync-system
published: "2024-12-28"
updated: "2024-12-28"
categories: ["javascript", "local-first", "indexeddb", "web development", "sync"]
coverImage: "/content-images/essays/building-a-simple-sync-system.png"
coverWidth: 16
coverHeight: 9
excerpt: Get a basic understanding of how to build a sync system.
---

This app will be a very basic sync example. In building Local First appsit has been brought up that many do not know what some of the problems are that Local First libraries/solutions are solving. 

In a previous post we mentioned that Browsers have storage now. Although this is a great thing Browser storage is not the easiest to work with. So in this post we will be building a very niave sync system using IndexedDB. 

The sync example is using @begin/data from the team behind enhance.dev and architect. The app, which you can find on github, is an enhance app. You can clone the repo and get started with it. 

All that said, in this article we will simply be going over the basic sync system we have setup and will conclude with all of the things we haven't covered to give a greater understanding of what you get with Local First libraries. 

## Application Overview

The application is a simple todo app. We currently have it setup in more of a progressive enhancement way where the todos will be served from the remote database first and then once client side javascript is loaded, the local todos will overwrite the remote ones. This is more of a happy accident but also shows Local First can be used in a progressive enhancement way.

### Steps for running the app

1. Clone the repo - https://github.com/Local-First-Academy/SimpleSync
2. Run `npm install`
3. Run `npm start`
4. Open the app in the browser
5. Login with the username and password.
7. Open the browser console and go to `application -> storage -> indexedDB -> local-todos -> todos`
8. You could probably change the sync interval to 2-3 seconds so that the sync runs more often. 
9. Add a todo
10.  After you add a todo, wait a few seconds and refresh the page. You will see a little flicker of the server todo and then it will be overwritten with the local todo. The same should be true of toggling the todo.
11.  If you are wanting to see where the majority of the code is look in these places: `public/browserDB.mjs`, `public/sync.mjs`, `app/api/sync.mjs`, `app/elements/local-todos.mjs`. The elements show where we load the browserDB and sync script are loaded and used.

## IndexedDB

IndexedDB is a low level key value store for the browser. Many Local First libraries use IndexedDB in a variety of ways. 

To get started with IndexedDB we need to setup a connection. We will be making a simple todo app. Here is our connection code. This is all in the `public/browserDB.mjs` file if you are in the repo.

```js
const DB_NAME = "local-todos";
const STORE_NAME = "todos";

async function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("updatedAt", "updatedAt");
      }
    };
  });
}
```

This code does a few thing: 

1. We wrap it in a promise so we can make it more event based and use async/await. 
2. We open a connection to the database. 
3. We create an object store for our todos. 
4. We create a key Path of "id" which means the object must have an id property which will act as a primary key.
5. The updatedAt index can be used to sort/query the todos.

### Other IndexedDB Functions

-  Adding a Todo

```js
async function addTodo(todo) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const todoWithMeta = {
      ...todo,
      id: crypto.randomUUID(),
      updatedAt: Date.now(),
      synced: false,
    };
    const request = store.add(todoWithMeta);

    request.onsuccess = () => resolve(todoWithMeta);
    request.onerror = () => reject(request.error);
  });
}
```

-  Updating a Todo

```js
async function updateTodo(id, updates) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = () => {
      const todo = request.result;
      const updatedTodo = {
        ...todo,
        ...updates,
        updatedAt: Date.now(),
      };
      store.put(updatedTodo);
      resolve(updatedTodo);
    };
    request.onerror = () => reject(request.error);
  });
}
```

-  Deleting a Todo

```js
async function deleteTodo(id) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
```

-  Getting unsynced todos

```js
async function getUnsynced() {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const todos = request.result;
      resolve(todos.filter((todo) => !todo.synced));
    };
    request.onerror = () => reject(request.error);
  });
}
```

-  Getting all todos

```js
async function getAllTodos() {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
```

That is a decent amount of code for basic CRUD type operations with IndexedDB.

## Setting up the Sync System

Ok, so now that we have our basic CRUD operations in place for indexedDB we want to set this up so that it syncs with a remote database. 

We are going to do that by using the `@begin/data` library and setting up a sync api route and script for the browser.

### Browser Sync Script 

Our sync script is fairly simple. Every 10 seconds the `startBackgroundSync` function will run and check for unsynced todos in indexedDB and if there are any we will post those to our sync api route. 

You will also notice I am passing in a username. The app has auth setup for it, just simple username/password but we want these todos to be associated with a user so that is why we are mapping a userId to the todo. We do that here rather than storing the username in the browser due to indexedDB being local, it doesn't need to differentiate based off of the user.

```js
async function syncTodos(username) {
  try {
    // Get all unsynced todos
    const unsynced = await getUnsynced();

    // Send unsynced todos to server
    const todosWithUser = unsynced.map((todo) => ({
      ...todo,
      userId: username,
    }));

    const response = await fetch("/sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todos: todosWithUser,
      }),
    });

    if (!response.ok) {
      throw new Error("Sync failed");
    }

    // Mark all synced todos as synced locally
    for (const todo of unsynced) {
      await updateTodo(todo.id, { synced: true });
    }

    return true;
  } catch (err) {
    console.error("Sync failed:", err);
    return false;
  }
}

// Start background sync
function startBackgroundSync(username, interval = 10000) {
  return setInterval(() => syncTodos(username), interval);
}
```

### Sync API Route

The sync api route is a basic route that takes the post body and uses it to insert the todos into the database at a given todo id if it already exists or create it if it does not. 

We don't need to concern ourselves with redirecting or anything here. At most we would want to return a message and maybe toast a status or message if the sync failed, or do some additional logging to an error monitoring service. 

```js
import data from "@begin/data";

export async function post(req) {
  try {
    const { todos } = req.body;

    // Store each todo in Begin/Data
    const storedTodos = await Promise.all(
      todos.map(async (todo) => {
        return await data.set({
          table: "todos",
          key: todo.id,
          ...todo,
          updatedAt: Date.now(),
        });
      })
    );

    return {
      statusCode: 200,
      json: {
        ok: true,
        success: true,
      },
    };
  } catch (error) {
    console.error("Sync error:", error);
    return {
      statusCode: 500,
      json: {
        error: "Failed to sync todos",
        message: error.message,
      },
    };
  }
}

```

## Conclusion

Although this is a very basic sync example, I believe it gives a decent feel for how much more nuanced and complex sync systems and Local First libraries are. Below you will find a list of things we didn't cover that typically make their way into Local First solutions. 

As we continue through the 12 Days of Local First we will see how other libraries and tools make this process much easier and give us the simple data interactions we saw in Day 2 of this series.

### Examples of what we didn't cover
These are all of the things we didn't cover that typically make their way into a Local First sync system: 

- What happens when local data is lost?
- Rehydrating from the server
- Conflict resolution strategies
- Error handling
- Offline capabilities
- Security considerations
- Conflict resolution
- Real-time sync
- Multiple device sync
- Data versioning
