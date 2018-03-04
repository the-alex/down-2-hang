const db = require('./index.js');

const FAKE_PASS = 'asd';
const fakeUsers = [
  {username: 'alex', password: FAKE_PASS},
  {username: 'julie', password: FAKE_PASS},
  {username: 'nick', password: FAKE_PASS},
  {username: 'eric', password: FAKE_PASS},
  {username: 'alyssa', password: FAKE_PASS},
];

const dummySentences = [
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
  'Donec hendrerit tempor tellus.',
  'Donec pretium posuere tellus.',
  'Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus.',
  'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
  'Nulla posuere.',
  'Donec vitae dolor.',
  'Nullam tristique diam non turpis.',
  'Cras placerat accumsan nulla.',
  'Nullam rutrum.',
  'Nam vestibulum accumsan nisl.',
];

const fakeMessages = [
  {text: dummySentences.slice(0, 2).join(' ')},
  {text: dummySentences.slice(0, 3).join(' ')},
  {text: dummySentences.slice(3, 4).join(' ')},
  {text: dummySentences.slice(3, 6).join(' ')},
];

db.mongoose.connection.collections['users'].drop(function(err) {
  db.mongoose.connection.collections['chats'].drop(function(err) {
    console.log('collections dropped');

    // Insert Users
    db.models.User.insertMany(fakeUsers).then(docs => {
      let chats = [
        new db.models.Chat({
          messages: fakeMessages.map(msg => {
            return {
              text: msg.text,
              user: docs.slice(0, 2)[Math.floor(Math.random() * 2)]._id,
            };
          }),
          chatName: 'party',
          participants: [docs[0]._id, docs[1]._id],
        }),
        new db.models.Chat({
          messages: fakeMessages.map(msg => {
            return {
              text: msg.text,
              user: docs.slice(0, 3)[Math.floor(Math.random() * 3)]._id,
            };
          }),
          chatName: 'bar',
          participants: [docs[0]._id, docs[1]._id, docs[2]._id],
        }),
        new db.models.Chat({
          messages: fakeMessages.map(msg => {
            return {
              text: msg.text,
              user: docs[Math.floor(Math.random() * docs.length)]._id,
            };
          }),
          chatName: 'lobby',
          participants: docs,
        }),

      ];

      db.models.Chat.insertMany(chats).then(insertedChats => {
        console.log(`inserted ${insertedChats.length} chats`);
      });
    });
  });
});
