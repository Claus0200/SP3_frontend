import facade from "../assets/apiFacade";

const URL = "https://library.clausjoergensen.dk/api";

function adminFunctions() {

    const fetchLentbooks = (setLentBooks) => {
        fetch(URL + "/lendbooks", facade.makeOptions("GET", true))
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setLentBooks(data))
            .catch((error) => console.log("An error occurred: ", error))
    }
    
    const editLentbook = (id) => {
        fetch(URL + "/lendbooks/" + id, facade.makeOptions("PUT", true))
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => console.log(data))
            .catch((error) => console.log("An error occurred: ", error))
    }

    const deleteLentbook = (id) => {
        fetch(URL + "/lendbooks/" + id, facade.makeOptions("DELETE", true))
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => console.log(data))
            .catch((error) => console.log("An error occurred: ", error))
    }

    return {
        fetchLentbooks,
        editLentbook,
        deleteLentbook
    }
}

const adminFacade = adminFunctions();
export default adminFacade;