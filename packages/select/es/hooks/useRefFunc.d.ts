export default function useRefFunc<T extends (...args: any[]) => any>(callback: T): T;
