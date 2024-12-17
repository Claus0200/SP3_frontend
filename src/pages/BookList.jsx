import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function BookList() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const { searchType } = useParams();  // This hook retrieves parameters from the URL.
  const navigate = useNavigate();
  const location = useLocation();
  
  // Initialize orderedBooks from localStorage or location state
  const [orderedBooks, setOrderedBooks] = useState(() => {
    const storedBooks = JSON.parse(localStorage.getItem("orderedBooks")) || [];
    return location.state?.orderedBooks || storedBooks;
  });

// Navigate to the correct route if search type is missing.  
// ordered books will be sent with the new route
useEffect(() => {
    if (!searchType) {
      navigate("/books", { state: { orderedBooks } }); // Ensure orderedBooks is preserved during navigation
    }
  }, [searchType, navigate, orderedBooks]);


// Fetching books  
  useEffect(() => {
    const fetchAllBooks = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("https://library.clausjoergensen.dk/api/books");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setBooks(data);
        setFilteredBooks(data);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to fetch books. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllBooks();
  }, []);


  //function designed to filter a list of books 
  // based on a query and a filter type
  const filterBooks = (books, query, type) => {
    if (!query.trim()) return books;  // If the query is empty or just whitespace, return the full list of books.

    const lowerCaseQuery = query.toLowerCase();  // Convert the query to lowercase for case-insensitive searching.
    return books.filter((book) => {
      if (type === "title") return book.title.toLowerCase().includes(lowerCaseQuery); // Match query with the book's title.
      if (type === "author") return book.author.toLowerCase().includes(lowerCaseQuery);
      if (type === "year") return book.year.toString().includes(lowerCaseQuery);
      return false; // If none of the conditions match, exclude the book.
    });
  };


  useEffect(() => {
    const filtered = filterBooks(books, searchQuery, searchType);
    setFilteredBooks(filtered);
  }, [searchQuery, searchType, books]);


  
  const addToOrder = (book) => {
    setOrderedBooks((prev) => {
      if (prev.find((b) => b.id === book.id)) {
        console.log("Duplicate book skipped:", book); // Debug
        return prev;
      }
      const updatedBooks = [...prev, book];
      console.log("Added to order:", updatedBooks); // Debug

      // Save to localStorage
      localStorage.setItem("orderedBooks", JSON.stringify(updatedBooks));

      // Update the state in React Router
      navigate("/books", { state: { orderedBooks: updatedBooks } }); // Pass updated orderedBooks
      return updatedBooks;
    });
  };

  return (
    <div>
      <h1>Book Search</h1>

      <div>
        <label>
          <input
            type="radio"
            value="title"
            checked={searchType === "title"}
            onChange={() => navigate("/books/title", { state: { orderedBooks } })}
          />
          Search by Title
        </label>
        <label>
          <input
            type="radio"
            value="author"
            checked={searchType === "author"}
            onChange={() => navigate("/books/author", { state: { orderedBooks } })}
          />
          Search by Author
        </label>
        <label>
          <input
            type="radio"
            value="year"
            checked={searchType === "year"}
            onChange={() => navigate("/books/year", { state: { orderedBooks } })}
          />
          Search by Year
        </label>
      </div>

      <input
        type="text"
        placeholder={`Search books by ${searchType || "title"}`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {filteredBooks.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
              <th>Genre</th>
              <th>Order</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.year}</td>
                <td>{book.genre}</td>
                <td>
                  <button onClick={() => addToOrder(book)}>Add to Order</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>No books found. Try a different query.</p>
      )}
    </div>
  );
}

export default BookList;











