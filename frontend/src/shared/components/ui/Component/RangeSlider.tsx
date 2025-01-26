"use client";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "@/shared/style/RangeSlider.module.css";
interface Props {
  min: number;
  max: number;
  value?: { min: number; max: number };
  step: number;
  onChange: (value: { min: number; max: number }) => void;
}

export default function RangeSlider({
  min,
  max,
  value,
  step,
  onChange,
}: Props) {
  const [minValue, setMinValue] = useState(value ? value.min : min);
  const [maxValue, setMaxValue] = useState(value ? value.max : max);
  useEffect(() => {
    if (value && (value.min !== minValue || value.max !== maxValue)) {
      setMinValue(value.min);
      setMaxValue(value.max);
    }
  }, [value, minValue, maxValue]);

  // useEffect(() => {
  //   if (value) {
  //     setMinValue(value.min);
  //     setMaxValue(value.max);
  //   }
  // }, [value]);

  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // console.log("handleMinChange", e.target.value);
    const newMinVal = Math.min(+e.target.value, maxValue - step);
    if (!value) setMinValue(newMinVal);
    onChange({ min: newMinVal, max: maxValue });
  };

  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // console.log("handleMaxChange", e.target.value);
    const newMaxVal = Math.max(+e.target.value, minValue + step);
    if (!value) setMaxValue(newMaxVal);
    onChange({ min: minValue, max: newMaxVal });
  };

  const minPos = ((minValue - min) / (max - min)) * 100;
  const maxPos = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className={styles.wrapper}>
      <div className={styles.input_wrapper}>
        <input
          className={styles.input}
          type="range"
          value={minValue}
          min={min}
          max={max}
          step={step}
          onChange={handleMinChange}
          aria-label="Min value"
        />
        <input
          className={styles.input}
          type="range"
          value={maxValue}
          min={min}
          max={max}
          step={step}
          onChange={handleMaxChange}
          aria-label="Max value"
        />
      </div>

      <div className={styles.control_wrapper}>
        <div className={styles.control} style={{ left: `${minPos}%` }} />
        <div className={styles.rail}>
          <div
            className={styles.inner_rail}
            style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
          />
        </div>
        <div className={styles.control} style={{ left: `${maxPos}%` }} />
      </div>
    </div>
  );
}
