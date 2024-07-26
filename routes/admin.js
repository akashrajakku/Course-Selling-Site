const express= require("express");
const adminMiddleware= require("../middleware/admin");
const { Admin, Course } = require("../db/index");
const router= express.Router();
// Admin Routes

router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username= req.body.username;
    const password= req.body.password;

    //check if user already exists
    Admin.findOne({
        username: username,
        password: password
    }).then(function(value){
        if(value){
            res.json({
                message: 'Admin already exists, kindly Login'
            })
        }
        else{
            Admin.create({
                username: username,
                password: password
            })
        
            res.json({
                message: 'Admin created successfully'
            })
        }
    })

});

router.post('/courses', adminMiddleware, async (req, res) => {
    const title=req.body.title;
    const description=req.body.description;
    const price=req.body.price;
    const imageLink=req.body.imageLink;

//adding course after checking that course doesn't exist already

    async function courseExist(){
        const course= await Course.findOne({
            title: title,
            description: description
        })

        return !!course;
    }

    if(await courseExist()){
        res.json({
            message: "course already exists"
        })
    }
    else{
        try{
            const newCourse= await Course.create({
                title,
                description,
                price,
                imageLink
            })
    
            res.json({
                message: "Course created successfully",
                courseId: newCourse._id
            })
        }
        catch (err) {
            res.status(500).json({
                message: "An error occurred while creating the course",
                error: err.message
            });
        }
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    //get all courses form the database
    const allcourses= await Course.find({});

    res.json({
        Courses : allcourses
    })
});

module.exports = router;