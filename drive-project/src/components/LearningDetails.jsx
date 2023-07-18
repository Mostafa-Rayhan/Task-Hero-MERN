import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const LearningDetails = ({ learn }) => {
  const separatedArray = learn.split("*").map((item) => item.trim());
  return (
    <div>
      <div className=" mt-4 border-2 border-black-700 p-4">
        <div className="flex justify-around">
          <h2 className="text-4xl my-6 mb-8  font-semibold underline text-[#1976D2] ">
            What You'll learn
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2  mt-4 gap-4 ">
          {separatedArray?.map((s) => {
            return (
              <div className="flex  gap-1 " key={s}>
                <CheckCircleOutlineIcon style={{ color: "#1976D2" }} />
                <p>
                  {s}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LearningDetails;
