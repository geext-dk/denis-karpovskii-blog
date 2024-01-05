---
title: 'Sessions vs JWTs'
date: '2024-01-05'
tags:
- auth
- security
- backend
- development

---

Did you ask yourself a question "What should I use - sessions or JWTs"?
I did, and I was very confused about
what is better to use in my particular case. Now I want to help to
sort this out for you too.

---

Did you ask yourself a question "What should I use - sessions or JWTs"?
I did, and I was very confused about
what is better to use in my particular case, especially because there are
different opinions on the web regarding this topic. Now I want to help to
sort this out for you too. But first, let's clarify what these terms even mean.

# What Are Sessions?
A session can mean different things in different contexts, but in the context
of authentication, sessions usually mean the period of time the user opened or
logged in to your application, and the data associated with it. For example,
session start date, user id, possibly some preferences, basically whatever
you need to be shared between multiple page visits within a single user
session.

Sessions are usually stored in cookies and are passed between the client and
the backend automatically by the browser. Now, the cookie can store an ID of
the session only (stateful sessions) which can be used to find the relevant
data on the server, or all the session data (stateless sessions).

# What Are JWTs?
JSON Web Tokens (JWT) is a format of tokens that can store arbitrary data.
Basically, it's an encoded JSON String. You can play with the format a bit
on [the site dedicated to JWTs](https://jwt.io) to have a better understanding.

Usually, JWTs are used for authentication because it's a good Bearer token
format to stick to. They are signed, so it's always possible to detect whether
they were modified after issuing. They can also contain arbitrary data, so
any information about the user you need.

# Confusion
When I first looked on the topic, I was confused: How can we even compare
sessions and JWTs? After all, they are basically the same thing, but
JWT is just a special format of storing the session id or data.

But, it's usually implied that JWT tokens are not stored in cookies but
 in local storage, and are passed in the `Authentication` header as a
`Bearer` token. Also, JWT tokens also can be implied to be stateless because
they can contain arbitrary data, even though cookie-based sessions can do this
too in various web frameworks. But let's just assume these implications.

So the question is more about "cookie-based sessions" vs stateless JWTs stored
in some other storage.

Then, to compare such auth methods, we need to first clarify what are the
differences between "stateless" and "stateful", and "Cookies" and
"Local Storage" (most used alternative to cookie storage, used for JWTs).

# Stateless vs Stateful
What's the difference between "Stateless" and "Statefuls" sessions?

## Stateless sessions
The session is called stateless when the session data contains all the data
needed to authenticate and authorize the person, for example, to determine
whether they have access to a particular API endpoint.

If, for exmaple, a stateless JWT used for authentication, the server can just
decode it, verify and access all the data that is contained in it. And it
can contain ther role of the user, like admin, regular user,
or a customer service person, which could be used to determine access level.

* **Scalable**: If there is a large number of small requests that require
authentication, stateless sessions are better because there is no need to
make a request for the session data on the server, thus improving the
performance.

* **Contain embedded data**: And that data can be used on multiple services
without accessing the database, which makes stateless tokens extra convenient.

* **Not possible to revoke**: The sessions are not stored server-side, so it's
not possible to revoke such sessions in case they are compromised, for example,
without implementing a server-side blacklist, which essentially makes sessions
stateful

## Stateful sessions
The session is stateful when the session data should be acquired on the server
from its storage, like database or in-memory storage.

* **Revokable**: Because session data is stored on backend, it's not hard to
flag such sessions as revoked and refuse requests with revoked sessions.

* **Meaningless for other services**: A service needs access to the database
(or cache) that contains session data to make any sense out of such sessions

# Cookies vs Local Storage
These are two main ways to store data returned from the server, and they also
have different use cases.

## Cookies
Cookies are very easy to handle because the browser takes care of them for us.
When cookies are returned from the server, they are automatically saved by the
browser.

* **Secure**: Cookies can be configured in such a way that it's not possible
to access them from JS, so they are considered more secure than local storage.

* **Easy to use**: Cookies are stored by the browser and sent to the server
automatically. No need to read server response, look for the token, store it
in some storage and then for every request fetch this value: it's all done for
you already.

* **Limited size**: The maximum size of cookies is just 4 kilobytes, so they
might be pretty limited for certain use cases.

* **Multi-domain usage**: It's not possible to pass the same cookie to
different domains unless they are configured to be accessible from JS, which
is a big security risk.

* **Beware of CSRF attacks**: while HTTP-only cookies cannot be accessed from
JS, cookie-based authentication is vulnerable to CSRF attacks, but there are
well-known ways to mitigate those, for example, the [Cookie-to-header token](https://en.wikipedia.org/wiki/Cross-site_request_forgery#Cookie-to-header_token)
technique.

## Local storage
Local storage is a browser API that allows to store data, similar to cookies.

* **Bigger**: Local storage can store up to 5 megabytes of data per domain

* **Versatile**: Since it's a JS API, you can do whatever you want with the
data from JavaScript

* **JS-Only**: Local storage can be accessed only through the browser API
from JS, which means it requires the user to have JavaScript turned on (which
is not a big problem anyway)

* **Harder to pass to backend**: Unlike cookies, local storage data isn't sent
to backend automatically, so you need to pass the data in request manually
if you need it.

* **XSS attacks**: Storing data in Local Storage protects from CSRF attacks
but since the data is accessible from JS, it is vulnerable to
XSS attacks instead, which should still be mitigated but in case there is
an undiscovered vulnerability, it's much easier to get the token from local
storage and to use it later without exploiting the vulnerability anymore,
while with CSRF the attacker will never get the actual token value.

# So when to use what?
The basic advice is to never use JWT tokens for user sessions for the following
reasons:
* They can't be revoked
* Because they can't be revoked, JWT tokens must be short-lived, which
has implications on the user experience
* Local storage is less secure
* They are harder to manage because session implementations are much more
mature in backend frameworks, and JWT most of the times require special
handling

Most session implementations can do everything JWT does, and better.

There are some cases in microservice architectures when the client application
talks directly to microservices. In such cases, JWT might be used to authorize
some operations but they are used only one time and then discarded.

Some examples:
* A client needs to access some stateless microservice to do some operation:
In such case, authorization or other service should issue a short-lived
JWT token that can be used to authorize this operation in the desired
microservice. The token is discarded after the use.
* A client needs to have a session within some stateful microservice, e. g.
cart service. In such case, authorization service should issue a JWT token
that authorizes the user, the client should pass it to the desired microservice
to exchange the token for a session. So basically, there will be one session
per stateful microservice.

# Conclusion
Authentication topic may be confusing sometimes, especially when there is no
single right answer on the web. In such cases, it's important to understand
why one way is preferred over the other to make the right decision. Hopefully,
this article made some things clearer for you.
