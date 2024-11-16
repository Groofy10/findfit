const AddButton = ({ onClick }) => {
  return (
    <button
      className="w-1/4 py-2 mt-3 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      onClick={onClick}
      type="button"
    >
      Add More
    </button>
  );
};

export default AddButton;
