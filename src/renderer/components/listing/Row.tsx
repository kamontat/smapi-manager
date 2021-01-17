import tw from "twin.macro";

const Row = tw.div`
  grid grid-cols-12 gap-4
  px-4 py-3 mx-4 mt-4

  bg-white rounded-lg shadow-sm
  transition transform duration-500 ease-in-out
  hover:shadow-xl hover:-translate-y-1
`;

export default Row;
