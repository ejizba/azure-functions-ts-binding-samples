import { app, InvocationContext, output, Timer } from '@azure/functions';

export async function timerTrigger1(myTimer: Timer, context: InvocationContext): Promise<string[]> {
    const timeStamp = new Date().toISOString();
    const message = `Message created at: ${timeStamp}`;
    return [`1: ${message}`, `2: ${message}`];
}

app.timer('timerTrigger1', {
    schedule: '0 */5 * * * *',
    return: output.serviceBusQueue({
        queueName: 'testqueue',
        connection: 'MyServiceBusConnection',
    }),
    handler: timerTrigger1,
});
