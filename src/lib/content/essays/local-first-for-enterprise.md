---
title: "Local First for Enterprise"
slug: local-first-for-enterprise
published: "2024-12-03"
updated: "2024-12-03"
categories:
  - "local first"
  - "development"
  - "enterprise"
  - "syncing"
coverImage: "/content-images/essays/zeldaskywardarrowsync.png"
coverWidth: 16
coverHeight: 9
excerpt: Thoughts on how Local First can fit into enterprise software development
---

## Local First and Enterprise? 

Local First software and enterprise software are often seen as being at odds. But here I want to look at ways in which 
I think Local First can fit in and be an asset to enterprise software. 

### User Experience

First we must always start with the user. If we may chunk up pieces of the Local First ideals, enterprise software could immediately
begin benefitting users in a few ways. 

At minimum near instant reads would be a game changer. How much time is spent seeing some sort of loading
UI on a page? Even better though Local First lets us start to move towards somewhat of an Islands Architecture model. 

Islands Architecture is an increasingly popular term for Progressive Enhancement. The premise being that there are little 
'islands' of interactivity. Rather than fetch data higher up the comopnent tree and passing it down, Local First
lets you query data wherever you want. 

For example, if I think of the app I work on professionally, users do interact with data a lot. But I think users 
would happily accept the loading UI from making updates for instant reads. 

In our app one part of the app that is critical yet could be improved with Local First is displaying data 
tables/grids. 

#### Sync Approaches for Enterprise

The displaying of data brings up a something inevitable in large datasets and a Local First approach. 

We can't load all the data into the client, how do we do partial sync? There are a lot of services thinking about this. 
One company/technology that I am eager to try due to their approach to this problem is ZeroSync. Others that I think will have good
approaches are Automerge, Convex with their Object Sync, and ElectricSQL. 

The beauty with these approaches is that they take care of loading data for you when you reach the end of what the client 
can hold.

So say we have a table with a million rows (or whatever amount would max out browser storage) and we have infinite scroll on the table,
with partial sync we would still be able to load a chunk of data at a time to display and by the time the user reaches 
the end of the available data, would have loaded the next available amount. Obviously it is more complex than that in implementation
but that is why they do it and I am not. 

Without Sync and Partial Sync, Local First in enterprise doesn't make much sense. 

But with it, the User Experience is drastically improved. 

#### Offline and Collaboration

Simply put, for Large Enterprise apps like, I don't think offline writes are a big deal but reads are necessary. 

There are many cases where a user may not have access to the internet. So still being able to perform critical workflows
by seeing/reading data is necessary. 

Writes could enter the picture but will always be app and user specific. So offline may be a big deal for your enterprise
software for your users. Collaboration, although simple in concept, can be done in nearly infinite ways.

For Local First to be successful in enterprise, the ones building the software and must know their users and know how they colloborate. 

For many, like us, collaboration is largely in a shared space. For others, collaboration is completely asynchronous.

Offline writes for asychronus collaboration makes a lot of sense. But for in person, shared space collaboration, it makes much less sense.

### Developer Experience

A lot is said these days of Developer Experience. Many hold that if the DX is good, the UX will be good as a by product. 

But there is a lot of evidence to refute that theory. Some technology with great DX doesn't bode well for good UX. 

However, Local First does have a lot of benefits for DX. Why? Simply put, the dream of the developer is to simply be able to
write queries and have them work. Not only have them work but also have them be reactive. 

Local First gives developers that ability. Simply write a query and show some markup based off the data.

Developers can work at an incredibly efficiency due to the benefits of sync taking care of the network for them.

### Conclusion

I am sure there are many more ways that Local First can fit into enterprise software. These are a few that I think
can be immediately beneficial. 

One of the hard things with Local First, like most new technologies, is the "all or nothing" mentality. 

Many have said "Local First, not 'Local Only'". That is a good mentality for enterprise software. 

Enterprise companies would do well to consider Local First approaches and see if there are ways they can benefit and 
gradually adopt Local First approaches/patterns. 

Local First doesn't have to mean you lose the server as the source of truth. It can also supplement/support that model.