import ProcessorType from "@common/constants/processor-type";

interface Checker<T> {
  origin?: ProcessorType;
  type?: string[];
  subtype?: string[];
  callback: T;
}

export default Checker;
