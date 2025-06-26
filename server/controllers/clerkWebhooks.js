import { log } from "console";
import user from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try {
        // create a svix instance with clerk webhook secret..
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        // getting headers
        const headers = {
              "svix-id" : req.headers["svix-id"],
               "svix-timestamp" : req.headers["svix-timestamp"],
                "svix-signature" : req.headers["svix-signature"],
        };

        // verify headers
        await whook.verify(JSON.stringify(req.body), headers)

        //getting data from request body
        const {data, type} = req.body

        // const userData ={
        //     _id: data.id,
        //     email: data.email_addresses[0].email_address,
        //     username: data.first_name + " " + data.last_name,
        //     Image: data.Image_url,
        // }

        // switch case for different  events \
       switch (type) {
        case "user.created": {
             const userData ={
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: data.first_name + " " + data.last_name,
            Image: data.Image_url,
        }
            await user.create(userData);
            break;
        }
          case "user.updated": {
             const userData ={
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: data.first_name + " " + data.last_name,
            Image: data.Image_url,
        }
            await user.findByIdAndUpdate(data.id, userData);
            break;
        }
          case "user.deleted": {
            await user.findByIdAndDelete(data.id);
            break;
        }
        default: 
           break;
       } 
       res.JSON({success: true, message: "Webhook Received"})                                                                                                                         


    } catch(error) {
         console.log(error.message);
         res.JSON({success: false, message: error.message});
    }
}

export default clerkWebhooks;