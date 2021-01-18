interface Value {
  modDirectory: string;
  recursiveLimit: number;
  nexusmodsApiKey: string;
}

type ValueKey = keyof Value;

export default Value;
export { ValueKey };
