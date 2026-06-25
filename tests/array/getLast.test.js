import {jest} from '@jest/globals'

import { arrayService } from '../../src/array/array.service.js';

describe('arrayService.getLast', () => {
    test('should return last element of valid arrays', () => {
        expect(arrayService.getLast([1, 2, 3])).toBe(3);
        expect(arrayService.getLast(['a', 'b', 'c'])).toBe('c');
        expect(arrayService.getLast([true, false])).toBe(false);
        expect(arrayService.getLast([null, undefined])).toBe(undefined);
        expect(arrayService.getLast([{}, {name: 'test'}])).toEqual({name: 'test'});
    });

    test('should return last element for single-element arrays', () => {
        expect(arrayService.getLast([42])).toBe(42);
        expect(arrayService.getLast(['only'])).toBe('only');
        expect(arrayService.getLast([null])).toBe(null);
        expect(arrayService.getLast([undefined])).toBe(undefined);
    });

    test('should return undefined for empty arrays', () => {
        expect(arrayService.getLast([])).toBeUndefined();
        expect(arrayService.getLast(new Array())).toBeUndefined();
    });

    test('should return default value for non-arrays when default provided', () => {
        const defaultValue = 'default';
        expect(arrayService.getLast(null, defaultValue)).toBe(defaultValue);
        expect(arrayService.getLast(undefined, defaultValue)).toBe(defaultValue);
        expect(arrayService.getLast('string', defaultValue)).toBe(defaultValue);
        expect(arrayService.getLast(123, defaultValue)).toBe(defaultValue);
        expect(arrayService.getLast({}, defaultValue)).toBe(defaultValue);
        expect(arrayService.getLast(true, defaultValue)).toBe(defaultValue);
    });

    test('should throw error for non-arrays when no default provided', () => {
        expect(() => arrayService.getLast(null)).toThrow('Invalid array');
        expect(() => arrayService.getLast(undefined)).toThrow('Invalid array');
        expect(() => arrayService.getLast('string')).toThrow('Invalid array');
        expect(() => arrayService.getLast(123)).toThrow('Invalid array');
        expect(() => arrayService.getLast({})).toThrow('Invalid array');
        expect(() => arrayService.getLast(true)).toThrow('Invalid array');
    });

    test('should handle arrays with special values', () => {
        expect(arrayService.getLast([1, 2, 0])).toBe(0);
        expect(arrayService.getLast(['test', ''])).toBe('');
        expect(arrayService.getLast([true, false])).toBe(false);
        expect(arrayService.getLast([1, NaN])).toBe(NaN);
        expect(arrayService.getLast([1, Infinity])).toBe(Infinity);
        expect(arrayService.getLast([1, -Infinity])).toBe(-Infinity);
    });

    test('should handle sparse arrays correctly', () => {
        const sparseArray = new Array(3);
        sparseArray[0] = 'first';
        sparseArray[2] = 'last';
        expect(arrayService.getLast(sparseArray)).toBe('last');
    });

   
   
});
