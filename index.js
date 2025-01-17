
import "dotenv/config";
import { ArithmeticOperation } from "./workers/ArithmeticWorker.js";
import {UnmeshedClient} from '@unmeshed/sdk'


console.log(UnmeshedClient)

const BASE_URL = process.env.UNMESHED_BASE_URL;
const PORT = process.env.UNMESHED_PORT;
const ClIENT_ID = process.env.UNMESHED_CLIENT_ID;
const AUTH_TOKEN = process.env.UNMESHED_AUTH_TOKEN;

UnmeshedClient.initialize({
  baseUrl: BASE_URL,
  port: PORT,
  clientId: ClIENT_ID,
  authToken: AUTH_TOKEN,
});

const request = {
  name: "sample-http",
  namespace: "default",
  input: {},
  correlationId: "",
  requestId: "",
  version: 1,
};
const workers = [
  {
    worker: (input) => ArithmeticOperation(input),
    namespace: "default",
    name: "arithmetic_operation_worker",
    maxInProgress: 10,
  },
];
UnmeshedClient.pollForWorkers(workers);

const processId = 28878569;
const stepId = 28878571;
const processIds = [34, 344];
const clientId = "jdjfjf";
const endpoint = "your-endpoint";
const input = { key: "value" };
const id = "12345";
const apiCallType = ApiCallType.SYNC;

const params = {
  startTimeEpoch: 1673606400000,
  endTimeEpoch: 1673692800000,
  namespace: "default",
  processTypes: [ProcessType.STANDARD],
  triggerTypes: [ProcessTriggerType.MANUAL],
  names: ["process1", "process2", "process3"],
  processIds: [28883174, 28883162],
  correlationIds: ["correlationId1", "correlationId2"],
  requestIds: ["requestId1", "requestId2"],
  statuses: [ProcessStatus.COMPLETED],
  limit: 10,
  offset: 0,
};

// UnmeshedClient.getStepData(stepId)
//   .then((stepData) => {
//     console.log("STEP_DATA", stepData);
//   })
//   .catch((error) => {
//     console.error("Error fetching step data:", error.message);
//   });

// UnmeshedClient.rerun(processId, ClIENT_ID)
//   .then((data) => {
//     console.log("PROCESS_DATA", data);
//   })
//   .catch((error) => {
//     console.error("Error fetching step data:", error.message);
//   });

// UnmeshedClient.bulkTerminate(processIds)
//   .then((data) => {
//     console.log("PROCESS_DATA", data);
//   })
//   .catch((error) => {
//     console.error("Error fetching step data:", error.message);
//   });
