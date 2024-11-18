/**
 * Represents an event that can be added by registerEvents.
 * @template T the argument type of the event's execute function
 */
interface EventData<T> {
  name: string;
  once: boolean;
  execute: (...args: T[]) => Promise<void>;
}

export { EventData };
