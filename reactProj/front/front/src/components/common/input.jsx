const Input = ({ label = "", error, name, ...rest }) => {
  return (
    <div>
      <div className="form-group my-1 fs-4">
        <label htmlFor={name}>
          {label}
          {rest.required && <span className="text-danger">*</span>}
        </label>
        <input
          {...rest}
          id={name}
          className={[
            "form-control border border-secondary w-50 ",
            error && "is-invalid ",
          ]
            .filter(Boolean)
            .join(" ")}
        />
        <span className="invalid-feedback fs-5">{error}</span>
      </div>
    </div>
  );
};

export default Input;
