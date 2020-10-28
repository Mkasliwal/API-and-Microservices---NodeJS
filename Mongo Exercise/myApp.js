var mongoose = require('mongoose');
var mongodb = require('mongodb');
 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


var personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

var Person = mongoose.model("Person", personSchema);


var createAndSavePerson = function(done) {
  
  var person = new Person({
  name: "Mayur",
  age: 22,
  favoriteFoods: ['pizza, pasta']
});

person.save(function(err, person){
  if(err) return done(err)
  else{
    return done(null, person);
  }
});
};


  var arrayOfPeople = [
    {
      name: "Ayur",
      age: 19,
      favoriteFoods: ["pasta maggi"]
    },
    {
      name: "Sotirios",
      age: 44,
      favoriteFoods: ["burrito maggi"] 
    },
    {
      name: "DJ",
      age: 21,
      favoriteFoods: ["noodles maggi"] 
    },
    {
      name: "Albert",
      age: 25,
      favoriteFoods: ["burrito maggi"] 
    },
    {
      name: "Mamta",
      age: 45,
      favoriteFoods: ["momose roll"] 
    },
    {
      name: "Mary",
      age: 47,
      favoriteFoods: ["momose maggi"] 
    },
    {
      name: "Bob",
      age: 29,
      favoriteFoods: ["noodles burrito"] 
    },
    {
      name: "Mary",
      age: 46,
      favoriteFoods: ["moose maggi"] 
    },
    {
      name: "Leo",
      age: 21,
      favoriteFoods: ["noodles maggi burrito"] 
    },
  ];

var createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};


var findPeopleByName = function(personName, done) {
  Person.find({name: personName}, function (err, people) {
    if(err) return done(err);
    return done(null, people);
  });
};


var findOneByFood = function(food, done) {

  Person.findOne({favoriteFoods: food}, function(err, foundFood){
    if(err) return done(err);
    return done(null, foundFood);
  });
};


var findPersonById = function(personId, done) {
  
  Person.findById({_id: personId}, function(err, foundID){
    if(err) return done(err);
    return done(null, foundID);
  });
  
};



var findEditThenSave = function(personId, done) {
  var foodToAdd = 'hamburger';
  Person.findById({_id: personId}, function(err, person){
    if(err) return done(err);

    person.favoriteFoods.push(foodToAdd);
    person.save(function(err, data){
      if(err) return done(err);
      return done(null, data);
    });
  });
};


var findAndUpdate = function(personName, done) {
  var ageToSet = 20;
  Person.findOneAndUpdate({name: personName},{age: ageToSet},{new: true}, function(err, person){
    if(err) return done(err);
    return done(null, person);
  });
};



var removeById = function(personId, done) {
  
  Person.findByIdAndRemove({_id: personId}, function(err, person){
    if(err) return done(err);
    return done(null, person);
  })
    
};


var removeManyPeople = function(done) {
  var nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, function(err, response){
    if(err) return done(err);
    return done(null, response);
  });
};


var queryChain = function(done) {
  var foodToSearch = "burrito";
  
  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select({age: 0}).exec(function(err, person){
    if(err) return done(err);
    return done(null, person);
  });
  

};

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
