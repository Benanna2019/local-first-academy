---
title: "Exploring the Challenges with Collaboration"
slug: challenges-with-collaboration 
published: "2024-12-28"
updated: "2024-12-28"
categories:
  - "javascript"
  - "local-first"
  - "web development"
  - "collaboration"
coverImage: "/content-images/essays/challenges-with-collaboration.png"
coverWidth: 16
coverHeight: 9
excerpt: Building collaborative software is challenging - here are some of the problems
---
It’s awesome to build and use software that has collaboration capabilities. Whether that’s sharing an infinite canvas, editing a document together or playing a massive game – the collaboration enriches the experience of the user and the functionality of your software.

Once you introduce collaboration though, your users expect it to work flawlessly. This is a significant engineering problem which needs to be considered carefully.

In this article, I want to explore some of the challenges that creating collaborative software presents. This will layi the groundwork for presenting tools and libraries that help address them in the next article.

## Mapping the Core Challenges

Let’s think about some of those core challenges.

### Real-Time Syncing

At the start of our 12 days, we thought about sync - keeping data connected and up-to-date across users and devices. With collaboration, the need for sync increases. We want all collaborators see changes in real time without any noticeable delays.

Running this across multiple tabs on your own computer or over multiple devices with high-speed internet is fine. But, we also need to consider less than perfect circumstances. What about instances of high latency? How are you going to manage slow connections or a mix of fast and slow connections? How can you ensure consistency during concurrent edits?

These are serious issues and, like the other challenges I mention, if you focus on solving them from first principles, you’re unlikely to have enough engineering resources to focus on your core business logic. As we’ll see tomorrow, there are libraries that provide toolkits for just these kinds of situations.

### Conflict Resolution

Once we introduce collaboration, whether that is multiple users or a single user on multiple devices, we need to avoid data overwrite and conflicts. I don’t want my changes to be ignored but I also don’t want changes be applied in an unpredictable way.

What strategy will you implement to resolve conflicts automatically and transparently? Is it the last person to write? Will that mean that the person with the slowest connection wins? When and how might you involve your user to help adjudicate challenging edge cases?

### Offline and Reconciliation

As we’ve thought a lot about, we want to support users who are offline and sync their changes later without introducing conflicts. Managing this in a collaborative environment adds in even more complexity.

How do you merge offline edits back into a collaborative session gracefully? What should happen if I lose internet connectivity while in a collaborative session?

### Collaboration at Scale

One or two people collaborating is a bit of a challenge but what about handling a large number of users. Imagine having hundreds collaborating on a single document.

As you develop, how do you ensure the performance doesn’t degrade as the user base grows? Are you going to have an upper limit on the number of collaborators? How are you going to communicate this and what will the experience be of those who are too late?

### Privacy and Security

When sharing between users, we want to make sure that we protect user data while maintaining real-time updates.

How are you going to handle this? Are we going to encrypt at rest and in-transport? How are we going to communicate the private keys? How will you balance encryption and usability for collaboration?

### Usability and Intuitiveness

While you might be convinced about the power of Local First, you want to avoid overwhelming your users with technical concepts like conflict resolution.

How will you design an interface that feels simple but handles complex scenarios?

Having a coherent solution to these problems will allow your users to have confidence and trust in your software.

## Current Approaches

There are three main approaches we can use to enable collaboration in software.

### Server-Based Systems

Traditional centralized architectures offer reliable collaboration through a single source of truth. These systems excel at maintaining consistency and providing straightforward access control. However, they require continuous internet connectivity and substantial server infrastructure. The associated costs and potential for system-wide outages make this approach less than ideal for some use cases.

### Peer-to-Peer (P2P) Collaboration

Decentralized collaboration eliminates server dependencies but brings its own challenges. Peer discovery and connectivity in complex networks prove difficult, and maintaining state consistency across peers requires sophisticated protocols. While P2P systems can reduce infrastructure costs, they often struggle with scalability for larger user groups.

### Manual Conflict Handling

Some tools delegate conflict resolution to users, requiring them to resolve issues manually. This simplifies implementation for developers but disrupts users, particularly in high-collaboration environments.

**These approaches each have trade-offs that libraries and frameworks aim to mitigate.**

## What Libraries Aim to Solve

There are a growing group of libraries that help us develop Local First software and, in particular, can help us develop collaborative software. The landscape includes several crucial technologies. 

- Conflict-free Replicated Data Types (CRDTs) like Yjs and Automerge provide automatic conflict resolution with guaranteed eventual consistency.
- Real-time sync engines such as ShareDB implement operational transformation, while Gun offers decentralized synchronization capabilities.
- For security, libsodium provides encryption primitives, and OLKP handles key management.
- Networking solutions like PeerJS and libp2p facilitate P2P communication and handle NAT traversal.

Stepping into this space can be very overwhelming. Which libraries should you choose? How do these different things combine and support each other?

Our aim is to make the Local First Academy a source of inspiration and information to help understand the space. We want to help you develop a toolkit that allows you to build quickly, simply and confidently as you solve problems for yourself and your users in a Local First way.

## Collaboration Made Possible

Building collaborative software requires careful consideration of numerous technical and user experience challenges. While the landscape of available solutions continues to evolve, success lies in choosing the right combination of tools and approaches for your specific use case. We’ll give some more details about the landscape tomorrow but this is the work of the Local First Academy.

Consider starting with existing libraries and frameworks rather than building everything from scratch. This allows you to focus on your application's unique value while leveraging battle-tested solutions for core collaborative functionality. Remember that the goal is to make collaboration feel effortless to your users, even as you handle complex technical challenges behind the scenes. With careful planning and the right tools, you can create collaborative experiences that meet user expectations while maintaining performance, security, and reliability.

In our next article we will explore some of the libraries in the space.