import { faker } from '@faker-js/faker';

export class RandomDataUtil {
  
  static getFirstName(): string {
    return faker.person.firstName();
  }

  static getLastName(): string {
    return faker.person.lastName();
  }

  static getEmail(): string {
    return faker.internet.email();
  }

  static getGender(): string {
    return faker.person.gender();
  }

  static getPhone(): string {
    return faker.string.numeric({ length: 10 });
  }

  static getUsername(): string {
    return faker.string.alphanumeric({ length: { min: 5, max: 10 } }).toLowerCase();
  }

  static getPassword(): string {
    return faker.string.alphanumeric({ length: 8 });
  }

  static generateUserPayload(): object {
    return {
      id: faker.number.int({ min: 100, max: 99999 }),
      username: RandomDataUtil.getUsername(),
      firstName: RandomDataUtil.getFirstName(),
      lastName: RandomDataUtil.getLastName(),
      email: RandomDataUtil.getEmail(),
      password: RandomDataUtil.getPassword(),
      phone: RandomDataUtil.getPhone(),
      userStatus: faker.number.int({ min: 0, max: 5 })
    };
  }

  static generateUpdatedUserPayload(): object {
    return RandomDataUtil.generateUserPayload();
  }

  static getPetName(): string {
    const petNames = ['doggie', 'catie', 'birdie', 'fishie', 'bunnie', 'rex', 'fluffy'];
    return petNames[faker.number.int({ min: 0, max: petNames.length - 1 })];
  }

  static getPetStatus(): string {
    const statuses = ['available', 'pending', 'sold'];
    return statuses[faker.number.int({ min: 0, max: statuses.length - 1 })];
  }

  static getCategoryName(): string {
    const categories = ['CAT1', 'CAT2', 'DOG1', 'BIRD1', 'FISH1'];
    return categories[faker.number.int({ min: 0, max: categories.length - 1 })];
  }

  static getTagName(): string {
    const tags = ['TAG1', 'TAGO1', 'TAG2', 'TAG3'];
    return tags[faker.number.int({ min: 0, max: tags.length - 1 })];
  }

  static generatePetId(): number {
    return faker.number.int({ min: 100, max: 99999 });
  }

  static generatePetPayload(): object {
    return {
      id: RandomDataUtil.generatePetId(),
      category: {
        id: faker.number.int({ min: 1, max: 100 }),
        name: RandomDataUtil.getCategoryName()
      },
      name: RandomDataUtil.getPetName(),
      photoUrls: [
        'URL1'
      ],
      tags: [
        {
          id: faker.number.int({ min: 1, max: 100 }),
          name: RandomDataUtil.getTagName()
        }
      ],
      status: RandomDataUtil.getPetStatus()
    };
  }

  static generateNewPetPayload(id:number): object {
    return {
      id: id,
      category: {
      id: faker.number.int({ min: 1, max: 100 }),
        name: RandomDataUtil.getCategoryName()
      },
      name: RandomDataUtil.getPetName(),
      photoUrls: [
        'URL1'
      ],
      tags: [
        {
          id: faker.number.int({ min: 1, max: 100 }),
          name: RandomDataUtil.getTagName()
        }
      ],
      status: RandomDataUtil.getPetStatus()
    };
  }

  static generateUpdatedPetPayload(): object {
    return RandomDataUtil.generatePetPayload();
  }

  static generateOrderId(): number {
    return faker.number.int({ min: 1, max: 10 });
  }

  static generateOrderStatus(): string {
    const statuses = ['placed', 'approved', 'delivered'];
    return statuses[faker.number.int({ min: 0, max: statuses.length - 1 })];
  }

  static generateOrderPayload(id?: number): object {
    return {
      id: id ?? RandomDataUtil.generateOrderId(),
      petId: faker.number.int({ min: 1, max: 100 }),
      quantity: faker.number.int({ min: 1, max: 10 }),
      shipDate: new Date().toISOString(),
      status: RandomDataUtil.generateOrderStatus(),
      complete: faker.helpers.arrayElement([true, false])
    };
  }
}