import { DbErrorCode } from "shared/src/error-codes/dbErrorCode";
/**
 * Returns the corresponding DbErrorCode given an error code.
 * @param prismaError the Prisma Client error from a failed database request
 * @returns the corresponding DbErrorCode
 */
function getDbErrorType(prismaError) {
    const prismaErrorCode = prismaError.code;
    switch (prismaErrorCode) {
        case "P1000":
            return DbErrorCode.AUTHENTICATION_FAILED;
        case "P1001":
            return DbErrorCode.CONNECTION_REFUSED;
        case "P1002":
            return DbErrorCode.CONNECTION_TIMEOUT;
        case "P1003":
            return DbErrorCode.DATABASE_NOT_FOUND;
        case "P1008":
            return DbErrorCode.CONNECTION_POOL_TIMEOUT;
        case "P1009":
            return DbErrorCode.DATABASE_EXISTS;
        case "P1010":
            return DbErrorCode.ACCESS_DENIED;
        case "P1011":
            return DbErrorCode.TLS_CONNECTION_ERROR;
        case "P1012":
            return DbErrorCode.INVALID_SCHEMA;
        case "P1013":
            return DbErrorCode.INVALID_DATABASE_STRING;
        case "P1014":
            return DbErrorCode.MISSING_UNDERLYING_RESOURCE;
        case "P1015":
            return DbErrorCode.UNSUPPORTED_FEATURES;
        case "P1016":
            return DbErrorCode.INCORRECT_PARAMETERS;
        case "P1017":
            return DbErrorCode.CONNECTION_CLOSED;
        case "P2000":
            return DbErrorCode.VALUE_TOO_LONG;
        case "P2001":
            return DbErrorCode.RECORD_NOT_FOUND;
        case "P2002":
            return DbErrorCode.UNIQUE_CONSTRAINT_VIOLATION;
        case "P2003":
            return DbErrorCode.FOREIGN_KEY_CONSTRAINT_VIOLATION;
        case "P2004":
            return DbErrorCode.CONSTRAINT_FAILED;
        case "P2005":
            return DbErrorCode.INVALID_FIELD_VALUE;
        case "P2006":
            return DbErrorCode.DATA_VALIDATION_ERROR;
        case "P2007":
            return DbErrorCode.DATA_VALIDATION_ERROR;
        case "P2008":
            return DbErrorCode.QUERY_PARSING_ERROR;
        case "P2009":
            return DbErrorCode.QUERY_VALIDATION_ERROR;
        case "P2010":
            return DbErrorCode.RAW_QUERY_FAILED;
        case "P2011":
            return DbErrorCode.NULL_CONSTRAINT_VIOLATION;
        case "P2012":
            return DbErrorCode.REQUIRED_VALUE_MISSING;
        case "P2013":
            return DbErrorCode.REQUIRED_ARGUMENT_MISSING;
        case "P2014":
            return DbErrorCode.REQUIRED_RELATION_VIOLATION;
        case "P2015":
            return DbErrorCode.RELATED_RECORD_NOT_FOUND;
        case "P2016":
            return DbErrorCode.QUERY_INTERPRETATION_ERROR;
        case "P2017":
            return DbErrorCode.DISCONNECTED_RECORDS;
        case "P2018":
            return DbErrorCode.REQUIRED_CONNECTED_RECORDS_MISSING;
        case "P2019":
            return DbErrorCode.INPUT_ERROR;
        case "P2020":
            return DbErrorCode.VALUE_OUT_OF_RANGE;
        case "P2021":
            return DbErrorCode.TABLE_NOT_FOUND;
        case "P2022":
            return DbErrorCode.COLUMN_NOT_FOUND;
        case "P2023":
            return DbErrorCode.INCONSISTENT_COLUMN_DATA;
        case "P2024":
            return DbErrorCode.CONNECTION_POOL_TIMEOUT;
        case "P2025":
            return DbErrorCode.DEPENDENCY_RECORD_NOT_FOUND;
        case "P2026":
            return DbErrorCode.UNSUPPORTED_DATABASE_FEATURE;
        case "P2027":
            return DbErrorCode.DATABASE_ERRORS_DURING_EXECUTION;
        case "P2028":
            return DbErrorCode.TRANSACTION_API_ERROR;
        case "P2029":
            return DbErrorCode.QUERY_PARAMETER_LIMIT_EXCEEDED;
        case "P2030":
            return DbErrorCode.MISSING_FULLTEXT_INDEX;
        case "P2031":
            return DbErrorCode.MONGODB_REPLICA_SET_REQUIRED;
        case "P2033":
            return DbErrorCode.INTEGER_OVERFLOW;
        case "P2034":
            return DbErrorCode.WRITE_CONFLICT;
        case "P2035":
            return DbErrorCode.ASSERTION_VIOLATION;
        case "P2036":
            return DbErrorCode.EXTERNAL_CONNECTOR_ERROR;
        case "P2037":
            return DbErrorCode.TOO_MANY_CONNECTIONS;
        default:
            return DbErrorCode.UNKNOWN;
    }
}
export default getDbErrorType;
