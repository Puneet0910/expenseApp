async function signup(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const user = { name, email, password };

    try {
        const response = await axios.post("http://localhost:3000/user/signup", user);
        console.log("Response:", response.data);
        alert("Signup successful!");
    } catch (error) {
        console.error("Error:", error);
    }
}