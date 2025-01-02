import facade from "../assets/apiFacade";

const URL = "https://library.clausjoergensen.dk/api";

function userFunctions() {

    const addLentbook = (id) => {
        fetch(URL + "/lendbooks/" + id, facade.makeOptions("POST", true))
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.log("An error occurred: ", error))
    }
    

    return {
        addLentbook,
    }
}

const userFacade = userFunctions();
export default userFacade;