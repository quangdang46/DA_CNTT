import styles from "@/shared/components/ui/Admin/Teams/singleTeam/singleTeam.module.css";
import Image from "next/image";

const SingleTeamPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/static/images/avatar/noavatar.png" alt="" fill />
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
          <label>Role</label>
          <select name="role" id="role">
            <option value="general">Choose a Role</option>
            <option value="ITSupport"> IT Support</option>
            <option value="ITInventory"> IT Inventory</option>
            <option value="Shipper"> Shipper</option>
          </select>
          <label>To Do</label>
          <input type="text" name="todo" placeholder="Sprint 1" />
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

export default SingleTeamPage;
