import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";

const AddUserPage = () => {
  return (
    <div className={styles.container}>
      <form action="" className={styles.form}>
        <input type="text" placeholder="username" name="username" required />
        <input type="email" placeholder="email" name="email" required />
        <input
          type="password"
          placeholder="password"
          name="password"
          required
        />
        <input type="phone" placeholder="phone" name="phone" required />
        <select name="rank" id="rank">
          <option value="general" selected>
            Choose a rank
          </option>
          <option value="normal"> Unranked</option>
          <option value="bronze"> Bronze</option>
          <option value="silver"> Silver</option>
          <option value="gold"> Gold</option>
        </select>

        <input type="file" name="image" id="image" accept="image/*" />
        <textarea
          name="address"
          id="address"
          rows="16"
          placeholder="Address"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUserPage;
