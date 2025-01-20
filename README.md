# Unmeshed JavaScript SDK Example

This README will guide you through setting up Unmeshed credentials, running workers, and using the Unmeshed SDK with JavaScript. Read more about Unmeshed on [https://unmeshed.io/](https://unmeshed.io/).

---

## About Unmeshed

Unmeshed is a ⚡ fast, low-latency orchestration platform that helps you build 🛠️, run 🏃, and scale 📈 API and microservices orchestration, scheduled jobs ⏰, and more with ease. Learn more on our [🌍 main website](https://unmeshed.io) or explore the [📖 documentation overview](https://unmeshed.io/docs/concepts/overview).

Unmeshed is built by the ex-founders of Netflix Conductor. This next-gen platform is blazing fast and covers many more use cases.

---

## Installing the Unmeshed SDK

To use Unmeshed in your JavaScript project, install the SDK using your preferred package manager:

### Using npm:

```bash
npm install @unmeshed/sdk
```

### Using Yarn:

```bash
yarn add @unmeshed/sdk
```

---

## Setting Up Unmeshed Credentials

To initialize the `UnmeshedClient` with your credentials, use the following code snippet. Replace the placeholder values with your actual credentials:

```javascript
const { UnmeshedClient } = require('@unmeshed/sdk');

const unmeshedClient = new UnmeshedClient({
    baseUrl: 'http://localhost', // Replace with your Unmeshed API endpoint 🌐
    port: 8080,                 // Replace with your Unmeshed API port 🚪
    authToken: 'your-auth-token', // Replace with your API 🔒 auth token
    clientId: 'your-client-id'    // Replace with your API 🆔 client ID
});
```

> **Note:** Do not expose these credentials in a browser 🌐. For browser implementations, use webhooks and user tokens 🔑 directly.

---

## Running a Worker

A worker in Unmeshed processes 🌀 tasks asynchronously based on workflows or process definitions. Below is an example of defining and starting a worker:

### Step 1: Define a Worker Function

A worker function processes incoming tasks and returns an output:

```javascript
const workerFunction = async (input) => {
    return {
        ...input || {},
        "ranAt": new Date() // Add the current timestamp to the output 🕒
    };
};
```

### Step 2: Register the Worker

Define the worker configuration and register it with the `UnmeshedClient`:

```javascript
const worker = {
    worker: workerFunction,
    namespace: 'default', // Namespace for the worker 🗂️
    name: 'test-node-worker', // Unique name for the worker 🏷️
    maxInProgress: 500 // Maximum number of in-progress tasks ⏳
};

unmeshedClient.startPolling([worker]);
```

> The `startPolling` method starts the worker to listen 👂 for tasks continuously.

### Step 3: Start Your Application

When you run your JavaScript app, the worker will automatically start polling for tasks 🤖.

---

## APIs in the SDK

### Start a Process / Workflow - Synchronously

```javascript
const request = {
    namespace: `default`,
    name: `testing`,
    version: null, // null = latest, specify a version if required
    requestId: `my-id-1`, // Your id (Optional)
    correlationId: `my-crid-1`, // Your correlation id (Optional)
    input: {  // Inputs to your process
        "mykey": "value",
        "mykeyNumber": 100,
        "mykeyBoolean": true
    }
};

const processData = await unmeshedClient.runProcessSync(request);
console.log("Output: ", processData);
```

### Fetch Process Data

```javascript
const pd = await unmeshedClient.getProcessData(processData.processId, true);
console.log("Output of process including steps ", pd);

const pdWithoutSteps = await unmeshedClient.getProcessData(processData.processId, false);
console.log("Output of process without steps ", pdWithoutSteps);
```

### Fetch Step Data

```javascript
const stepData = await unmeshedClient.getStepData(pd.steps[0].id);
console.log("Output of the first step in process ", stepData);
```

### Bulk Terminate Running Processes

```javascript
const processIds = [1, 2, 3];
const reason = "Terminating due to policy changes";
const bulkTerminateOutput = await unmeshedClient.bulkTerminate(processIds, reason);

console.log("Output of the bulk terminate action ", bulkTerminateOutput);
```

### Bulk Resume Failed or Terminated Processes

```javascript
const bulkResumeOutput = await unmeshedClient.bulkResume(processIds);
console.log("Output of the bulk resume action ", bulkResumeOutput);
```

### Mark Processes as Reviewed

```javascript
const bulkReviewedOutput = await unmeshedClient.bulkReviewed(processIds, reason);
console.log("Output of the bulk review action ", bulkReviewedOutput);
```

### Rerun a Process

```javascript
const rerun = await unmeshedClient.reRun(processData.processId);
console.log("Output of the rerun action ", rerun);
```
### Search a Process

```typescript

const searchParams = {
  startTimeEpoch: 1737091430310, // Start time in epoch milliseconds
  endTimeEpoch: 0, // End time in epoch milliseconds (0 indicates no end time, Optional)
  namespace: "default", // Namespace for the search, (Optional)
  processTypes: ["STANDARD"], // Array of process types to filter by, (Optional)
  triggerTypes: ["MANUAL"], // Array of trigger types to filter by, (Optional)
  names: ["new_worker"], // Array of process names to search for, (Optional)
  processIds: [3200041], // Array of process IDs to filter by, (Optional)
  correlationIds: [""], // Array of correlation IDs (empty string for no specific correlation ID),(Optional)
  requestIds: ["34f1fc6c-a08e-4feb-82be-7d4b329f484b"], // Array of request IDs to filter by, (Optional)
  statuses: ["COMPLETED"], // Array of process statuses to filter by, (Optional)
  limit: 10, // Maximum number of results to return, (Optional)
  offset: 0, // Offset for pagination (starting point for results), (Optional)
};

const response = await unmeshedClient.searchProcessExecution(searchParams);
console.log(response);

```

---

## Other Example Applications

- [express-server-example](https://github.com/unmeshed/express-server-example)
- [javascript-sdk-example](https://github.com/unmeshed/javascript-sdk-example)

---

## Additional Resources

- **[📖 Workers Documentation](https://unmeshed.io/docs/concepts/workers):** Learn more about workers and how to use them effectively.
- **Use Case Highlights:**
    - [🌐 API Orchestration](https://unmeshed.io/docs/use-cases/api-orchestration)
    - [🧩 Microservices Orchestration](https://unmeshed.io/docs/use-cases/microservices-orchestration)
    - [⏰ Scheduled Jobs](https://unmeshed.io/docs/use-cases/scheduled-jobs)

For more details, visit our [📖 documentation](https://unmeshed.io/docs/concepts/overview). If you encounter issues, feel free to reach out or open an issue in this repository!
