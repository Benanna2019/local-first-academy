---
title: 'From CRUD to Offline-First'
slug: offline-first-with-dexie-and-workbox
published: '2025-01-01'
updated: '2025-01-01'
categories:
  - 'javascript'
  - 'local-first'
  - 'dexie'
  - 'workbox'
  - 'web development'
  - 'offline'
coverImage: '/content-images/essays/understanding-offline-first.png'
coverWidth: 16
coverHeight: 9
excerpt: Using Workbox and Dexie to make a CRUD application offline-first
---

Over the past few days, we’ve thought about the power of offline-first development. How it works in favour of the user and allows them to use our applications as they need them regardless of their current connection status.

Today, I want to take a regular CRUD web application and make it offline-first. This will require two things:

- Adding a service worker so that when I refresh the page in an offline state I have access to the site
- Updating the data layer to make it accessible offline and across devices

This is an exciting time in Local First development as there are so many creative and dedicated teams and individuals working to solve these problems. At Local First Academy, we want to spotlight some of those amazing technologies while also making it easier for developers to get up an running. For this tutorial, I’m going to be using Dexie for my data layer and Workbox to simplify the generation of the service workers.

## The App

I read a lot of books and want to be able to keep track of what I’ve read and when I read it. So, I’ve created BookShelf. At the moment it’s a basic CRUD application that allows me to store the title, author and date finished. In future, I’m going to have it automatically add details like genre, cover art, number of pages, etc.

For now though, I want to make it local first. I’ve built it in Vue and, if you want to follow along there’s a folder called `start` in [this repo](https://github.com/doingandlearning/offline-first-demo) that is the basis for this tutorial. Pull it down, run `npm install` and `npm run dev` in the start folder and you’ll be presented with:

**TODO: Add screenshot from above here**

Not yet a thing of beauty but let’s get on with making this local first.

## Adding a Service Worker

A service worker is a small JavaScript file that acts as a background worker in the browser. It gets registered when you first visit a site and operates separately from the main web page. Service workers can add various capabilities to a web application, such as caching assets for offline availability, enabling push notifications, and improving performance. In our case, we will use a service worker to make our site available offline.

To add a service worker, I’m going to use Workbox, a set of open-source tools developed by Google. Workbox simplifies the process of creating and managing service workers, especially as your application grows and its requirements become more complex. It provides features like pre-caching assets, runtime caching strategies, and tools for handling updates efficiently.

**Step 1: Adding dependencies**
First thing we’ll do is add workbox-build and workbox-cli to our project:

```
npm install workbox-build workbox-cli
```

**Step 2: Generate the service worker**
Now, we’ll create a file called `workbox-config.cjs` at the root of the project and add the following configuration:

```javascript
module.exports = {
	globDirectory: 'dist/',
	globPatterns: ['**/*.{html,javascript,css,json,ico,png,jpg,jpeg,svg,woff2,woff,eot,ttf,otf}'],
	swDest: 'dist/service-worker.javascript',
	runtimeCaching: [
		{
			urlPattern: ({ request }) => request.mode === 'navigate',
			handler: 'NetworkFirst',
			options: {
				cacheName: 'pages-cache',
				expiration: {
					maxEntries: 50,
					maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
				}
			}
		},
		{
			urlPattern: /\.(?:javascript|css|html|json)$/,
			handler: 'StaleWhileRevalidate',
			options: {
				cacheName: 'static-resources-cache'
			}
		},
		{
			urlPattern: /\.(?:png|jpg|jpeg|svg|ico)$/,
			handler: 'CacheFirst',
			options: {
				cacheName: 'image-cache',
				expiration: {
					maxEntries: 50,
					maxAgeSeconds: 60 * 60 * 24 * 7 // 1 week
				}
			}
		}
	]
};
```

**Step 3: Modify package.json**

Add a new script to build the service worker:

```json
"scripts": {
	"build:withsw": "vite build && npx workbox generateSW workbox-config.cjs"
}
```

**Step 4: Register the Service Worker**
Modify `src/main.ts` to register the service worker:

```ts
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/service-worker.javascript')
			.then((registration) => {
				console.log('Service Worker registered with scope:', registration.scope);
			})
			.catch((error) => {
				console.error('Service Worker registration failed:', error);
			});
	});
}
```

**Step 5: Build and test**
Build the application with `npm run build:withsw` and serve the `dist` directory with a tool like serve (`npx serve dist`).

Now open the app in your browser and refresh the page. Go offline and refresh, checking that you get the regular functionality.

You should have full CRUD functionality in your application now whether you are online or offline. Woohoo!! Local first for the win! :)

## Adding in other devices

We could stop now but I want to show how using a tool like Dexie allows the data to be synced and consolidated after you come back online.

To do that, I’m going to use Dexie Cloud and add in user authentication in a few lines of code.

**Step 1: Create your database in the cloud**
Run this in the terminal,

```bash
npx dexie-cloud create
```

and you’ll be prompted for email verification. The URL of your database will output to the console and stored in a new local file called `dexie-cloud.json`.

**Step 2: Whitelist your app origin**
In order to allow your application to communicate with Dexie Cloud, you’ll need to explicitly whitelist it.

```
npx dexie-cloud whitelist http://localhost:5173
```

Make sure the port is right for where your app is running. When you move into production, you’ll need to add those origins as well.

**Step 3: Update dexie and install `dexie-cloud-addon`**
Run this command to get that ready to go:

```
npm install dexie@latest dexie-cloud-addon
```

**Step 4: Update the database declaration**

Open `src/stores/db.ts` and import `dexieCloud`. This should be added to the Dexie initialisation options object with the `addons` key.

```ts
import Dexie from 'dexie';
import dexieCloud from 'dexie-cloud-addon';

const db = new Dexie('BookVault', { addons: [dexieCloud] });
```

The schema can largely stay the same but we’ll swap out the `++id` to `@id`. The cloud database prefers a string id and this will autogenerate it on store.

```typescript
db.version(1).stores({
	books: '@id, title, author, dateFinished, isbn, genre, coverArt'
});
```

Finally, we’ll configure the cloud by adding our databaseUrl from step 1. We’ll also add `requireAuth` which will authenticate users and require an email verification before they can interact with the data.

```ts
db.cloud.configure({
	databaseUrl: '<add-your-cloud-url>',
	requireAuth: true
});

export default db;
```

**Step 5: Fire it up!**
That’s it. Now, the data generated by a user will be automatically only be accessible to them. They can login on multiple devices and use this application offline and online.

When they come online, Dexie will do the work of synchronising the local IndexDb version of the data with the cloud version.

## Conclusion

Developing applications in an offline way helps us democratise our software, making it more useful to our users wherever they are.

Hopefully, this tutorial has helped to give you a head start to begin developing in this way.

As I mentioned earlier, there are so many excellent tools and libraries in this space. Each of them have slightly different approaches - giving you more or less control, doing more or less of the work for you. At Local First Academy, we will spotlight different tools and help you get onboarded with them as quickly as possible. Then, as you develop local first software, you’ll have a better idea of which tool will fit your needs.

So far we’ve thought about synchronisation and offline-first. Tomorrow, we’ll spotlight and amazing application that uses both of these technologies before we explore the third theme of this series - collaboration.

We hope you’ve been enjoying this series - reach out to us by email or on Bluesky if you have any thoughts or comments.
