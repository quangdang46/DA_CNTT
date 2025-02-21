import { SearchCheck } from "lucide-react";
import styles from "./search.module.css";
interface Props {
  placeholder: string;
}
const Search = ({ placeholder }: Props) => {
  return (
    <div className={styles.container}>
      <SearchCheck />
      <input type="text" placeholder={placeholder} className={styles.search_input} />
    </div>
  );
};

export default Search;
