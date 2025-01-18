"use client";
import { fetchUserData } from "@/shared/state/authSlice";
import { AppDispatch, RootState } from "@/shared/state/store";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Test() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, user, error } = useSelector(
    (state: RootState) => state.auth
  );
  useEffect(() => {
    // Kiểm tra token trước khi gọi API
    dispatch(fetchUserData());
  }, [dispatch]); // Chỉ gọi fetchUserData khi token và user thay đổi

  if (loading) return <p>Loading...</p>;
  // Hiển thị lỗi nếu có
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <Link href="/authentication">authentication</Link>
      <h1>Welcome, {user?.name}</h1>
      <p>Email: {user?.email}</p>
    </div>
  );
}
