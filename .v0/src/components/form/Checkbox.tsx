import tw from "twin.macro";

const CheckboxContainer = tw.div`
  flex items-center
`;

const Checkbox = tw.input`
  h-4 w-4 mr-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded
`;

export default Checkbox;
export { CheckboxContainer };
