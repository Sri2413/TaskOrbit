export default function Resetpasword() {
  return (
    <form>
      <div>
        <label>Old password:</label>
        <input type="password" placeholder="enter the old password" />
        <br />
        <label>New password:</label>
        <input type="password" placeholder="enter the new password" />
        <br />
        <label>Confirm New Password:</label>
        <input type="password" placeholder="Enter the confirm password" />
      </div>
    </form>
  );
}
