import { app, InvocationContext, output, Timer } from '@azure/functions';

const eventGridOutput = output.eventGrid({
    topicEndpointUri: 'MyEventGridTopicUriSetting',
    topicKeySetting: 'MyEventGridTopicKeySetting',
});

export async function timerTrigger1(myTimer: Timer, context: InvocationContext): Promise<void> {
    const timeStamp = new Date().toISOString();
    context.extraOutputs.set(eventGridOutput, [
        {
            id: 'message-id',
            subject: 'subject-name',
            dataVersion: '1.0',
            eventType: 'event-type',
            data: 'event-data',
            eventTime: timeStamp,
        },
        {
            id: 'message-id-2',
            subject: 'subject-name',
            dataVersion: '1.0',
            eventType: 'event-type',
            data: 'event-data',
            eventTime: timeStamp,
        },
    ]);
}

app.timer('timerTrigger1', {
    schedule: '0 */5 * * * *',
    extraOutputs: [eventGridOutput],
    handler: timerTrigger1,
});
