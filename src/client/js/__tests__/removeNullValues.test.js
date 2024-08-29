import { removeNullValues } from "../removeNullValues.js";

describe('removeNullValues', () => {
  test('should remove key-value pairs where the value is null', () => {
    const data = {
      agreement: 'AGREEMENT',
      confidence: null,
      irony: 'NONIRONIC',
      score_tag: null,
      subjectivity: 'OBJECTIVE'
    };
    const expectedResult = {
      agreement: 'AGREEMENT',
      irony: 'NONIRONIC',
      subjectivity: 'OBJECTIVE'
    };
    expect(removeNullValues(data)).toEqual(expectedResult);
  });

  test('should return the same object if there are no null values', () => {
    const data = {
      agreement: 'AGREEMENT',
      irony: 'NONIRONIC',
      subjectivity: 'OBJECTIVE'
    };
    expect(removeNullValues(data)).toEqual(data);
  });

  test('should return an empty object if all values are null', () => {
    const data = {
      agreement: null,
      confidence: null,
      irony: null
    };
    expect(removeNullValues(data)).toEqual({});
  });

  test('should handle empty objects', () => {
    const data = {};
    expect(removeNullValues(data)).toEqual({});
  });
});
