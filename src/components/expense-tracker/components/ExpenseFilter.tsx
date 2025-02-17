import categories from "../categories";

interface Props {
  onSelectCategory: (category: string) => void;
}

const ExpenseFilter = ({ onSelectCategory }: Props) => {
  return (
    <select
      className="form-select"
      onChange={(e) => onSelectCategory(e.target.value)}
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
      {/* <option value="Groceries">Groceries</option>
      <option value="Utilities">Utilities</option>
      <option value="Entertaiment">Entertaiment</option> */}
    </select>
  );
};

export default ExpenseFilter;
