---
title: 'Collaboration with Automerge'
slug: collaboration-with-automerge
published: '2025-01-05'
updated: '2025-01-05'
categories: ['javascript', 'local-first', 'CRDTs', 'automerge', 'collaboration']
coverImage: '/content-images/essays/collaboration-with-automerge.png'
coverWidth: 16
coverHeight: 9
excerpt: How Automerge handles collaboration in Local First applications.
---

When we think of Collaboration from the Local First perspective we are primarily thinking of collaboration across multiple devices and users, whether online or offline. Building an application to work this way in common architectures is no small feat. 

To this point we have looked at implementations of sync and offline and started looking into collaboration. There are many libraries we could have chosen because all Local First libraries have to handle collaboration to some degree. 

But we will look at the library that is build by pioneers of the Local First movement: Automerge

## Collaborative Data Types

In Local First architectures there are two primary ways of building applications. What we have seen to this point have been more Transactional based systems for building. Transactional heavily takes from Database models which is why this initially feels more familiar to those learning and building Local First applications

The other approach is based on Conflict Free Replicated Data Types (CRDT’s). 

Automerge uses CRDT’s for it’s collaborative data types. 

## Principles Behind Automerge

Automerge has at it’s heart the [Seven Ideals of Local First](https://www.inkandswitch.com/local-first/#seven-ideals-for-local-first-software). We are looking at Automerge not only because the builders and designers of Automerge pioneered Local First but deeper than that, the pains we experience daily as developers have been taken into account. 

With that in mind, Automerge has four principles in mind for its library that we will look at further and how these guarantee collaboration:  **Network-agnostic, Immutable state, Automatic merging,** and **Portable.**

### Network Agnostic

Local First software does not want to concern itself with the network. But better than that is a library that doesn’t have to be bound by the network in anyone way. For some it is either ‘use the network or not’. And usually this means using some client/server setup. Automerge is also fully able to be used with WebRTC or Bluetooth or completely offline and then manage conflicts when returning online. 

Automerge makes use of the network where necessary, when necessary, if necessary but doesn’t require you, the builder, to use it in a specific way and therefore removing the significant challenges the network presents to collaborative applications.

### Immutable State

Immutability, particularly Immutable State, is somewhat obscured these days. So I think it is worth a simple definition. 

> Immutable state means that once a piece of data is created, it cannot be changed directly - instead, any modifications result in a new copy of the data with the changes applied
> 

Why is this a good thing? Here are 3 quick reasons this is good: 

1. **Predictability**: When state doesn’t change unexpectedly, bugs are easier to find. If you pass an object to three different functions and it comes back wrong, with mutable state you have to check all three functions. With immutable state, you know exactly where the new state was created.
2. **Time Travel**: Since each change creates a new state, you can keep track of changes. 
3. **Concurrent Changes**: Multiple users can make changes. If User A and User B both edit a document, the system can clearly see what changed from the original state and merge their changes correctly.

Therefore, Automerge is has Immutable state because handles merging of state changes by creating a new object reflecting the changes. 

### Automatic Merging

The topic that receives the most attention around collaboration is conflict resolution. Automerge is referenced as being a CRDT and therefore we get Automatic Merging, ie conflict resolution out of the box for free with Automerge. 

This is one of those points where it is just worth sitting with for a minute before moving on. 

### Portable

Automerge has cross-platform support through both JavaScript and Rust codebases, allowing it to operate on browsers, servers, desktop applications, and mobile devices. 

A common issue developers run into when building collaborative experiences is many of the “nicer” libraries to use only provide good support to one language. Automerge has JavaScript and other runtime support through the Rust implementation which compiles to WebAssembly which is what allows for extensive portability.

## Conclusion

Automerge is an incredible library for building Local First applications. We look forward to building examples in the future. In the meantime, if you would like to look into Automerge here is a list of Resources to get your started: 

1. Docs - https://automerge.org/
2. Discord - https://discord.gg/zKGe4DCfgR
3. Local First Podcast episode with Martin Kleppman - https://www.youtube.com/watch?v=BNUXsCRQj3Q
4. Nik Graf Automerge Jump Start - https://github.com/nikgraf/automerge-jumpstart
5. Convex Automerge Example - https://stack.convex.dev/automerge-and-convex