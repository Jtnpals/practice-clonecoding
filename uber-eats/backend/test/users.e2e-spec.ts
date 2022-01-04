import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnection, Repository } from 'typeorm';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { User } from 'src/users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { async } from 'rxjs';

const GRAPHQL_ENDPOINT = '/graphql';

const testUser = {
  email: 'test@test.com',
  password: '1234',
};

describe('UserModule (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;
  let usersRepository: Repository<User>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));

    await app.init();
  });

  afterAll(async () => {
    await getConnection().dropDatabase();
    app.close();
  });

  describe('createAccount', () => {
    it('should create a new user', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: `mutation{
            createAccount(input: {
              email: "${testUser.email}",
              password: "${testUser.password}",
              role: Owner
            }){
              ok
              error
            }
          }`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createAccount.ok).toBe(true);
        });
    });
    it('should fail if account already exists', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: `mutation{
            createAccount(input: {
              email: "${testUser.email}",
              password: "${testUser.password}",
              role: Owner
            }){
              ok
              error
            }
          }`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createAccount.ok).toBe(false);
          expect(res.body.data.createAccount.error).toBe(
            'There is a user with that email already',
          );
        });
    });
  });

  describe('login', () => {
    it('should login with a correct token', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: `mutation{
            login(input: {
              email: "${testUser.email}",
              password: "${testUser.password}",
            }){
              token
              ok
              error
            }
          }`,
        })
        .expect(200)
        .expect((res) => {
          const {
            body: {
              data: { login },
            },
          } = res;
          expect(login.ok).toBe(true);
          expect(login.error).toBe(null);
          expect(login.token).toEqual(expect.any(String));
          jwtToken = login.token;
        });
    });
    it('should fail with an incorrect password', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: `mutation{
          login(input: {
            email: "${testUser.email}",
            password: "wrongPassword",
          }){
            token
            ok
            error
          }
        }`,
        })
        .expect(200)
        .expect((res) => {
          const {
            body: {
              data: { login },
            },
          } = res;
          expect(login.ok).toBe(false);
          expect(login.error).toBe('Wrong password');
          expect(login.token).toBe(null);
        });
    });
  });

  describe('userProfile', () => {
    let userId: number;
    beforeAll(async () => {
      const [user] = await usersRepository.find();
      userId = user.id;
    });

    it('should return the user profile', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .set('X-JWT', jwtToken)
        .send({
          query: `
        {
          userProfile(userId: ${userId}) {
            ok
            error
            user{
              id
            }
          }
        }`,
        })
        .expect(200)
        .expect((res) => {
          const {
            body: {
              data: {
                userProfile: {
                  ok,
                  error,
                  user: { id },
                },
              },
            },
          } = res;
          expect(ok).toBe(true);
          expect(error).toBe(null);
          expect(id).toBe(userId);
        });
    });

    it.todo('should not find a profile');
  });

  describe('me', () => {
    it('should return the user profile', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .set('X-JWT', jwtToken)
        .send({
          query: `
          {
            me {
              email
            }
          }
        `,
        })
        .expect(200)
        .expect((res) => {
          const {
            body: {
              data: {
                me: { email },
              },
            },
          } = res;
          expect(email).toBe(testUser.email);
        });
    });
  });

  describe('editProfile', () => {
    it('should change email', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .set('X-JWT', jwtToken)
        .send({
          query: `
        mutation {
          editProfile(input: {
            email: "test@test.com"
          }){
            ok
            error
          }
        }
        `,
        })
        .expect(200)
        .expect((res) => {
          const {
            body: {
              data: {
                editProfile: { ok, error },
              },
            },
          } = res;
          expect(ok).toBe(true);
          expect(error).toBe(null);
        });
    });
  });
});
