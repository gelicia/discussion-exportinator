export const query = (endCursor) => 'query ( '+
    '$query: String = "repo:grafana/grafana is:OPEN" '+
    '$after: String '+ (endCursor ? `= "${endCursor}"` : '')+
  ') { '+
    'search(type: DISCUSSION, first: 100, query: $query, after: $after) { '+
      'discussionCount '+
      'nodes { '+
        '... on Discussion { '+
          'title '+
          'createdAt '+
          'url '+
          'upvoteCount '+
          'reactions { '+
            'totalCount '+
'          } '+
          'comments { '+
            'totalCount '+
'          } '+
'        } '+
'      } '+
         'pageInfo { '+
          'endCursor '+
          'startCursor '+
          'hasNextPage '+
          'hasPreviousPage '+
'        } '+
'    } '+
'  } ';
   