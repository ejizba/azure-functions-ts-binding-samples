import { app, HttpRequest, HttpResponseInit, InvocationContext, output } from '@azure/functions';

const queueOutput = output.storageQueue({
    queueName: 'outqueue',
    connection: 'MyStorageConnectionAppSetting',
});

export async function httpTrigger1(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.extraOutputs.set(queueOutput, ['message 1', 'message 2']);
    return { body: 'Created queue item.' };
}

app.http('httpTrigger1', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    extraOutputs: [queueOutput],
    handler: httpTrigger1,
});
