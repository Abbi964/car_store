import Appointment from "../../model/appointment.js";
import authCheck from "../../util/authCheck.js";
import { publishToQueue } from "../../util/rabbitMQ.js";

const appointmentResolver = {
    Query : {
        //------------------------- getAppointments -----------------------------//
        async appointments(_,args,context){
            try{
                const user = await authCheck(context);

                if ( user.isAdmin){
                    // getting all theAppointment
                    let appointments = await Appointment.find();

                    return appointments
                }
            }
            catch(err){
                return [err]
            }
        },
        //------------------------- getAppointments -----------------------------//
        async appointment(_,args,context){
            try{
                const user = await authCheck(context);
                const id = args.id

                if ( user.isAdmin){
                    // getting all theAppointment
                    let appointment = await Appointment.findById(id);

                    return appointment
                }
            }
            catch(err){
                return [err]
            }
        },
        //---------------------- get Slots -------------------------------//
        async getSlots(_,args){
            try{
                // getting date string
                const date = args.date;

                // getting all the already appointed timesArr on that date
                let timeArr = await Appointment.find({date: date},{time : 1})

                console.log(timeArr)
                if (timeArr){
                    return timeArr
                }
                else{
                    throw new Error("Something went wrong")
                }
            }
            catch(err){
                return err
            }
        }
    },
    Mutation : {
        //---------------------- add Appointment--------------------------------//
        async addAppointment(_,args){
            try{
                // getting appointmentObj
                const appointmentObj = args.appointment;

                // creating
                let newAppointment = new Appointment(appointmentObj)
                await newAppointment.save()

                // publishing appointmentObj to queue so an email is sent to user
                publishToQueue(appointmentObj)

                return newAppointment
            }
            catch(err){
                console.log(err);
                return err
            }
        }
    }
}

export default appointmentResolver;
