const { MongoClient, ObjectId } = require('mongodb');
const uri = 'mongodb+srv://lucatoney23:luc12@ant.xclkkf0.mongodb.net/ant?retryWrites=true&w=majority&appName=ant'
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function main() {
    try {
      await client.connect();
      console.log('Connected to MongoDB');
  
      const database = client.db('contact');
      const collection = database.collection('contactlist');
  
      // Insert documents
      await collection.insertMany([
        { lastName: 'Ben', firstName: 'Moris', email: 'ben@gmail.com', age: 26 },
        { lastName: 'Kefi', firstName: 'Seif', email: 'kefi@gmail.com', age: 15 },
        { lastName: 'Emilie', firstName: 'brouge', email: 'emilie.b@gmail.com', age: 40 },
        { lastName: 'Alex', firstName: 'brown', age: 4 },
        { lastName: 'Denzel', firstName: 'Washington', age: 3 }
      ]);
      console.log('Documents inserted');
  
      // Display all contacts
      const allContacts = await collection.find({}).toArray();
      console.log('All contacts:');
      console.log(allContacts);
  
      // Display information about one person using their ID
      const person = await collection.findOne({ _id: allContacts[0]._id });
      console.log('One person:');
      console.log(person);
  
      // Display contacts with age > 18
      const adults = await collection.find({ age: { $gt: 18 } }).toArray();
      console.log('Contacts with age > 18:');
      console.log(adults);
  
      // Display contacts with age > 18 and name containing "ah"
      const nameContainsAh = await collection.find({ $and: [{ age: { $gt: 18 } }, { lastName: /ah/i }] }).toArray();
      console.log('Contacts with age > 18 and name containing "ah":');
      console.log(nameContainsAh);
  
      // Change contact's first name from "Kefi Seif" to "Kefi Anis"
      await collection.updateOne({ lastName: 'Kefi', firstName: 'Seif' }, { $set: { firstName: 'Anis' } });
      console.log('First name updated');
  
      // Delete contacts aged under 5
      await collection.deleteMany({ age: { $lt: 5 } });
      console.log('Contacts aged under 5 deleted');
  
      // Display all contacts again
      const finalContacts = await collection.find({}).toArray();
      console.log('All contacts after operations:');
      console.log(finalContacts);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      await client.close();
      console.log('Disconnected from MongoDB');
    }
  }
  
  main().catch(console.error);