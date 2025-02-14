/**
 * Represents all the possible database-related error codes.
 */
export declare enum DbErrorCode {
    AUTHENTICATION_FAILED = "AUTHENTICATION_FAILED",
    CONNECTION_REFUSED = "CONNECTION_REFUSED",
    CONNECTION_TIMEOUT = "CONNECTION_TIMEOUT",
    DATABASE_NOT_FOUND = "DATABASE_NOT_FOUND",
    DATABASE_EXISTS = "DATABASE_EXISTS",
    ACCESS_DENIED = "ACCESS_DENIED",
    TLS_CONNECTION_ERROR = "TLS_CONNECTION_ERROR",
    INVALID_SCHEMA = "INVALID_SCHEMA",
    INVALID_DATABASE_STRING = "INVALID_DATABASE_STRING",
    MISSING_UNDERLYING_RESOURCE = "MISSING_UNDERLYING_RESOURCE",
    UNSUPPORTED_FEATURES = "UNSUPPORTED_FEATURES",
    INCORRECT_PARAMETERS = "INCORRECT_PARAMETERS",
    CONNECTION_CLOSED = "CONNECTION_CLOSED",
    VALUE_TOO_LONG = "VALUE_TOO_LONG",
    RECORD_NOT_FOUND = "RECORD_NOT_FOUND",
    UNIQUE_CONSTRAINT_VIOLATION = "UNIQUE_CONSTRAINT_VIOLATION",
    FOREIGN_KEY_CONSTRAINT_VIOLATION = "FOREIGN_KEY_CONSTRAINT_VIOLATION",
    CONSTRAINT_FAILED = "CONSTRAINT_FAILED",
    INVALID_FIELD_VALUE = "INVALID_FIELD_VALUE",
    DATA_VALIDATION_ERROR = "DATA_VALIDATION_ERROR",
    QUERY_PARSING_ERROR = "QUERY_PARSING_ERROR",
    QUERY_VALIDATION_ERROR = "QUERY_VALIDATION_ERROR",
    RAW_QUERY_FAILED = "RAW_QUERY_FAILED",
    NULL_CONSTRAINT_VIOLATION = "NULL_CONSTRAINT_VIOLATION",
    REQUIRED_VALUE_MISSING = "REQUIRED_VALUE_MISSING",
    REQUIRED_ARGUMENT_MISSING = "REQUIRED_ARGUMENT_MISSING",
    REQUIRED_RELATION_VIOLATION = "REQUIRED_RELATION_VIOLATION",
    RELATED_RECORD_NOT_FOUND = "RELATED_RECORD_NOT_FOUND",
    QUERY_INTERPRETATION_ERROR = "QUERY_INTERPRETATION_ERROR",
    DISCONNECTED_RECORDS = "DISCONNECTED_RECORDS",
    REQUIRED_CONNECTED_RECORDS_MISSING = "REQUIRED_CONNECTED_RECORDS_MISSING",
    INPUT_ERROR = "INPUT_ERROR",
    VALUE_OUT_OF_RANGE = "VALUE_OUT_OF_RANGE",
    TABLE_NOT_FOUND = "TABLE_NOT_FOUND",
    COLUMN_NOT_FOUND = "COLUMN_NOT_FOUND",
    INCONSISTENT_COLUMN_DATA = "INCONSISTENT_COLUMN_DATA",
    CONNECTION_POOL_TIMEOUT = "CONNECTION_POOL_TIMEOUT",
    DEPENDENCY_RECORD_NOT_FOUND = "DEPENDENCY_RECORD_NOT_FOUND",
    UNSUPPORTED_DATABASE_FEATURE = "UNSUPPORTED_DATABASE_FEATURE",
    DATABASE_ERRORS_DURING_EXECUTION = "DATABASE_ERRORS_DURING_EXECUTION",
    TRANSACTION_API_ERROR = "TRANSACTION_API_ERROR",
    QUERY_PARAMETER_LIMIT_EXCEEDED = "QUERY_PARAMETER_LIMIT_EXCEEDED",
    MISSING_FULLTEXT_INDEX = "MISSING_FULLTEXT_INDEX",
    MONGODB_REPLICA_SET_REQUIRED = "MONGODB_REPLICA_SET_REQUIRED",
    INTEGER_OVERFLOW = "INTEGER_OVERFLOW",
    WRITE_CONFLICT = "WRITE_CONFLICT",
    ASSERTION_VIOLATION = "ASSERTION_VIOLATION",
    EXTERNAL_CONNECTOR_ERROR = "EXTERNAL_CONNECTOR_ERROR",
    TOO_MANY_CONNECTIONS = "TOO_MANY_CONNECTIONS",
    UNKNOWN = "UNKNOWN"
}
