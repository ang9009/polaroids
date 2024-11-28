import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { DbError } from "shared/src/error-codes/dbError";

/**
 * Maps prisma errors to their respective DbErrorCodes.
 * @param prismaError the Prisma error in question
 * @returns the corresponding DbErrorCode
 */
function getDbErrCodeFromPrismaErr(prismaError: PrismaClientKnownRequestError): DbError {
  const prismaErrorCode = prismaError.code;

  switch (prismaErrorCode) {
    case "P1000":
      return DbError.AUTHENTICATION_FAILED;
    case "P1001":
      return DbError.CONNECTION_REFUSED;
    case "P1002":
      return DbError.CONNECTION_TIMEOUT;
    case "P1003":
      return DbError.DATABASE_NOT_FOUND;
    case "P1008":
      return DbError.CONNECTION_POOL_TIMEOUT;
    case "P1009":
      return DbError.DATABASE_EXISTS;
    case "P1010":
      return DbError.ACCESS_DENIED;
    case "P1011":
      return DbError.TLS_CONNECTION_ERROR;
    case "P1012":
      return DbError.INVALID_SCHEMA;
    case "P1013":
      return DbError.INVALID_DATABASE_STRING;
    case "P1014":
      return DbError.MISSING_UNDERLYING_RESOURCE;
    case "P1015":
      return DbError.UNSUPPORTED_FEATURES;
    case "P1016":
      return DbError.INCORRECT_PARAMETERS;
    case "P1017":
      return DbError.CONNECTION_CLOSED;
    case "P2000":
      return DbError.VALUE_TOO_LONG;
    case "P2001":
      return DbError.RECORD_NOT_FOUND;
    case "P2002":
      return DbError.UNIQUE_CONSTRAINT_VIOLATION;
    case "P2003":
      return DbError.FOREIGN_KEY_CONSTRAINT_VIOLATION;
    case "P2004":
      return DbError.CONSTRAINT_FAILED;
    case "P2005":
      return DbError.INVALID_FIELD_VALUE;
    case "P2006":
      return DbError.DATA_VALIDATION_ERROR;
    case "P2007":
      return DbError.DATA_VALIDATION_ERROR;
    case "P2008":
      return DbError.QUERY_PARSING_ERROR;
    case "P2009":
      return DbError.QUERY_VALIDATION_ERROR;
    case "P2010":
      return DbError.RAW_QUERY_FAILED;
    case "P2011":
      return DbError.NULL_CONSTRAINT_VIOLATION;
    case "P2012":
      return DbError.REQUIRED_VALUE_MISSING;
    case "P2013":
      return DbError.REQUIRED_ARGUMENT_MISSING;
    case "P2014":
      return DbError.REQUIRED_RELATION_VIOLATION;
    case "P2015":
      return DbError.RELATED_RECORD_NOT_FOUND;
    case "P2016":
      return DbError.QUERY_INTERPRETATION_ERROR;
    case "P2017":
      return DbError.DISCONNECTED_RECORDS;
    case "P2018":
      return DbError.REQUIRED_CONNECTED_RECORDS_MISSING;
    case "P2019":
      return DbError.INPUT_ERROR;
    case "P2020":
      return DbError.VALUE_OUT_OF_RANGE;
    case "P2021":
      return DbError.TABLE_NOT_FOUND;
    case "P2022":
      return DbError.COLUMN_NOT_FOUND;
    case "P2023":
      return DbError.INCONSISTENT_COLUMN_DATA;
    case "P2024":
      return DbError.CONNECTION_POOL_TIMEOUT;
    case "P2025":
      return DbError.DEPENDENCY_RECORD_NOT_FOUND;
    case "P2026":
      return DbError.UNSUPPORTED_DATABASE_FEATURE;
    case "P2027":
      return DbError.DATABASE_ERRORS_DURING_EXECUTION;
    case "P2028":
      return DbError.TRANSACTION_API_ERROR;
    case "P2029":
      return DbError.QUERY_PARAMETER_LIMIT_EXCEEDED;
    case "P2030":
      return DbError.MISSING_FULLTEXT_INDEX;
    case "P2031":
      return DbError.MONGODB_REPLICA_SET_REQUIRED;
    case "P2033":
      return DbError.INTEGER_OVERFLOW;
    case "P2034":
      return DbError.WRITE_CONFLICT;
    case "P2035":
      return DbError.ASSERTION_VIOLATION;
    case "P2036":
      return DbError.EXTERNAL_CONNECTOR_ERROR;
    case "P2037":
      return DbError.TOO_MANY_CONNECTIONS;
    default:
      return DbError.UNKNOWN;
  }
}

export default getDbErrCodeFromPrismaErr;
