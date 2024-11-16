export type Result<T> =
  | { success: true; warning?: string; data: T } // For successful outcomes
  | { success: false; error: string }; // For errors
