import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (value: string) => void;
  value: string;
}

function SearchBox({ onSearch, value }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}

export default SearchBox;
