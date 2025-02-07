"use client";
import Pagination from "@/shared/components/ui/Admin/Pagination/Pagination";
import Search from "@/shared/components/ui/Admin/Search/Search";
import styles from "@/shared/components/ui/Admin/Users/users.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const users = [
  {
    id: 1,
    name: "Ngoc Linh",
    email: "ngoclinh@gmail.com",
    createdAt: "12.12.02",
    rank: "Silver",
    status: "active",
  },
  {
    id: 2,
    name: "John Doe",
    email: "johndoe@gmail.com",
    createdAt: "01.01.00",
    rank: "Gold",
    status: "inactive",
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "janesmith@gmail.com",
    createdAt: "15.06.03",
    rank: "Platinum",
    status: "active",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alicebrown@gmail.com",
    createdAt: "22.09.01",
    rank: "Silver",
    status: "active",
  },
  {
    id: 5,
    name: "Charlie Black",
    email: "charlieblack@gmail.com",
    createdAt: "05.11.99",
    rank: "Gold",
    status: "inactive",
  },
  {
    id: 6,
    name: "David White",
    email: "davidwhite@gmail.com",
    createdAt: "30.07.98",
    rank: "Silver",
    status: "active",
  },
  {
    id: 7,
    name: "Emma Green",
    email: "emmagreen@gmail.com",
    createdAt: "10.03.04",
    rank: "Platinum",
    status: "active",
  },
  {
    id: 8,
    name: "Liam Brown",
    email: "liambrown@gmail.com",
    createdAt: "17.08.97",
    rank: "Silver",
    status: "inactive",
  },
  {
    id: 9,
    name: "Sophia Lee",
    email: "sophialee@gmail.com",
    createdAt: "25.12.05",
    rank: "Gold",
    status: "active",
  },
  {
    id: 10,
    name: "Mason King",
    email: "masonking@gmail.com",
    createdAt: "03.02.06",
    rank: "Platinum",
    status: "inactive",
  },
];

const UsersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (newPage:number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for an user..." />
        <Link href="/admin/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Rank</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src="/noavatar.png"
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  <div className={styles.userName}>{user.name}</div>
                </div>
              </td>
              <td>
                <div className={styles.userEmail}>{user.email}</div>
              </td>
              <td>{user.createdAt}</td>
              <td>
                <span
                  className={`${styles.status} ${
                    styles[user.rank.toLowerCase()]
                  }`}
                >
                  {user.rank}
                </span>
              </td>
              <td>
                <span className={`${styles.status} ${styles[user.status]}`}>
                  {user.status}
                </span>
              </td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/admin/users/${user.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <button className={`${styles.button} ${styles.delete}`}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(users.length / usersPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UsersPage;
