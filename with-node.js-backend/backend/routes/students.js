const router = require('express').Router(); // we need the express router i.e. we are using this router from the express library
const { default: userEvent } = require('@testing-library/user-event');
let Student = require('../models/student.model'); //require the student model



// get all students
router.route('/').get((req,res) => {
    Student.find()
        .then(students => res.json(students))
        .catch(err => res.status(400).json('Error: ' + err))
})

// add a student
router.route('/add').post((req,res) => {
    const username = req.body.username;
    const startdate = Date.parse(req.body.startdate);
    const math = Boolean(req.body.math);
    const reading = Boolean(req.body.reading);
    const petname = req.body.petname;
    const pettype = req.body.pettype;
                                        
    const newStudent = new Student({username, startdate, math, reading, petname, pettype});

    newStudent.save()
        .then(() => res.json('Student added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// get a student by id
router.route('/id/:id').get((req,res) => {
    Student.findById(req.params.id)
        .then(student => res.json(student))
        .catch(err => res.status(400).json('Error: ' + err))
});

// delete a student by id
router.route('/:id').delete((req,res) => {
    Student.findByIdAndDelete(req.params.id)
        .then(() => res.json('Student deleted.'))
        .catch(err => res.status(400).json('Error: ' + err))
});

// update a student by username
router.route('/update/:username').post((req,res) => {
    Student.findOne({username:req.params.username})
        .then(studentData => {
            studentData.username = req.body.username;
            studentData.startdate = Date.parse(req.body.startdate);
            studentData.math = Boolean(req.body.math);
            studentData.reading = Boolean(req.body.reading);
            studentData.points = Number(req.body.points);
            studentData.tokens = Number(req.body.tokens);
            studentData.petname = req.body.petname;
            studentData.pettype = req.body.pettype;
            studentData.dates= req.body.dates;

            studentData.save()
            .then(() => res.json('Student updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
        
});





// get all student usernames
router.route('/getUsernames').get((req,res) => {
    Student.find()
        .then(students => res.json(students.map(student => ({username:student.username}))))
        .catch(err => res.status(400).json('Error: ' + err))
});

// returns a student by username
router.route('/get/:username').get((req,res) => {
    Student.findOne({username:req.params.username})
        .then(student => res.json(student))
        .catch(err => res.status(400).json('Error: ' + err))
});



// update a student's points
router.route('/update-points/:username').post((req,res) => {
    Student.findOne({username:req.params.username})
        .then(data => {
            var dates = {
                math:[],
                reading:[]
            }
            
            
            convertToDates(req.body.dates.math,dates.math)
            convertToDates(req.body.dates.reading,dates.reading)
            data.points =  Number(req.body.points);
            data.tokens = Number(req.body.tokens);
            data.dates= dates;

            data.save()
            .then(() => res.json('Student updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
        
});

function convertToDates(jsonArr,newArr)
{
    if(typeof jsonArr !== 'undefined')
    {
        jsonArr.forEach(date => {
        
            newArr.push({
                date: new Date(date.date),
                bonus:date.bonus
            })
                    
        }) 

    }
    
}



module.exports = router; //stadard finish for router files