import { GITHUB_TOKEN } from './secret.js';
import { query } from './query.js';


const response = fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
    body: JSON.stringify({
      query: query,
    }),
  }).then((r) => r.json());

  response.then(r => {
    r.data.search.nodes.forEach(element => {
        console.log(`${element.title},${element.url},${element.reactions.totalCount},${element.comments.totalCount}`)
    });
}
    //console.log(JSON.stringify(r))}
);