import styled from "styled-components";

const TableContainer = styled.div`
  margin: 20px;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  margin-bottom: 20px;

  tr:hover {
    background-color: #f1f1f1;
  }
`;

function Endpoints() {
    return (
        <TableContainer>
      <h1>API Documentation</h1>

      {/* Books Table */}
      <h2>Books</h2>
      <StyledTable>
        <thead>
          <tr>
            <th>Method</th>
            <th>URL</th>
            <th>Request Body (JSON)</th>
            <th>Response (JSON)</th>
            <th>Error</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>GET</td>
            <td>api/books</td>
            <td>-</td>
            <td>[book (3), book (3), ...]</td>
            <td>-</td>
          </tr>
          <tr>
            <td>GET</td>
            <td>api/books/{`{id}`}</td>
            <td>-</td>
            <td>book (3)</td>
            <td>(e1)</td>
          </tr>
          <tr>
            <td>POST</td>
            <td>api/books</td>
            <td>Book (3) without id</td>
            <td>book (3) with the new created id</td>
            <td>(e2), (e7)</td>
          </tr>
          <tr>
            <td>UPDATE</td>
            <td>api/books/{`{id}`}</td>
            <td>Book (3)</td>
            <td>book (3)</td>
            <td>(e3), (e1)</td>
          </tr>
          <tr>
            <td>DELETE</td>
            <td>api/books/{`{id}`}</td>
            <td>Book (3)</td>
            <td>book (3)</td>
            <td>(e1)</td>
          </tr>
        </tbody>
      </StyledTable>

      {/* Book Search Table */}
      <h2>Book Search</h2>
      <StyledTable>
        <thead>
          <tr>
            <th>Method</th>
            <th>URL</th>
            <th>Request Body (JSON)</th>
            <th>Response (JSON)</th>
            <th>Error</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>GET</td>
            <td>api/books/genre/{`{genre}`}</td>
            <td>-</td>
            <td>[book (3), book (3), ...]</td>
            <td>(e1), (e2)</td>
          </tr>
          <tr>
            <td>GET</td>
            <td>api/books/title/{`{title}`}</td>
            <td>-</td>
            <td>[book (3), book (3), ...]</td>
            <td>(e1), (e2)</td>
          </tr>
          <tr>
            <td>GET</td>
            <td>api/books/year/{`{year}`}</td>
            <td>-</td>
            <td>[book (3), book (3), ...]</td>
            <td>(e1), (e2)</td>
          </tr>
        </tbody>
      </StyledTable>

      {/* Lent Books Table */}
      <h2>Lent Books</h2>
      <StyledTable>
        <thead>
          <tr>
            <th>Method</th>
            <th>URL</th>
            <th>Request Body (JSON)</th>
            <th>Response (JSON)</th>
            <th>Error</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>GET</td>
            <td>api/lendbooks/</td>
            <td>-</td>
            <td>[lentbook (4), lentbook (4), ...]</td>
            <td>-</td>
          </tr>
          <tr>
            <td>GET</td>
            <td>api/lendbooks/{`{id}`}</td>
            <td>-</td>
            <td>lentbook (4)</td>
            <td>(e1)</td>
          </tr>
          <tr>
            <td>POST</td>
            <td>api/lentbooks</td>
            <td>lentbook (4) without id</td>
            <td>lentbook (4) with the new created id</td>
            <td>(e2), (e7)</td>
          </tr>
          <tr>
            <td>UPDATE</td>
            <td>api/lentbooks/{`{id}`}</td>
            <td>lentbook (4)</td>
            <td>lentbook (4)</td>
            <td>(e3), (e1)</td>
          </tr>
          <tr>
            <td>DELETE</td>
            <td>api/lentbooks/{`{id}`}</td>
            <td>lentbook (4)</td>
            <td>lentbook (4)</td>
            <td>(e1)</td>
          </tr>
          <tr>
            <td>GET</td>
            <td>api/lentbooks/user</td>
            <td>-</td>
            <td>[lentbook (4), lentbook (4), ...]</td>
            <td>-</td>
          </tr>
        </tbody>
      </StyledTable>

      {/* Security Table */}
      <h2>Security</h2>
      <StyledTable>
        <thead>
          <tr>
            <th>Method</th>
            <th>URL</th>
            <th>Request Body (JSON)</th>
            <th>Response (JSON)</th>
            <th>Error</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>POST</td>
            <td>api/auth/register</td>
            <td>User (1)</td>
            <td>Token (2)</td>
            <td>(e5), (e6), (e7)</td>
          </tr>
          <tr>
            <td>POST</td>
            <td>api/auth/login</td>
            <td>User (1)</td>
            <td>Token (2)</td>
            <td>(e4), (e5), (e6)</td>
          </tr>
        </tbody>
      </StyledTable>

      {/* Error Documentation */}
      <h2>Errors</h2>
      <StyledTable>
        <thead>
          <tr>
            <th>Error Code</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>(e1)</td>
            <td>No content found for this request (404)</td>
          </tr>
          <tr>
            <td>(e2)</td>
            <td>Field ‘xxx’ is required (400)</td>
          </tr>
          <tr>
            <td>(e3)</td>
            <td>The client does not have the right to the content (403)</td>
          </tr>
          <tr>
            <td>(e4)</td>
            <td>User not found with this username or password (401)</td>
          </tr>
          <tr>
            <td>(e5)</td>
            <td>Could not create token (500)</td>
          </tr>
          <tr>
            <td>(e6)</td>
            <td>Token is not valid (403)</td>
          </tr>
          <tr>
            <td>(e7)</td>
            <td>Entity already exists (409)</td>
          </tr>
        </tbody>
      </StyledTable>
    </TableContainer>
      
    );
}

export default Endpoints;