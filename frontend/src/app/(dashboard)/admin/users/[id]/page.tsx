import styles from "@/shared/components/ui/Admin/Users/singleUser/singleUser.module.css";

import Image from "next/image";

const SingleUserPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="" fill />
        </div>
        John Doe
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <label>Username</label>
          <input type="text" name="username" placeholder="Ngoc Linh" />
          <label>Email</label>
          <input type="email" name="email" placeholder="ngoclinh@gmail.com" />
          <label>Password</label>
          <input type="password" name="password" />
          <label>Phone</label>
          <input type="text" name="phone" placeholder="+1234567" />
          <label>Address</label>
          <input type="text" name="address" placeholder="New York" />
          <label>Rank</label>
          <select name="isAdmin" id="isAdmin">
            <option value="general" selected>
              Choose a rank
            </option>
            <option value="normal"> Unranked</option>
            <option value="bronze"> Bronze</option>
            <option value="silver"> Silver</option>
            <option value="gold"> Gold</option>
          </select>
          <label>Is Active</label>
          <select name="isActive" id="isActive">
            <option value="Yes"> Yes</option>
            <option value="No"> No</option>
          </select>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
