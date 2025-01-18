import { UnmeshedClient } from '@unmeshed/sdk';

const unmeshedClient = new UnmeshedClient({
    baseUrl: 'http://localhost',
    port: 8080,
    authToken: 'iBPNno0dOpJ74bBy64l5',
    clientId: '0d368ea2-7ed7-4fc6-8506-d5d5115fce55'
});

const workerFunction = async (input) => {
    return {
        ...input || {},
        "ranAt": new Date() // Add the current timestamp to the output 🕒
    };
};

const worker = {
    worker: workerFunction,
    namespace: 'default',
    name: 'test-node-worker',
    maxInProgress: 500
};

unmeshedClient.startPolling([worker]);

const request = {
    namespace: 'default',
    name: 'testing',
    version: null,
    requestId: 'my-id-1',
    correlationId: 'my-crid-1',
    input: {
        "mykey": "value",
        "mykeyNumber": 100,
        "mykeyBoolean": true
    }
};

const processData = await unmeshedClient.runProcessSync(request);
console.log("Output: ", processData);

const pd = await unmeshedClient.getProcessData(processData.processId, true);
console.log("Output of process including steps ", pd);

const pdWithoutSteps = await unmeshedClient.getProcessData(processData.processId, false);
console.log("Output of process without steps ", pdWithoutSteps);

const stepData = await unmeshedClient.getStepData(pd.steps[0].id);
console.log("Output of the first step in process ", stepData);

const processIds = [1, 2, 3];
const reason = "Terminating due to policy changes";
const bulkTerminateOutput = await unmeshedClient.bulkTerminate(processIds, reason);
console.log("Output of the bulk terminate action ", bulkTerminateOutput);

const bulkResumeOutput = await unmeshedClient.bulkResume(processIds);
console.log("Output of the bulk resume action ", bulkResumeOutput);

const bulkReviewedOutput = await unmeshedClient.bulkReviewed(processIds, reason);
console.log("Output of the bulk reviewed action ", bulkReviewedOutput);

const rerun = await unmeshedClient.reRun(processData.processId);
console.log("Output of the rerun action ", rerun);
