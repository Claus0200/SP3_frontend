import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userFacade from "../scripts/userFacade";

function BookOrder() {
  const [orderedBooks, setOrderedBooks] = useState([]);
  const navigate = useNavigate();

  // Loading ordered books from localStorage when the component mounts
  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("orderedBooks")) || [];
    setOrderedBooks(storedBooks);
  }, []);

  const confirmOrder = () => {
    alert("You can now read your books!");

    // Map through the ordered books to extract IDs
    const bookIds = orderedBooks.map((book) => book.id);

    bookIds.forEach((id) => userFacade.addLentbook(id));
   
    // Clear only the current orders
    localStorage.setItem("orderedBooks", JSON.stringify([])); // Empty the order list
    setOrderedBooks([]); // Clear the state for the current session
  };

  return (
    <div>
      <h1>Book Order</h1>

      {orderedBooks.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {orderedBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.year}</td>
                <td>{book.genre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No books ordered yet. Go back and add some books!</p>
      )}

      {orderedBooks.length > 0 && (
        <button onClick={confirmOrder}>Confirm Order</button>
      )}

      <button onClick={() => navigate("/books")} style={{ marginTop: "20px" }}>
        Back to Book List
      </button>
    </div>
  );
}

export default BookOrder;







