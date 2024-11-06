import { NextFunction } from "express";
declare const handleDbException: (err: unknown, next: NextFunction) => void;
export default handleDbException;
