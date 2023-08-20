const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); 

const feedbackModel = require('../model/feedback'); 
const complaintModel = require('../model/complaint');
const bookingModel = require('../model/booking');
let canteenModel = require('../model/canteen');
let employeeModel = require('../model/user');
let scheduleModel = require('../model/trainschedule');
let mapModel = require('../model/map');
let foodCashModel = require('../model/foodorder-Cash');
let foodCreditModel = require('../model/foodorder-CreditCard');

// Connect to MongoDB
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
});

// Close the MongoDB connection
afterAll(async () => {
  await mongoose.connection.close();
});

// Close the server
// afterAll(done => {
//   app.close(done);
// });


describe('<--Test Suites 01 - Testing all APIs -->', () => {
  test('POST -> Feedback /addfeedback should return 200 and add feedback to database', async () => {
    try {
      const feedback = 'Good';
      const response = await request(app)
        .post('/feedbacks/addfeedback')
        .send({ feedback });
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ '': ' Added Successfully' });
  
      const fb = await feedbackModel.findOne({ feedback: feedback });
      expect(fb).toBeTruthy();
    } catch (err) {
      test('POST /addfeedback should return 400 if something went wrong', async () => {
        const response = await request(app)
          .post('/feedbacks/addfeedback')
          .send({});
    
        expect(response.status).toBe(404);
      });
      console.error(err);
      fail();
    }
  });

  test('POST -> Complaint /addcomplaint should return 200 and add Complaint to database', async () => {
    try {
      const email = 't@example.com';
      const complaint = 'abc';
      const response = await request(app)
        .post('/complaints/addcomplaint')
        .send({ email, complaint });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ '': ' Added Successfully' });

      const complaintFromDb = await complaintModel.findOne({ email: email, complaint: complaint });
      expect(complaintFromDb).toBeTruthy();

    } catch (err) {
      test('POST /addcomplaint should return 400 if something went wrong', async () => {
        const response = await request(app)
          .post('/complaints/addcomplaint')
          .send({});

        expect(response.status).toBe(400);
        expect(response.text).toBe('Something Went Wrong');
      });
      console.error(err);
      fail();
    }
  });

  // test('POST -> Canteen /addcanteen should return 200 and add Food items to database', async () => {
  //   const foodname = 'sandwich';
  //   const quantity = '25';
  //   const price = '300';
  //   const response = await request(app)
  //     .post('/canteens/addcanteen')
  //     .send({ foodname, quantity, price });
  
  //   expect(response.status).toBe(200);
  
  //   const foodFromDb = await canteenModel.findOne({ foodname: foodname, quantity: quantity, price: price });
  //   expect(foodFromDb).toBeTruthy();
  // });

  test('POST -> Location /api should return 200 and add Location to database', async () => {
    const lng = '79.8851072';
    const lat = '6.848512';
    const response = await request(app)
      .post('/map/api')
      .send({ lng, lat });
  
    expect(response.status).toBe(200);
  
    const map = await mapModel.findOne({ lng: lng, lat: lat });
    expect(map).toBeTruthy();
  });
  

  // test('GET -> Booking & Payment Details /addbooking should return all bookings & Payment', async () => {
  //   const testBooking = {
  //     name: 'hashan',
  //     email: 'kavinduhashan2k17@gmail.com',
  //     phone: '763582348',
  //     start: 'kaluthara',
  //     end: 'colombo',
  //     date: '2023-05-14T00:00:00.000+00:00',
  //   };
  //   await bookingModel.create(testBooking);
  //   const res = await request(app).get('/bookings/getBookings');
  //   expect(res.statusCode).toBe(200);
  // });

  test('GET -> Feedback /getFeedback should return all feedbacks', async () => {
    const testfb = {
      feedback: 'thank you',
    };
    await feedbackModel.create(testfb);
    const res = await request(app).get('/feedbacks/getFeedback');
    expect(res.statusCode).toBe(200);
  });

  test('GET -> Complains /getComplaint should return all Complains', async () => {
    const test = {
      email: 'kavinduhashan2k17@gmail.com',
      complaint: 's'
    };
    await complaintModel.create(test);
    const res = await request(app).get('/complaints/getComplaint');
    expect(res.statusCode).toBe(200);
  });

  // test('GET -> Canteen /getcanteen should return all food items details', async () => {
  //   const test = {
  //     foodname: 'sandwich',
  //     quantity: '25',
  //     price: '300'
  //   };
  //   await canteenModel.create(test);
  //   const res = await request(app).get('/canteens/getcanteen');
  //   expect(res.statusCode).toBe(200);
  // });

  test('GET -> Food Cash on Deliver Order Details /getfoodCash should return all Food Cash on Deliver Order details', async () => {
    const test = {
      name: 'hashan',
      email: 'kavinduhashan2k17@gmail.com',
      seatnum: '1',
      foodname: 'Friut Juice',
      quantity: '1',
      pay: '150'
    };
    await foodCashModel.create(test);
    const res = await request(app).get('/foodorders/getfoodCash');
    expect(res.statusCode).toBe(200);
  });

  test('GET -> Food Credit Card Order Details /getfood should return all Food Credit Card Order details', async () => {
    const test = {
      name: 'h',
      email: 'kavinduhashan2k17@gmail.com',
      seatnum: '2',
      foodname: 'Bun',
      quantity: '1',
      price: '250'
    };
    await foodCreditModel.create(test);
    const res = await request(app).get('/foodorders/getfoodCredit');
    expect(res.statusCode).toBe(200);
  });

  test('GET -> Registration Details /getemp should return user registration details', async () => {
    const test = {
      name: 'hashan',
      email: 'kavinduhashan2k17@gmail.com',
      nic: '111111111111',
      phone: '763582348',
    };
    await employeeModel.create(test);
    const res = await request(app).get('/employees/getemp');
    expect(res.statusCode).toBe(200);
  });

  // test('GET -> Train schedule Details /getschedule should return train schedule details', async () => {
  //   const test = {
  //     // name: 'abc',
  //     start: 'kaluthara',
  //     end: 'colombo',
  //     // date: '2023-05-19T00:00:00.000+00:00',
  //   };
  //   await scheduleModel.create(test);
  //   const res = await request(app).get('/schedules/getschedule');
  //   expect(res.statusCode).toBe(200);
  // });

  test('GET -> Location /getMap should return Location', async () => {
    const test = {
      lng: '79.8851072',
      lat: '6.848512',
    };
    await mapModel.create(test);
    const res = await request(app).get('/map/getMap');
    expect(res.statusCode).toBe(200);
  });

});
