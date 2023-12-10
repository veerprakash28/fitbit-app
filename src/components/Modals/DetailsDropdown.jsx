const DetailsDropdown = ({ setIsDropdownOpen }) => {
  const handleDropdownItemClick = (option) => {
    let url;

    switch (option) {
      case "githubProfile":
        url = "https://github.com/veerprakash28";
        break;
      case "projectSource":
        url = "https://github.com/veerprakash28/fitbit-app";
        break;
      default:
        break;
    }

    if (url) {
      window.open(url, "_blank");
    }

    setIsDropdownOpen(false);
  };

  return (
    <div className="absolute mt-1 w-44 bottom-12  bg-white border rounded-md shadow-md z-10 text-black">
      <div
        className="p-2 cursor-pointer hover:bg-primary hover:text-white"
        onClick={() => handleDropdownItemClick("githubProfile")}
      >
        View Github Profile
      </div>
      <div
        className="p-2 cursor-pointer hover:bg-primary hover:text-white"
        onClick={() => handleDropdownItemClick("projectSource")}
      >
        View Source Code
      </div>
    </div>
  );
};

export default DetailsDropdown;
