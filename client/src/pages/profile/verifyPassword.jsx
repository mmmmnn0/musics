const VerifyPassword = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleVerifyPassword = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const res = await axios.post(`${apiUrl}/auth/verify-password`, {
                userId,
                password,
            });
            setMessage(res.data.message);
        } catch (err) {
            setMessage(err.response.data.message || "Error verifying password");
        }
    };

    return (
        <div>
            <h1>Verify Password</h1>
            <form onSubmit={handleVerifyPassword}>
                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Verify Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default VerifyPassword;
