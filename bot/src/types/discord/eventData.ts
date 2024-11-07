/**
 * Represents an event that can be added by registerEvents.
 */
interface EventData<T> {
  name: string;
  once: boolean;
  execute: (...args: T[]) => Promise<void>;
}

export { EventData };
