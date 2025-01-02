import { useEffect, useState } from "react";
import styled from "styled-components";
import adminFacade from "../scripts/adminFacade";
import { useNavigate } from "react-router-dom";

const Table = styled.table`
  border-radius: 5px;
`;

function Admin() {
  const [lentBooks, setLentBooks] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    adminFacade.fetchLentbooks(setLentBooks)
  }, []);

  useEffect(() => {
    console.log(lentBooks)
  }, [lentBooks]);

  const editLentbook = (id) => {
    const lentBook = lentBooks.find((lentBook) => lentBook.id === id)
    navigate("/admin/edit/" + lentBook.id, { state: { lentBook} })
  }

  const deleteLentbook = (id) => {
    adminFacade.deleteLentbook(id)
    adminFacade.fetchLentbooks(setLentBooks)
  }

  const formatLentDate = (lentDate) => {
    const [year, month, day, hour, minute, second] = lentDate

    return new Date(year, month-1, day, hour+1, minute, second).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })

  }

  return (
    <div>
      <h1>Admin</h1>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Book</th>
            <th>Lentdate</th>
            <th>Returndate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(lentBooks) ? (
            lentBooks.map((lentBook) => (
              <tr key={lentBook.id}>
                <td>{lentBook.id}</td>
                <td>{lentBook.user.username}</td>
                <td>{lentBook.book.title}</td>

                <td>{formatLentDate(lentBook.lentDate)}</td>

                <td>{lentBook.returndate ? lentBook.returnDate : "Hasn't been returned"}</td>
                <td>
                  <button onClick={() => editLentbook(lentBook.id)}>Edit</button>
                  <button onClick={() => deleteLentbook(lentBook.id)}>Delete</button>
                </td>
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
