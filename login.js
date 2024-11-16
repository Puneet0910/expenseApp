async   function login(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const user = { email, password };

    try {
        const response = await axios.post("http://localhost:3000/user/login", user);
        console.log("Response:", response.data);
        alert("Login successful!")
    } catch (error) {
        console.error("Error:", error);
    }
}