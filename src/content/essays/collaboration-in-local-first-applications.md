---
title: 'Collaboration in Local First Applications'
slug: collaboration-in-local-first-applications
published: '2025-01-03'
updated: '2025-01-03'
categories: ['javascript', 'local-first', 'collaboration', 'realtime', 'CRDTs']
coverImage: '/content-images/essays/collaboration-in-local-first-applications.png'
coverWidth: 16
coverHeight: 9
excerpt: The History of Collaboration and what collaboration means to Local First
---


Collaboration in Web Apps has come a long way. Today we are looking at the history of collaboration in web apps as well as what collaboration means in a Local First context.

## History of Collaboration

Often collaboration is synonyms with Realtime applications. Thinking of collaboration this way gives us a little bit of insight into why collaboration has historically been difficult as well as where we tend to see other collaboration implementations.

### Git

Perhaps most common to all reading this is git. Now git is now realtime nor is git conflict free. But git like dropbox and other systems use a method of prompting the user for conflict resolution rather than handling conflicts for you.

Why is this significant? What we are going for in collaborative apps is collaboration without manual conflict resolution. Manual conflict resolution, although very convenient and nice for the implementations mentioned above, does not allow for realtime collaboration.

### Google Docs

The most commonly referenced example as a kind of ‘northstar’ for collaboration is Google Docs. Google Docs was one of the first widely used apps that figured out multi user collaboration with conflict free editing amongst all users. Google Docs quickly became the standard for realtime but for years this standard was very far out of reach. There have been other apps and architectures that have allowed for realtime experiences but nothing has come close to Google Docs until the last 3-4 years in terms of experience. 

### Current Options for Collaboration

Over the past 3-4 years the following have been some of the primary way of implementing Realtime in applications: Firebase, Phoenix LiveView/Elixir, and Cloudflare Durable Objects. We will primarily look into Cloudflare. 

Firebase is by Google so it would make sense that it would be a good realtime solution but it comes with significant tradeoffs primarily around scalability and implementation. 

Phoenix Liveview/Elixir is also a fantastic choice for Realtime. Due to the underlying infrastructure that Elixir runs on, The Beam. The Beam is what the telecommunication system runs on and if we think simply about telephone communication conflicts must be managed and be highly available by default. 

Phoenix LiveView provides a framework for Elixir apps that treats Web Sockets as first class citizens and can scale with The Beam. This is a very viable option for collaboration. Once you learn how sockets work in Phoenix LiveView you don't really have to manage conflicts due to the underlying infrastructure of The Beam. 

*Fun Note: If you have ever attempted to implement Realtime with Supabase, Supabase Realtime is built with Elixir/Phoenix LiveView.* 

## Conflict Free Replicated Data Types

The last current option for collaboration I mentioned above is from Cloudflare through their durable objects. I first came across Durable Objects through Sunil Pai. One of the things he has said that made Durable Objects stick with me was: 

> “Durable Objects are essentially Lambda’s with State” - Sunil Pai on a podcast/talk somewhere
> 

Why is this significant? For the purposes of our conversation the only reason this is possible is due to Conflict Free Replicated Data Types (CRDT’s). 

CRDT’s allow for collaboration in a shared digital space on the same thing without conflict. 

### Why is this Important?

The nice part about CRDT’s is that they can be applied by anyone to a system or architecture. You can go implement a Last Write Wins CRDT right now in your own application. 

But it also means, in Local First, that we now have a variety of ways of allowing for collaboration that can be tailored to your application. 

Collaboration is no longer for multi-million or billion dollar companies with teams to create experiences. Collaboration is becoming table stakes all over the web. CRDT’s are creating a “user may choose” level of experience for implementing the type of collaboration you want in your application.

### Conclusion

In the coming Days of Local First, we will look at how to use Collaboration in apps without a server and look at a library and how they manage collaboration. 

Collaboration is a critical aspect of Local First and with all the advances in CRDT’s we can now build cloud level collaborative experiences with the benefits of Local First architectures. 