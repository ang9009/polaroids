import { AxiosRequestHeaders, AxiosResponse } from "axios";
import { expect, test } from "vitest";
import { FileStationAuthDataSchema } from "../types/response-schemas/FileStationAuthRes";
import { FileStationResponse } from "../types/response-schemas/FileStationResponse";
import { validateFSResponse } from "../utils/validateFSResponse";

test("validateFSResponse returns expected object", () => {
  const fsResponse: FileStationResponse = {
    success: true,
    data: {
      sid: "sessionId",
    },
  };
  const axiosRes: AxiosResponse = {
    status: 200,
    statusText: "OK",
    data: fsResponse,
    headers: {},
    config: {
      headers: {} as AxiosRequestHeaders,
    },
  };
  const res = validateFSResponse(axiosRes, FileStationAuthDataSchema);

  expect(res).toStrictEqual(fsResponse.data);
});

test("validateFSResponse throws error for unexpected response shape", () => {
  const fsResponse = {
    weird: "shape",
  };
  const axiosRes: AxiosResponse = {
    status: 200,
    statusText: "OK",
    data: fsResponse,
    headers: {},
    config: {
      headers: {} as AxiosRequestHeaders,
    },
  };

  expect(() => validateFSResponse(axiosRes, FileStationAuthDataSchema)).toThrowError();
});

test("validateFSResponse throws error for failed FileStation request", () => {
  const fsResponse: FileStationResponse = {
    success: false,
    error: {
      code: 106,
    },
  };
  const axiosRes: AxiosResponse = {
    status: 200,
    statusText: "OK",
    data: fsResponse,
    headers: {},
    config: {
      headers: {} as AxiosRequestHeaders,
    },
  };

  expect(() => validateFSResponse(axiosRes, FileStationAuthDataSchema)).toThrowError(
    "FileStation request failed. Error code: 106"
  );
});

test("validateFSResponse throws error for unexpected data property shape", () => {
  const fsResponse: FileStationResponse = {
    success: true,
    data: {
      notSessionId: "asdfasdf",
    },
  };
  const axiosRes: AxiosResponse = {
    status: 200,
    statusText: "OK",
    data: fsResponse,
    headers: {},
    config: {
      headers: {} as AxiosRequestHeaders,
    },
  };

  expect(() => validateFSResponse(axiosRes, FileStationAuthDataSchema)).toThrowError(
    'Request was successful, but got unexpected data property shape: {"notSessionId":"asdfasdf"}'
  );
});
