import { useLocation, useNavigate } from "react-router-dom";
import adminFacade from "../scripts/adminFacade";
import { useState } from "react";
import styled from "styled-components";

const EditForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;

    div {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    label {
        text-align: left;  /* Ensure labels are aligned left */
    }

    input {
        width: 100%;  /* Make inputs full width */
    }

    button {
        margin-top: 10px;
    }
`

/* eslint-disable react/prop-types */
function AdminEdit() {
    const location = useLocation()
    const navigate = useNavigate();
    const [lentBook, setLentBook] = useState(location.state.lentBook)

    // Handle changes to form fields
    const handleChange = (event) => {
        const { name, value } = event.target;
        setLentBook((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await adminFacade.editLentbook(lentBook.id, lentBook);
            alert("Lent book updated successfully!");
            navigate("/admin");
        } catch (error) {
            console.error("Failed to update lent book:", error);
            alert("Failed to update lent book.");
        }
    }

    const formatDateForInput = (date) => {
        if (!date) return ""; // Handle null or undefined dates
        const [year, month, day, hour, minute, second] = date; // Destructure the array
        // Create a Date object using the correct components (month is 0-based)
        const parsedDate = new Date(year, month - 1, day, hour, minute, second);
        
        if (isNaN(parsedDate)) {
            console.error("Invalid date:", date);
            return ""; // Return an empty string if the date is invalid
        }
        return parsedDate.toISOString().slice(0, 16); // Format to 'YYYY-MM-DDTHH:mm'
    };
    
  

    return (
    <div>
      <h1>Edit Lent Book</h1>
      <EditForm onSubmit={handleSubmit}>
        <div>
          <label>ID:</label>
          <input type="text" value={lentBook.id} disabled />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="user.username"
            value={lentBook.user.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Book Title:</label>
          <input
            type="text"
            name="book.title"
            value={lentBook.book.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Lent Date:</label>
          <input
            type="datetime-local"
            name="lentDate"
            value={formatDateForInput(lentBook.lentDate)}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Return Date:</label>
          <input
            type="datetime-local"
            name="returnDate"
            value={
              lentBook.returnDate
                ? formatDateForInput(lentBook.lentDate)
                : ""
            }
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={() => navigate("/admin")}>
          Cancel
        </button>
      </EditForm>
    </div>
  );
}

export default AdminEdit;