import db from '../config/db';
import { conectDB } from '../server';
 
jest.mock('../config/db', () => {
  const dbMock = {
    authenticate: jest.fn(),
    sync: jest.fn(),
  };
  return { __esModule: true, default: dbMock };
});
 
describe('connectToDatabase', () => {
  it('should handle database connection error', async () => {
    jest
      .spyOn(db, 'authenticate')
      .mockRejectedValueOnce(new Error('Unable to connect to the database:'));
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
 
    await conectDB();
 
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Unable to connect to the database:'),
      expect.any(Error)
    );
    expect(db.authenticate).toHaveBeenCalled();
  });
});
