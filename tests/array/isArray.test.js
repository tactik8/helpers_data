import {jest} from '@jest/globals'


import { arrayService } from '../../src/array/array.js';

describe('arrayService.isArray', () => {
    test('should return true for valid arrays', () => {
        expect(arrayService.isArray([])).toBe(true);
        expect(arrayService.isArray([1, 2, 3])).toBe(true);
        expect(arrayService.isArray(['a', 'b', 'c'])).toBe(true);
        expect(arrayService.isArray([null, undefined])).toBe(true);
        expect(arrayService.isArray([{}, []])).toBe(true);
        expect(arrayService.isArray(new Array())).toBe(true);
        expect(arrayService.isArray(new Array(5))).toBe(true);
    });

    test('should return false for non-arrays', () => {
        expect(arrayService.isArray(null)).toBe(false);
        expect(arrayService.isArray(undefined)).toBe(false);
        expect(arrayService.isArray('string')).toBe(false);
        expect(arrayService.isArray(123)).toBe(false);
        expect(arrayService.isArray({})).toBe(false);
        expect(arrayService.isArray(true)).toBe(false);
        expect(arrayService.isArray(false)).toBe(false);
        expect(arrayService.isArray(Symbol())).toBe(false);
        expect(arrayService.isArray(() => {})).toBe(false);
        expect(arrayService.isArray(new Date())).toBe(false);
        expect(arrayService.isArray(/regex/)).toBe(false);
    });

    test('should handle edge cases', () => {
        expect(arrayService.isArray(0)).toBe(false);
        expect(arrayService.isArray('')).toBe(false);
        expect(arrayService.isArray(NaN)).toBe(false);
        expect(arrayService.isArray(Infinity)).toBe(false);
        expect(arrayService.isArray(-Infinity)).toBe(false);
    });
});
