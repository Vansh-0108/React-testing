import React from 'react';
import { fireEvent, render, screen, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomInput from './CustomInput';

describe('When everything is okay', () => {

    it('should call the onChange callback handler when using the fireEvent function', () => {
        const mockOnChange = jest.fn();

        render (
            <CustomInput value = '' onChange={mockOnChange}>
                Input:
            </CustomInput>
        );

        fireEvent.change(screen.getByRole("textbox"), {
            target: {value: 'someText'}
        });

        expect(mockOnChange).toHaveBeenCalledTimes(1);
    })

    it('should call the onChange callback handler when using the userEvent API', () => {
        const mockOnChange = jest.fn();

        render (
            <CustomInput value = '' onChange={mockOnChange}>
                Input:
            </CustomInput>
        );

        userEvent.type(screen.getByRole('textbox'), 'someName');
        //Triggering it for each key pressed

        expect(mockOnChange).toHaveBeenCalledTimes(8);
    })
})