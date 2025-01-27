---
title: 'Exploring Local-First Software: Lessons from Excalidraw'
slug: exploring-excalidraw
published: '2025-01-02'
updated: '2025-01-02'
categories: ['local-first', 'excalidraw', 'web development', 'offline']
coverImage: '/content-images/essays/understanding-offline-first.png'
coverWidth: 16
coverHeight: 9
excerpt: Spotlighting a product driven by Local First principles for inspiration
---

Despite having Figma, Photoshop, Miro and other design tools at my disposal, why do I keep coming back to Excalidraw? And I'm not alone. This collaborative whiteboard—perfect for both typed text and sketching—stands out for its simplicity and ease of use. Better still, it's built with Local First principles in mind.

In these 12 days of Local First, we’ve talked so far about two themes - sync and offline-first. Excalidraw is a successful product and company and uses both of these.

## Recap: Sync and Offline

When we explored **sync**, we focused on instant, seamless updates that maintain data consistency without requiring user action. Storing data in the browser gives users more autonomy and enables syncing exactly when needed.

For **offline** functionality, we considered two key scenarios. First, what happens when you lose internet connection while working on a document? Second, can you still use the app when offline if you've visited before? In both cases, we aim for a smooth, consistent experience.

When an application successfully implements both sync and offline features, it creates a significantly better user experience.

## Have a look

If you haven't used Excalidraw recently, go and [have a play over here](https://excalidraw.com/). Don't worry. I'll wait.

We have an infinite canvas that lets you zoom from 10% all the way to 3000%. The drawing tools are simple and intuitive, with a deliberately low-fi default style that mimics pen sketches.

If you pop open the developer tools and look at the local storage, you’ll see where Excalidraw is maintaining state:

![Devtools focused on local storage tab](/content-images/essays/excalidraw-local-storage.png)

The `excalidraw` key is an array of all the objects drawn in the canvas. As you draw more you’ll see this increment.

The `excalidraw-state` key is an object used to maintain application state, like which tool is selected and whether the welcome screen should be shown.

If you head to the network tab and then continue adding to your canvas, you might notice that there are no calls to a server. This is all happening on the local machine

Lastly, while you’re in the network panel go offline:

![Devtools focused on network tab](/content-images/essays/excalidraw-network-image.png)

Have a go at interacting with the app - draw some shapes, delete some others - everything works as normal. Best of all, if you refresh the page while being offline, the app loads as before. For me, there is a single warning about a `Simple Analytics` call that was unsuccessful.

## Collaboration

Without getting ahead of the next few days' topic, another area where Excalidraw shines is in its well-crafted collaboration tools. There is the ability to share a static version of the board you are working on through a URL and you can create a live session that you can invite people to.

These tools do need you to be online but, importantly, they don’t need to use the server very much. Once your collaborators are on board, communication happens in a peer-to-peer way. This stops bottlenecks and also keeps the costs for the Excalidraw team very low.

## The benefits of Local First thinking

In following the principles of Local First, the team at Excalidraw are making a product that enhances user control while still making money.

Excalidraw ensures that your work is always accessible, even without an internet connection, removing the stress of sudden connectivity issues. Whether you’re traveling, in a remote area or simply offline this software works smoothly these diverse environments.

The data that you create as you whiteboard your next startup, plan your next talk or organise your next party, stays on your device unless you explicitly share it with someone else. Unlike cloud-centric tools, Excalidraw minimises the risk of data breaches by limiting server interactions.

Leaning on peer-to-peer collaboration reduces server load, allowing smaller teams (like Excalidraw’s) to maintain high-quality services without prohibitive costs. This makes the free version of the software sustainable and allows new features to be added without worrying about a spike in infrastructure.

## How could this apply to you?

So, first of all, might Excalidraw be a useful tool in your workflow? If you often work in areas with unreliable internet or are concerned about data privacy then this might be a useful tool to have in your arsenal.

As a developer, think about where your data is stored. In having the local state being the primary source of truth - Local First as it were - we are able to design and build more resilient applications that prioritise user autonomy. Use Excalidraw as an inspiration for building tools that balance simplicity with powerful functionality.

If you are building your own product or own a business, recognise that Local First focused development can reduce infrastructure costs and provide a faster, smooth experience for users.

Think about the tools you use today, those that are enabling industries from education to healthcare. How might they benefit from prioritising local storage, offline-first design or lightweight collaboration?

We live in a server centric world - even if it’s “serverless” - but that doesn’t need to be how we build apps going forward. This community is growing, the tooling is becoming more mature and building apps in this way can simplify the development process while improving the experience of our users. Win-win!

Join us tomorrow as we dive into the third theme of this series - collaboration.
