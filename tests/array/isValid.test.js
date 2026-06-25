import {jest} from '@jest/globals'


import { arrayService } from '../../src/array/array.service.js';

describe('arrayService.isValid', () => {
    test('should return true for valid arrays', () => {
        expect(arrayService.isValid([])).toBe(true);
        expect(arrayService.isValid([1, 2, 3])).toBe(true);
        expect(arrayService.isValid(['a', 'b', 'c'])).toBe(true);
        expect(arrayService.isValid([null, undefined])).toBe(true);
        expect(arrayService.isValid([{}, []])).toBe(true);
        expect(arrayService.isValid(new Array())).toBe(true);
        expect(arrayService.isValid(new Array(5))).toBe(true);
    });

    test('should return false for non-arrays', () => {
        expect(arrayService.isValid(null)).toBe(false);
        expect(arrayService.isValid(undefined)).toBe(false);
        expect(arrayService.isValid('string')).toBe(false);
        expect(arrayService.isValid(123)).toBe(false);
        expect(arrayService.isValid({})).toBe(false);
        expect(arrayService.isValid(true)).toBe(false);
        expect(arrayService.isValid(false)).toBe(false);
        expect(arrayService.isValid(Symbol())).toBe(false);
        expect(arrayService.isValid(() => {})).toBe(false);
        expect(arrayService.isValid(new Date())).toBe(false);
        expect(arrayService.isValid(/regex/)).toBe(false);
    });

    test('should handle edge cases', () => {
        expect(arrayService.isValid(0)).toBe(false);
        expect(arrayService.isValid('')).toBe(false);
        expect(arrayService.isValid(NaN)).toBe(false);
        expect(arrayService.isValid(Infinity)).toBe(false);
        expect(arrayService.isValid(-Infinity)).toBe(false);
    });
});
