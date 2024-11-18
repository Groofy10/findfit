const SubmitButton = ({
  onSubmit,
  label = "Submit",
  classname = "w-full",
  disabled = false,
}) => {
  return (
    <button
      className={`${classname} py-2 mt-3 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
      type="submit"
      onClick={onSubmit}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default SubmitButton;
