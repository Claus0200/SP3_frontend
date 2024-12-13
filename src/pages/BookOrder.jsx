import { useLocation, useNavigate } from "react-router-dom";

function BookOrder() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderedBooks = location.state?.orderedBooks || [];
  console.log("Received orderedBooks in BookOrder:", orderedBooks); // Debug

  const confirmOrder = () => {
    alert("You can now read your books!");
    navigate("/books", { state: { orderedBooks } }); // Preserve state on navigation
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
    </div>
  );
}

export default BookOrder;








