import { GITHUB_TOKEN } from "./secret.js";
import { query } from "./query-issue.js";
let nextPage = true;
let nextCursor = undefined;
let cursors = [];
let discussionCount = undefined;
const now = new Date();
console.log('title,url,reactionsCount,commentsCount,totalCount,createdDate,daysOld')
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
    const totalEngagements = element.reactions.totalCount+element.comments.totalCount;

    const diff_time = now.getTime() - createdDate.getTime();
    const diff_days = Math.round(diff_time / (1000 * 3600 * 24));

      console.log(
        `${element.title.replaceAll(",", " ")},${element.url},${element.reactions.totalCount},${element.comments.totalCount},${totalEngagements},${createdDate.toDateString()},${diff_days}`
      );
    });
  });
}
