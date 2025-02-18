---
title: "Sync Web Apps Made Simple"
slug: sync-web-apps-made-simple
published: "2024-12-26"
updated: "2024-12-26"
categories: ['local first', 'development', 'sync', 'web applications']
coverImage: "/content-images/essays/sync-web-apps-made-simple.png"
coverWidth: 16
coverHeight: 9
excerpt: Removing complexity from web applications
---

*“What if building web apps didn’t have to be so complicated?”* 

Building a web apps has ballooned in complexity. Even though our tools have become incredibly sophisticated, the way we build quickly adopts a level of unnecessary complexity

Web development goes through it’s various seasons but by and large we are coming back to Server Side Rendering because that is a much more intuitive mental model than synchronizing everything between client and server.

But why is this and where are we going? 

First let us look at how app development typically goes with a broad stroke.

## Current State of Data Interactions

You know the feeling. No matter where you start with your app, as soon as it comes to data interactions there are a whole host of concerns you have to think about. Loading state. Response status. Permissions. State management. Cache invalidation. And so on. 

When it comes to building UI there are a plethora of data fetching patterns: 

1. Using React? You have useEffect, React Query, SWR, React Server Components, Frameworks with their own ways of doing things
2. Server Rendering 
3. Progressive enhancement
4. Hypermedia approaches

All of the above are great and solve a real pain point for development…

### The Network

Data fetching is primarily difficult because of the network. You have to think about crossing a boundary where your server is interpreting data one way, packaging it, sending it to your frontend, and then doing something with it on your frontend. Synchronizing state between the two, caching, ui concerns and so on.

If you are using hypermedia, you don’t have much, if any, client side synchronization but the network is still assumed. 

Loading UI is based off of the often unspoken premise that there is some latency. In other words the UI is there to make up for the period of time we are waiting on the network and be presented with our data or not. 

Your web app is probably complex due to all the ways in which you are handling thinking for the network. We have come a long way but we can go further. 

## Sync - Making Web Apps Simple

The sentiment we started with, “what if building web apps didn’t have to be so complicated” is where we return. This resonates with most application developers but much of the time I don’t think we can put our finger on why. 

There are many places we could point the finger and claim that it is because of that thing that building web apps has ballooned in complexity. 

*Sync handles the network complexity for us.*

### OK, But Why Now?

I love what [Aaron Boodman](https://bsky.app/profile/aaronboodman.com) says in [this episode](https://www.youtube.com/watch?v=cgTIsTWoNkM&t=1391s) of the Local First Podcast: 

> *I feel like my mission in life is shouting from the rooftop, “Hey, did you know! Browsers have storage now.”*

Why is this significant? 

Let’s consider the above on data synchronizing. Typically you are leaning into a framework implementation of state or signals and updating UI based off of that. 

But what is your react state and signals in service of? The state of the Database at a moment in time or after a mutation. And this is why apps balloon in complexity. Because as your app grows both your database and your UI state management grow. 

*Your state management, most of the time, is there to keep your UI in sync with your database.*

## Sync

IndexedDB is the common ‘storage’ mechanism implemented across all browsers. This means we can have a database in the browser itself which applications can utilize for reads and writes. Since it is “local”, we get instant read and writes. UI is snappier. And we can deflate the proverbial balloon of state management. 

Sync, or a sync engine, is an application specific implementation of taking what is in your browsers local database and sending it to a server that handles sending it to your remote database. 

The authoring experience of web applications becomes dramatically more intuitive. You just write queries and mutations without having to consider the network. By and large most of your state is now in a local database which removes most of the need for other state management solutions. 

Web apps become both more intuitive to author and your users experience of your app is much better. 

Win Win

## Wrapping Up

Hopefully this was a gentle introduction to sync and why it is a big deal. Tomorrow we will look at the current state of data interactions with examples of each and why typical apps built with CRUD interactions leads to complexity. 

After that we will build a very simple sync implementation to get a feel for it and then we will look at Sync in the real world with an app most everyone knows, Linear.