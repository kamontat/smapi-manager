import { MutableRefObject, useEffect, useRef } from "react";

interface Dimension {
  width: number;
  height: number;
}

export const useDimensions = (ref: MutableRefObject<HTMLDivElement>): Dimension => {
  const dimensions = useRef<Dimension>({ width: 0, height: 0 });

  useEffect(() => {
    dimensions.current.width = ref.current.offsetWidth;
    dimensions.current.height = ref.current.offsetHeight;
  }, []);

  return dimensions.current;
};
