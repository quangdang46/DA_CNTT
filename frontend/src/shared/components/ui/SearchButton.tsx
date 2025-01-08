import Search from '@/shared/components/icons/Search';
import React from 'react'
import { Button, FormControl } from 'react-bootstrap';

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
        <Search></Search>
        <span className="search-btn">Search</span>
      </Button>
    </div>
  );
}
