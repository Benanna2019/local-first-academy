---
title: 'Typical CRUD Apps vs Local First'
slug: typical-crud-apps-vs-local-first
published: '2024-12-27'
updated: '2024-12-27'
categories:
  - 'crud'
  - 'local first'
  - 'development'
  - 'sync'
  - 'web applications'
coverImage: '/content-images/essays/typical-crud-apps-vs-local-first.png'
coverWidth: 16
coverHeight: 9
excerpt: Typical CRUD apps vs Local First
---

We have a lot of code snippets today as we look at a general landscape of how CRUD based apps are built vs how
Local First apps are built.

## Recap of CRUD Apps

The following examples will show us how we got to where we are with current data fetching implementations.
An interesting pattern we will see is how all of these patterns serve to make apps feel better
by making the network feel less like a bottleneck.

Note: We are primarily focused on how Local First development helps solve some traditional
bottlenecks and performance issues with the ways outlined below. That being said, we fully
believe that the below ways, outside of useEffects 🫣, are perfectly viable ways to build
web applications.

Lastly, the examples are meant to be brief. More could be added but this is to give the general
overview and somewhat of the historical path we have been on to get to where we are.

### 1. Traditional Server-Side Rendering (MVC Pattern)

The MVC (Model-View-Controller) pattern has been a cornerstone of web development for decades. Here's how a typical implementation looks:

```js
// controllers/todoController.js
const Todo = require('../models/todo')
const todoController = {
    async index(req, res) {
        try {
            const todos = await Todo.find({})
            res.render('todos/index', { todos })
        } catch (error) {
            res.status(500).render('error', { error: 'Failed to fetch todos' })
        }
    }
}
module.exports = todoController

// views/todos/index.ejs
<!-- views/todos/index.ejs -->
<!DOCTYPE html>
<html>
    <head>
        <title>Todos</title>
    </head>
    <body>
        <h1>Todos</h1>
        <ul>
            <% todos.forEach(function(todo) { %>
            <li><%= todo.title %></li>
            <% }); %>
        </ul>
    </body>
</html>

```

This approach is simple and effective, but lacks interactivity without additional JavaScript.

Pros:

- Nice separation of concerns
- Great for SEO out of the box
- Fast initial page load
- Works without JavaScript
- Lower client-side complexity

Cons:

- Limited interactivity
- Full page reloads required
- Poor user experience for dynamic content
- Higher server load
- Slower subsequent interactions
- Network latency for basic operations

Note: With hypermedia like HTMX, Datastar, or Unpoly, you get a lot of the benefits of frameworks below
especially around interactivity, no full page reloads (DOM diffing), and better dynamic content.

### 2. useEffect Pattern and Problems

**Overview:** Basic React pattern using useEffect for data fetching

**Client Side:** Manages state, API calls, loading states, error handling

```js
// Client Implementation
const [data, setData] = useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('/api/todos')
      const todos = await response.json()
      setData(todos)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }
  fetchData()
}, [])


**Server Side:** REST/GraphQL endpoints with error handling


// Server Implementation (Express)
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await prisma.todos.findMany()
    res.json(todos)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' })
  }
})
```

`useEffect` was the go-to solution for data fetching in many react apps but runs into these common problems:

- Race conditions with multiple requests
- Complex/Remember cleanup logic
- Difficult error boundaries
- No built-in caching
- Waterfall requests
- Dependency array confusion. Most reach for it for the wrong reasons.
- You can do optimistic updates, ie update data without waiting for the network, but also have to handle fallbacks.

### 3. Tanstack Query Pattern

**Overview:** Advanced data fetching with built-in caching and background updates

**Client Side:** Declarative queries with automatic caching and background updates

```js
// Client Implementation
const { data, isLoading, error } = useQuery({
  queryKey: ['todos'],
  queryFn: async () => {
    const response = await fetch('/api/todos')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  },
  staleTime: 5000,
  cacheTime: 300000
})

**Server Side:** Enhanced API endpoints with cache control

// Server Implementation (Express)
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await prisma.todos.findMany()
    res.json(todos)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' })
  }
})
```

Tanstack Query addresses the common useEffect problems by providing:

