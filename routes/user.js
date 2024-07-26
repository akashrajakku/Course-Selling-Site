const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', (req, res) => {
     // Implement admin signup logic
     const username= req.body.username;
     const password= req.body.password;
 
     //check if user already exists
     User.findOne({
         username: username,
         password: password
     }).then(function(value){
         if(value){
             res.json({
                 message: 'User already exists, kindly Login'
             })
         }
         else{
             User.create({
                 username: username,
                 password: password
             })
         
             res.json({
                 message: 'User created successfully'
             })
         }
     })
});

router.get('/courses', async (req, res) => {
    const allCourses= await Course.find({})
    res.json({
        courses: allCourses
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId= req.params.courseId;
    const username = req.headers.username;

    //checking that user do not purchase same course again
    async function courseAlreadyPurchased(courseId, username){
        try {
            const curr_user= await User.findOne({
                username: username
            })
    
            const user_courses= curr_user.purchasedCourses;
           
            for(let i=0; i<user_courses.length; i++){
                if(user_courses[i] == courseId){
                    return true;
                }
            }
            return false;
        } catch (error) {
            res.json({
                Error: error
            })
        }
        
    }

    if(await courseAlreadyPurchased(courseId, username)){
        res.json({
            message: "Course already purchased"
        })
    }
    else{
        await User.updateOne({
            username: username
        }, {
            "$push": {
                purchasedCourses : courseId
            }
        });
    
        res.json({
            message: "Purchase Successful"
        })
    }

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const user= await User.findOne({
        username: req.headers.username
    });
    
    const allCourseDetail= await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    })

    res.json({
        courses: allCourseDetail
    })
});

module.exports = router