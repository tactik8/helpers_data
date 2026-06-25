
import {jest} from '@jest/globals'

import { arrayService } from '../../src/array/array.service.js';

describe('arrayService.getFirst', () => {
    test('should return first element of valid arrays', () => {
        expect(arrayService.getFirst([1, 2, 3])).toBe(1);
        expect(arrayService.getFirst(['a', 'b', 'c'])).toBe('a');
        expect(arrayService.getFirst([true, false])).toBe(true);
        expect(arrayService.getFirst([null, undefined])).toBe(null);
        expect(arrayService.getFirst([{name: 'test'}, {}])).toEqual({name: 'test'});
    });

    test('should return undefined for empty arrays', () => {
        expect(arrayService.getFirst([])).toBeUndefined();
        expect(arrayService.getFirst(new Array())).toBeUndefined();
    });

    test('should return default value for non-arrays when default provided', () => {
        const defaultValue = 'default';
        expect(arrayService.getFirst(null, defaultValue)).toBe(defaultValue);
        expect(arrayService.getFirst(undefined, defaultValue)).toBe(defaultValue);
        expect(arrayService.getFirst('string', defaultValue)).toBe(defaultValue);
        expect(arrayService.getFirst(123, defaultValue)).toBe(defaultValue);
        expect(arrayService.getFirst({}, defaultValue)).toBe(defaultValue);
        expect(arrayService.getFirst(true, defaultValue)).toBe(defaultValue);
    });

    test('should throw error for non-arrays when no default provided', () => {
        expect(() => arrayService.getFirst(null)).toThrow('Invalid array');
        expect(() => arrayService.getFirst(undefined)).toThrow('Invalid array');
        expect(() => arrayService.getFirst('string')).toThrow('Invalid array');
        expect(() => arrayService.getFirst(123)).toThrow('Invalid array');
        expect(() => arrayService.getFirst({})).toThrow('Invalid array');
        expect(() => arrayService.getFirst(true)).toThrow('Invalid array');
    });

    test('should handle arrays with special values', () => {
        expect(arrayService.getFirst([0, 1, 2])).toBe(0);
        expect(arrayService.getFirst(['', 'test'])).toBe('');
        expect(arrayService.getFirst([false, true])).toBe(false);
        expect(arrayService.getFirst([NaN, 1])).toBe(NaN);
        expect(arrayService.getFirst([Infinity, 1])).toBe(Infinity);
        expect(arrayService.getFirst([-Infinity, 1])).toBe(-Infinity);
    });

    test('should return default value when error occurs and default is provided', () => {
        const defaultValue = 'error_default';
        // Mock Array.isArray to throw an error
        const originalIsArray = Array.isArray;
        Array.isArray = jest.fn(() => { throw new Error('Test error'); });
        
        const result = arrayService.getFirst([1, 2, 3], defaultValue);
        expect(result).toBe(defaultValue);
        
        // Restore original function
        Array.isArray = originalIsArray;
    });

    test('should throw error when error occurs and no default provided', () => {
        // Mock Array.isArray to throw an error
        const originalIsArray = Array.isArray;
        Array.isArray = jest.fn(() => { throw new Error('Test error'); });
        
        expect(() => arrayService.getFirst([1, 2, 3])).toThrow();
        
        // Restore original function
        Array.isArray = originalIsArray;
    });
});
