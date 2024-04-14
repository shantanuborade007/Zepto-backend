const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const User=require("../models/User")

exports.sendOtp = async(req, res) => {
    try {
        const { phoneNumber } = req.body;
        if (!phoneNumber) {
            return res.status(400).json({
                success: false,
                message: "Please enter your phone number"
            });
        }

       
        const verification = await client.verify.v2.services(process.env.VERIFY_SERVICE_SID)
            .verifications
            .create({to: phoneNumber, channel: 'sms'});

        res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error occurred while sending OTP"
        });
    }
};


exports.verifyOtp = async(req, res) => {
    try {
        const { phoneNumber, otp } = req.body;
        if (!phoneNumber || !otp) {
            return res.status(400).json({
                success: false,
                message: "Please enter your phone number and OTP"
            });
        }

        // Verify OTP
        const verificationCheck = await client.verify.v2.services(process.env.VERIFY_SERVICE_SID)
            .verificationChecks
            .create({to: phoneNumber, code: otp});

            // console.log(verificationCheck);

        if (verificationCheck.status === 'approved') {

            const user = await User.findOne({ phoneNumber });
            if (user) {
                // If the user exists, send a welcome message
                return res.status(200).json({
                    success: true,
                    message: "Welcome back! (will be redirected to Home Screen)"
                });
            } else {
                // If the user does not exist, prompt to enter details
                    return res.status(302).json({
                        success: true,
                        message: "Please go to /signup to enter your details"
                    });
            }
            
          
        } else {
            // OTP is invalid
            res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error occurred while verifying OTP"
        });
    }
};

exports.signup = async(req,res)=>{
    try{

        const {name,phoneNumber,email,role}= req.body;

        const exitsingUser =await User.findOne({phoneNumber});

        if(exitsingUser){
            return res.status(400).json({
                success:false,
                message:"User already Exist"
            })
        }

        const user = new User({name,phoneNumber,email,role})
        await user.save();

        return res.status(200).json({
            success:true,
            data:user,
            message:'Sign up Successful'
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

exports.getuserByPhoneNo = async(req,res)=>{
    try{
        const {phoneNumber}= req.body;
        const user = await User.findOne({phoneNumber:phoneNumber});
        if(!user){
            return res.status(500).json({
                success:false,
                message:"User not found"
            })
        }
        return res.status(200).json({
            success: true,
            data:user
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"User not found"
        })
    }
}

