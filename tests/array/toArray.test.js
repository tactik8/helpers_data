import {jest} from '@jest/globals'


import { arrayService } from '../../src/array/array.service.js';

describe('arrayService.toArray', () => {
    test('should return array as-is when already an array', () => {
        const arr = [1, 2, 3];
        expect(arrayService.toArray(arr)).toEqual([1, 2, 3]);
        expect(arrayService.toArray([])).toEqual([]);
        expect(arrayService.toArray(['a', 'b'])).toEqual(['a', 'b']);
    });

    test('should wrap non-array values in an array', () => {
        expect(arrayService.toArray('hello')).toEqual(['hello']);
        expect(arrayService.toArray(123)).toEqual([123]);
        expect(arrayService.toArray(true)).toEqual([true]);
        expect(arrayService.toArray(false)).toEqual([false]);
        expect(arrayService.toArray({})).toEqual([{}]);
        expect(arrayService.toArray(null)).toEqual([null]);
    });

    test('should filter out undefined values', () => {
        expect(arrayService.toArray([1, undefined, 3])).toEqual([1, 3]);
        expect(arrayService.toArray([undefined, 'test', undefined])).toEqual(['test']);
        expect(arrayService.toArray(undefined)).toEqual([]);
        expect(arrayService.toArray([undefined, undefined])).toEqual([]);
    });

    test('should handle mixed arrays with undefined values', () => {
        expect(arrayService.toArray([1, 2, undefined, 4, undefined])).toEqual([1, 2, 4]);
        expect(arrayService.toArray([null, undefined, 0, false, ''])).toEqual([null, 0, false, '']);
    });

   

    test('should throw error when no default value provided and error occurs', () => {
        // Simulate error by mocking Array.isArray to throw
        const originalIsArray = Array.isArray;
        Array.isArray = jest.fn(() => { throw new Error('Test error'); });
        
        expect(() => arrayService.toArray('test')).toThrow();
        
        // Restore original function
        Array.isArray = originalIsArray;
    });

    test('should handle edge cases', () => {
        expect(arrayService.toArray(0)).toEqual([0]);
        expect(arrayService.toArray('')).toEqual(['']);
        expect(arrayService.toArray(NaN)).toEqual([NaN]);
        expect(arrayService.toArray(Infinity)).toEqual([Infinity]);
        expect(arrayService.toArray(-Infinity)).toEqual([-Infinity]);
    });
});
