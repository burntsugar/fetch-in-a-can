# fetch-in-a-can

My Fetch helper for Node.js

![Photo by Matthew T Rader on Unsplash https://unsplash.com/@matthew_t_rader?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText](cover.jpg)

# Status: Development | Active

I maintain this helper library for use in my own projects.

**examples...**

````javascript
const restGetCall = async () => {
    // Github REST API v3
    const endpoint = 'https://api.github.com/users/burntsugar';
    const response = await fetchInACan.fetchGetRestApi(endpoint);
    const data = await response.getBody();
    console.log(data);
    return data;
}

const graphQLCall = async () => {
    // Github GraphQL API v4
    const query = `{ user(login: "burntsugar") { bio avatarUrl(size: 200) url login name } }`;
    const payload = JSON.stringify({ query: query });
    const response = await fetchInACan.fetchPostGraphQLApi('https://api.github.com/graphql', payload, API_KEY
    );
    const data = await response.getBody();
    console.log(data);
    return response;
}
````

## 🥫 Install

````bash
npm install --save fetch-in-a-can
````

## 🥫 Use

````javascript
import fetchInACan from 'fetch-in-a-can';
````

## What's inside

* [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
* [TypeScript](https://www.typescriptlang.org/index.html)
* [Jest](https://jestjs.io/en/)
* [ES6](https://tc39.es/ecma262/)

<br>

<hr>

*rrr@<span></span>burntsugar.rocks*