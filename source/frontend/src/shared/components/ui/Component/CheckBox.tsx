import React from "react";
import styles from "@/shared/style/CheckBox.module.css";

interface Props {
  name: string;
  label: string;
  val: boolean;
  setValue: (value: boolean) => void;
}
export default function CheckBox(props: Props) {
  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        name={props.name}
        checked={props.val}
        onChange={() => {
          props.setValue(!props.val);
        }}
      />
      {props.label}
    </label>
  );
}
