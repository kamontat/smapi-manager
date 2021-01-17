import ProcessorType from "@common/constants/processor-type";

export const getTypeFrom = (type: ProcessorType): ProcessorType => {
  switch (type) {
    case ProcessorType.PRELOAD:
      return ProcessorType.RENDERER;
    case ProcessorType.RENDERER:
      return ProcessorType.PRELOAD;
    default:
      return type;
  }
};
