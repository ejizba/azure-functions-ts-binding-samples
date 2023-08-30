import { app, InvocationContext, output } from '@azure/functions';

const cosmosOutput = output.cosmosDB({
    databaseName: 'MyDatabase',
    collectionName: 'MyCollection',
    createIfNotExists: true,
    connectionStringSetting: 'MyAccount_COSMOSDB',
});

interface MyQueueItem {
    name: string;
    employeeId: string;
    address: string;
}

export async function storageQueueTrigger1(queueItem: MyQueueItem, context: InvocationContext): Promise<void> {
    context.extraOutputs.set(cosmosOutput, [
        {
            id: 'John Henry-123456',
            name: 'John Henry',
            employeeId: '123456',
            address: 'A town nearby',
        },
        {
            id: 'John Doe-123457',
            name: 'John Doe',
            employeeId: '123457',
            address: 'A town far away',
        },
    ]);
}

app.storageQueue('storageQueueTrigger1', {
    queueName: 'inputqueue',
    connection: 'MyStorageConnectionAppSetting',
    extraOutputs: [cosmosOutput],
    handler: storageQueueTrigger1,
});
