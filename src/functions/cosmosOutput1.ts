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
    context.extraOutputs.set(cosmosOutput, {
        id: `${queueItem.name}-${queueItem.employeeId}`,
        name: queueItem.name,
        employeeId: queueItem.employeeId,
        address: queueItem.address,
    });
}

app.storageQueue('storageQueueTrigger1', {
    queueName: 'inputqueue',
    connection: 'MyStorageConnectionAppSetting',
    extraOutputs: [cosmosOutput],
    handler: storageQueueTrigger1,
});
