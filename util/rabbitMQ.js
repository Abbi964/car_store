import amqp from 'amqplib';
import sendEmail from './sendEmail.js';

async function connectQueue (){
    try{
        // making a connection
        const connection = await amqp.connect('amqp://localhost');
        // making a channel 
        const channel = await connection.createChannel()
        
        await channel.assertQueue("email-queue")

        // Now consuming from queue
        channel.consume('email-queue',async(data)=>{
            try {
                // parsing data
                let appointmentData = JSON.parse(Buffer.from(data.content));
                // sending email
                await sendEmail(appointmentData)

                channel.ack(data)
            } catch (err) {
                console.log(err);
                // rejecting data
                channel.reject(data,false)
            }
        })
    }
    catch(err){
        console.log(err)
    }
}

export async function publishToQueue(message){
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        
        // Assert the queue
        await channel.assertQueue("email-queue");

        // Send message to the queue
        channel.sendToQueue("email-queue", Buffer.from(JSON.stringify(message)));
        
        console.log("Message sent to RabbitMQ queue:");
        
        // Close connection
        await channel.close();
        await connection.close();
    } catch (err) {
        console.error("Error publishing message to RabbitMQ:", err);
    }
}

export default connectQueue;