const Expense=require('../models/expense');

exports.postAddExp=async (req, res, next) => {
    try {
        const amount = req.body.amount;
        const category = req.body.category;
        const description = req.body.description;
        const data=await Expense.create({
            amount: amount,
            category: category,
            description: description
        });
        res.status(201).json({newData:data})
    }
    catch(err){
        res.status(500).json({
            error:err
        })
    }   
};
exports.deleteExp=async (req, res, next) => {
    const id=req.body.id;
    Expense.findByPk(id)
    .then((user) =>{
        user.destroy();
    })
    .catch(err =>{
        console.log(err);
    });
};

exports.getExp= (req, res, next) => {
    Expense.findAll()
    .then(user => {
        res.status(200).json({user:user});
    })
    .catch(err => {
        console.log(err);
    });
};