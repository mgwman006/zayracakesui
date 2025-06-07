
export default function ResetPassWordPage() {
    return (
        <div>
        <h2>Reset Password</h2>
        <p>Please enter your email address to reset your password.</p>
        <form>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <button type="submit">Reset Password</button>
        </form>
        </div>
    );
    }