import { calculateTripLength } from '../calculateTripLength.js';

describe('calculateTripLength', () => {
  it('should calculate the correct trip length for valid dates', () => {
    const startDate = '2024-08-01';
    const endDate = '2024-08-05';
    const expectedLength = 4;
    
    const result = calculateTripLength(startDate, endDate);
    
    expect(result).toBe(expectedLength);
  });

  it('should return 0 if start date and end date are the same', () => {
    const startDate = '2024-08-01';
    const endDate = '2024-08-01';
    const expectedLength = 0;
    
    const result = calculateTripLength(startDate, endDate);
    
    expect(result).toBe(expectedLength);
  });

  it('should handle invalid date inputs gracefully', () => {
    const startDate = 'invalid-date';
    const endDate = '2024-08-05';
    
    const result = calculateTripLength(startDate, endDate);
    
    expect(result).toBeNaN();
  });

  it('should calculate the correct trip length when end date is before start date', () => {
    const startDate = '2024-08-05';
    const endDate = '2024-08-01';
    const expectedLength = -4;
    
    const result = calculateTripLength(startDate, endDate);
    
    expect(result).toBe(expectedLength);
  });

  it('should calculate correct trip length spanning over months', () => {
    const startDate = '2024-08-30';
    const endDate = '2024-09-02';
    const expectedLength = 3;
    
    const result = calculateTripLength(startDate, endDate);
    
    expect(result).toBe(expectedLength);
  });
});
