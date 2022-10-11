const Checkbox = ({ check, setChecker }) => {
  return (
    <div className="checkbox">
      <input
        className="checkbox-input"
        type="checkbox"
        id="aggregate-groups"
        name="aggregate-groups"
        defaultChecked={check}
        onClick={() => setChecker(!check)}
      />
      <label className="checkbox-label" htmlFor="aggregate-groups">
        Aggregate Groups
      </label>
    </div>
  );
};

export default Checkbox;
