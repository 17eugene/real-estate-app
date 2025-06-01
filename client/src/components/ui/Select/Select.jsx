const Select = ({ defaultValue, name, optionsList }) => {
  return (
    <select name={name}>
      <option disabled>{defaultValue}</option>
      {optionsList.length > 0 &&
        optionsList.map((option) => (
          <option
            key={name === "region" ? option.AreasCenter : option.id}
            value={name === "region" ? option.Description : option.value}
          >
            {name === "region" ? option.Description : option.value}
          </option>
        ))}
    </select>
  );
};

export default Select;