- Automatic background updates
- Built-in caching and invalidation
- Request deduplication
- Error handling and retries
- Optimistic updates
- You can do optimistic updates, ie update data without waiting for the network, but also have to handle fallbacks.

### 4. Server Components Pattern

**Overview:** Next.js/React Server Components approach with server-side rendering

**Client Side:** Minimal client JavaScript with streaming updates

```js
// Client Implementation (React Sever Component)
async function TodoList() {
  const todos = await db.todos.findMany()
  // or a fetch call to a api endpoint in the example below
  return (
    <Suspense fallback={<Loading />}>
      <ul>
        {todos.map(todo => <Todo key={todo.id} {...todo} />)}
      </ul>
    </Suspense>
  )
}

**Server Side:** Api endpoint you could fetch from a server component

// Server Implementation (Next.js)
export async function GET(request: Request) {
  try {
    const todos = await prisma.todos.findMany()
    return new Response(
      JSON.stringify(todos),
      {
        headers: { 'content-type': 'application/json' },
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch todos' }),
      { status: 500 }
    )
  }
}
```

React Server Components solve several key pain points:

- Eliminate client-server waterfalls
- Reduce bundle size
- Improve initial page load
- Better SEO
- Simplified data access
- The Server Component pattern is a more difficult implementation to get right.
- Must understand client/server boundaries and component composition.
- You can do optimistic updates, ie update data without waiting for the network, but also have to handle fallbacks.

### 5. Socket Based Pattern (Convex)

**Overview:** Real-time updates using WebSocket connections

**Client Side:** Real-time data with automatic updates

```js
// Client Implementation
const todos = convexQuery(api.todos.list);
// const addTodo = useMutation(api.todos.add)

function TodoList() {
	if (!todos) return <div>Loading...</div>;
	return (
		<ul>
			{todos.map((todo) => (
				<li key={todo._id}>{todo.title}</li>
			))}
		</ul>
	);
}
```

**Query / Mutation Definitions:** With Frameworks using Convex there is not a real server side implementation.

```ts
// Server Implementation (Convex)
export const todosList = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query('todos').collect();
	}
});

export const addTodo = mutation({
	// check users identity if needed
	args: {
		title: v.string()
	},
	handler: async (ctx, args) => {
		return await ctx.db.insert('todos', {
			title: args.title,
			completed: false
			// userId: identity.subject,
		});
	}
});
```

- Real-time updates without polling
- Reduced server load compared to polling
- Better user experience with instant updates
- Simplified state management
- You can do optimistic updates, ie update data without waiting for the network.
- Since everything is reactive/real-time, if the data doesn't actually get put in the database, the
  client will fallback to the previous state.
- Still dependent upon the network

### 6. Local First Pattern

**Overview:** Offline-first architecture with automatic synchronization

**Client Side:** Local database operations with automatic sync

```js
// Client Implementation
const todos = useQuery(db.todos.list());
const addTodo = useMutation(db.todos.add);

function TodoList() {
	return (
		<div>
			<button onClick={() => addTodo({ title: 'New Todo' })}>Add Todo</button>
			{todos.map((todo) => (
				<div key={todo.id}>{todo.title}</div>
			))}
		</div>
	);
}
```

Pros:

- Works offline
- Instant user feedback
- Reduced server load
- Better user experience
- Not dependent upon the network for operations due to Local Database in the Browser.
- Since everything is reactive/real-time, if the data doesn't actually get put in the database, the
  client will fallback to the previous state.
- Optimistic updates are default and do to syncing, data will automatically fallback
  if the data doesn't actually get put in the database.

### Conclusion

All of these patterns have their place in the current web development ecosystem. Local First
is exciting for many reasons but, in the most ideal sense, it is a combination of all past data fetching
implementations and solutions.

Not only do not have to think about the network due to syncing, we get optimistic updates with fallbacks, caching,
ability for full offline apps, no spinners i.e. quick apps, and great user experiences as a result.

However, as beautiful as those things are, from an application developer's perspective the ability to
simply write queries and mutations without having to think for all the separate pieces is a long sought after
merging of practices and paradigms.

Tomorrow we will build a simple Local First application and sync with a remote database.
