import { jest, describe, it, expect, afterEach, beforeEach, afterAll, beforeAll } from "@jest/globals";
import { SpyInstance, spyOn } from 'jest-mock';
import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { createEmployees, deleteEmployees, modifyEmployees, getEmployees, getEmployeesById } from '../../src/controllers/employees';
import { closeAllConnection, getRepositories } from '../../src/repositories';
import { Employee } from '../../src/entity/Employee';
import { Account } from '../../src/entity/Account';
import { clearTestAcountData, createTestAccountData, expectToBeOneOf } from "../helpers/testUtils";
import { buyerAndSellerAccount1, sellerAccount1 } from '../helpers/testData/accounts';
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import { employee1, employee2, employee3 } from "../helpers/testData/employees";

// Inject db logging setting through environmental variables
process.env.DB_LOGGING = "false";

// Use .env-file settings
dotenv.config();

describe('Employees Controller', () => {
  let employeeRepo: Repository<Employee>;
  let accountRepo: Repository<Account>;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  let consoleLogSpy: SpyInstance;
  let consoleDebugSpy: SpyInstance;

  beforeAll(async () => {
    // Disable logging (console.log). Still logging error!
    consoleLogSpy = spyOn(console, 'log').mockImplementation(() => { });
    consoleDebugSpy = spyOn(console, 'debug').mockImplementation(() => { });

    // Initialize repositories to use
    const { account, employee, team } = await getRepositories();
    accountRepo = account, employeeRepo = employee;
  });

  beforeEach(async () => {
    // Mock parameters
    req = { body: "" };
    res = {};
    next = jest.fn();
    // Empty database before each test
    await clearTestAcountData();
  });

  afterEach(async () => {
    // Empty database after esch test
    //await clearTestAcountData();
  });

  afterAll(async () => {
    // Close openned database connections
    await closeAllConnection();

    // Restore console.log() and concole.debug()
    consoleLogSpy.mockRestore();
    consoleDebugSpy.mockRestore();
  });

  it('should create a new employee and return values', async () => {
    const { insertedAccount: account } = await createTestAccountData(
      sellerAccount1,
      [],
      []
    );
    const newEmployee: Partial<Employee> = { ...employee1 };
    newEmployee.uuid = uuidv4(); // Just for test
    newEmployee.accountId = account.id; // Need to be set in UI / API request
    req.body = newEmployee;

    await createEmployees(req as Request, res as Response, next);

    const employeeCreated =
      await employeeRepo
        .findOne({ where: { uuid: newEmployee.uuid } });
    expect(employeeCreated).toBeDefined();
    expect(employeeCreated?.firstName).toBe(newEmployee.firstName);
  });

  // TODO: do not delete others!
  it('should delete an employee and only the provided one', async () => {
    const { insertedAccount: account, insertedEmployees: employees } =
      await createTestAccountData(
        sellerAccount1,
        [employee1, employee2],
        []
      );
    const employeeToDelete = employees[0];
    const employeeNotToDelete = employees[1];
    employeeToDelete.uuid = uuidv4(); // Just for test
    employeeNotToDelete.uuid = uuidv4(); // Just for test
    employeeToDelete.accountId = account.id; // Need to be set in UI / API request
    employeeNotToDelete.accountId = account.id; // Need to be set in UI / API request
    const employeeToDeleteTester =
      await employeeRepo
        .findOne({ where: { uuid: employeeToDelete.uuid } });
    const employeeNotToDeleteTester =
      await employeeRepo
        .findOne({ where: { uuid: employeeNotToDelete.uuid } });
    expect(employeeToDeleteTester).toBeDefined();
    expect(employeeNotToDeleteTester).toBeDefined();

    req.body = { id: employeeToDelete.id };
    await deleteEmployees(req as Request, res as Response, next);

    const deletedEmployee = await employeeRepo.findOne({ where: { uuid: employeeToDelete.uuid } });
    const stillExistsEmployee = await employeeRepo.findOne({ where: { uuid: employeeNotToDelete.uuid } });
    expect(deletedEmployee).toBeFalsy();
    expect(stillExistsEmployee).toBeDefined();
  });

  // TODO: modify only provided properties!
  it('should modify an employee and only the provided one', async () => {
    const { insertedAccount: account, insertedEmployees: employees } =
      await createTestAccountData(
        sellerAccount1,
        [employee1, employee2],
        []
      );
    const employeeToUpdate = employees[0];
    const employeeNotToUpdate = employees[1];

    const earlierFirstName = employees[0].firstName;
    const newFirstName = earlierFirstName + " the New";

    employeeToUpdate.uuid = uuidv4(); // Just for test
    employeeNotToUpdate.uuid = uuidv4(); // Just for test
    employeeToUpdate.accountId = account.id; // Need to be set in UI / API request
    employeeNotToUpdate.accountId = account.id;

    const employeeToUpdateTester =
      await employeeRepo
        .findOne({ where: { uuid: employeeToUpdate.uuid } });
    const employeeNotToUpdateTester =
      await employeeRepo
        .findOne({ where: { uuid: employeeNotToUpdate.uuid } });
    expect(employeeToUpdateTester).toBeDefined();
    expect(employeeNotToUpdateTester).toBeDefined();
    expect(employeeToUpdate.id).not.toBeFalsy();
    expect(employeeNotToUpdate.id).not.toBeFalsy();

    employeeToUpdate.firstName = newFirstName;
    req.body = employeeToUpdate;
    console.log(req);
    await modifyEmployees(req as Request, res as Response);

    const updatedEmployee =
      await employeeRepo
        .findOne({ where: { uuid: employeeToUpdate.uuid } });
    const notUpdatedEmployee =
      await employeeRepo
        .findOne({ where: { uuid: employeeNotToUpdate.uuid } });
    expect(updatedEmployee).toBeDefined();
    expect(notUpdatedEmployee).toBeDefined();
    expect(updatedEmployee?.firstName).toBe(newFirstName);
    expect(notUpdatedEmployee?.firstName).not.toBe(newFirstName);
  });

  it('should get all employees of an account', async () => {
    const { insertedAccount: account1, insertedEmployees: employees1 } =
      await createTestAccountData(
        sellerAccount1,
        [employee1, employee2],
        []
      );
    const { insertedAccount: account2, insertedEmployees: employees2 } =
      await createTestAccountData(
        buyerAndSellerAccount1,
        [employee3],
        []
      );
    expect(account1).toBeDefined();
    expect(account2).toBeDefined();
    expect(employees1.length).toBe(2);
    expect(employees2.length).toBe(1);

    req.body = { id: account1.id };

    const employeesToReturn =
      await getEmployees(req as Request, res as Response);

    expect(employeesToReturn).toBeInstanceOf(Array);
    expect(employeesToReturn.length).toBe(employees1.length);
    expectToBeOneOf(employeesToReturn[0].uuid, [employees1[0].uuid, employees1[1].uuid]);
  });

  it('should get an employee by id', async () => {
    const { insertedAccount: account, insertedEmployees: employees } =
      await createTestAccountData(
        buyerAndSellerAccount1,
        [employee3],
        []
      );
    expect(account).toBeDefined();

    req.body = { id: employees[0].id };
    const employeesToReturn: Partial<Employee> =
      await getEmployeesById(req as Request, res as Response);

    expect(employeesToReturn).toBeDefined();
  });
});
