import { Search } from "lucide-react";
import React from "react";
import { Button, FormControl } from "react-bootstrap";

export default function SearchButton() {
  return (
    <div className="input-group-btn">
      <FormControl
        type="hidden"
        id="search-param"
        name="post_type"
        value="product"
      />
      <Button type="submit" variant="primary">
        <Search strokeWidth={1} />
        <span className="search-btn">Search</span>
      </Button>
    </div>
  );
}
