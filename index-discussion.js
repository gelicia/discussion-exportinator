import { GITHUB_TOKEN } from "./secret.js";
import { query } from "./query-discussion.js";
let nextPage = true;
let nextCursor = undefined;
let cursors = [];
let discussionCount = undefined;
const now = new Date();
console.log('title,url,upvoteCount,reactionsCount,commentsCount,totalCount,createdDate,oldDiscussion,phase')
while (nextPage) {
  const response = fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
    body: JSON.stringify({
      query: query(nextCursor),
    }),
  }).then((r) => r.json());

  await response.then((r) => {
    // console.log(r);
    if (discussionCount === undefined) {
      discussionCount = r.data.search.discussionCount;
    }
    nextPage = r.data.search.pageInfo.hasNextPage;
    nextCursor = r.data.search.pageInfo.endCursor;
    cursors.push(nextCursor);
    //    console.log(nextCursor);

    r.data.search.nodes.forEach((element) => {

    const createdDate = new Date(element.createdAt);
    const oldDisc = createdDate < new Date('2023-01-01T00:00:00Z');
    const totalEngagements = element.upvoteCount+element.reactions.totalCount+element.comments.totalCount;

    let phase = 0;

    if (totalEngagements >=20) {
        phase = 1;
    } else if (totalEngagements >= 10) {
        phase = 2;
    } else if (!oldDisc) {
        phase = 3;
    } else {
        phase = 4;
    }

      console.log(
        `${element.title.replaceAll(",", " ")},${element.url},${element.upvoteCount},${element.reactions.totalCount},${element.comments.totalCount},${totalEngagements},${createdDate.toDateString()},${oldDisc},${phase}`
      );
    });
  });
}

console.log(cursors);
console.log(discussionCount);