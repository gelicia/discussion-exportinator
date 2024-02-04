export const query = 'query ( '+
    '$query: String = "repo:grafana/grafana is:OPEN" '+
  ') { '+
    'search(type: DISCUSSION, last: 100, query: $query) { '+
      'discussionCount '+
      'nodes { '+
        '... on Discussion { '+
          'id '+
          'title '+
          'url '+
          'repository { '+
            'nameWithOwner '+
'          } '+
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
   