const DeleteUserConfirmation = ({
  selectedData,
  handleDeleteUser,
  setIsOpen,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md">
        <p className="text-lg font-semibold">
          Are you sure you want to delete the user?
        </p>
        <h2 className="mb-4">
          {selectedData.firstName + " " + selectedData.lastName}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md"
            onClick={handleDeleteUser}
          >
            Confirm
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserConfirmation;
