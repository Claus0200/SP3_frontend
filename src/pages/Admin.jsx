import { useEffect, useState } from "react";
import styled from "styled-components";
import facade from "../assets/apiFacade";

const Table = styled.table`
  border-radius: 5px;
`;

function Admin() {
  const [lentBooks, setLentBooks] = useState([]);

  useEffect(() => {
    fetch("https://library.clausjoergensen.dk/api/lendbooks",facade.makeOptions("GET", true))
      .then((response) => response.json())
      .then((data) => setLentBooks(data))
      .catch((error) => console.log("An error occurred: ", error));
  }, []);

  useEffect(() => {
    console.log(lentBooks)
  }, [lentBooks]);

  return (
    <div>
      <h1>Admin</h1>
      <Table>
        <thead>
          <tr>
            <th>User</th>
            <th>Book</th>
            <th>Lentdate</th>
            <th>Returndate</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(lentBooks) ? (
            lentBooks.map((lentBook) => (
              <tr key={lentBook.id}>
                <td>{lentBook.user.username}</td>
                <td>{lentBook.book.title}</td>
                <td>{lentBook.lentDate}</td>
                <td>{lentBook.returndate ? (lentBook.returnDate) : ("No lentbookdate found")}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No lent books available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default Admin;
