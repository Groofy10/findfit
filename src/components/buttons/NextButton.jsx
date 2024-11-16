const NextButton = ({ clickNext }) => {
  return (
    <button
      className="w-1/2 py-2 mt-3 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      onClick={clickNext}
      type="button"
    >
      Next
    </button>
  );
};

export default NextButton;