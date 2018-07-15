import seeder from '@cleverbeagle/seeder';
import { Meteor } from 'meteor/meteor';
import Articles from '../../api/Articles/Articles';

const articlesSeed = userId => ({
  collection: Articles,
  environments: ['development', 'staging'],
  noLimit: true,
  modelCount: 5,
  model(dataIndex) {
    return {
      author: userId,
      title: `Article #${dataIndex + 1}`,
      htmlBody: `This is the body of article #${dataIndex + 1}`,
    };
  },
});

seeder(Meteor.users, {
  environments: ['development', 'staging'],
  noLimit: true,
  data: [{
    email: 'buds@buds.com',
    password: 'buds123',
    profile: {
      name: {
        first: 'Licious',
        last: 'Mc Van Picious',
      },
    },
    roles: ['admin'],
    data(userId) {
      return articlesSeed(userId);
    },
  }],
  modelCount: 5,
  model(index, faker) {
    const userCount = index + 1;
    return {
      email: `user+${userCount}@test.com`,
      password: 'password',
      profile: {
        name: {
          first: faker.name.firstName(),
          last: faker.name.lastName(),
        },
      },
      roles: ['user'],
      data(userId) {
        return aticlesSeed(userId);
      },
    };
  },
});
