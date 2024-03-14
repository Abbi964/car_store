import SibApiV3Sdk  from 'sib-api-v3-sdk';

async function sendEmail(data){
    let  defaultClient = SibApiV3Sdk.ApiClient.instance;
    
    // Configureing API key authorization: api-key
    let  apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.SEND_IN_BLUE_API_KEY;
    
    // making an api instence
    let  tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi(); 
    
    const sender = {
        email: 'abhinavthapliyal964@gmail.com'
    }

    const receivers = [
        {
            email: data.email
        },
    ]
    
    // sending a tansactional email
    let result = await tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: 'you have booked an Appointment',
        htmlcontent: `<h2>Hi, ${data.name}</h2><p>This email is to inform you that you have booked an appointment with us for ${data.purpose} on ${data.date} at ${data.time} : 00 for 1 hour.</p>`
    })

    console.log("Email sent to ",data.email)

}

export default sendEmail;
