export const query = (endCursor) => 'query ( '+
    '$query: String = "repo:grafana/grafana is:issue state:open project:grafana/56" '+
    '$after: String '+ (endCursor ? `= "${endCursor}"` : '')+
  ') { '+
    'search(type: ISSUE, first: 100, query: $query, after: $after) { '+
      'issueCount '+
      'nodes { '+
        '... on Issue { '+
          'title '+
          'createdAt '+
          'updatedAt '+
          'url '+
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
   