import { Search } from "lucide-react";
import React from "react";

export default function SearchButton() {
  return (
    <div className="input-group-btn">
      <input
        type="hidden"
        id="search-param"
        name="post_type"
        defaultValue="product"
      />
      <button type="submit" className="btn btn-primary">
        <Search strokeWidth={1} />
        <span className="search-btn">Search</span>
      </button>
    </div>
  );
}
