import React from 'react';
import { fireEvent, getByRole, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { getUser } from './get-user';
import userEvent from '@testing-library/user-event';
// import { mocked } from 'ts-jest/utils'

jest.mock('./get-user');
const mockGetUser = jest.mocked(getUser, true)

describe.skip ("When everything is okay", () => {

  beforeEach(async () => {
    render(<App />)
    await waitFor(() => expect(mockGetUser).toHaveBeenCalled())
  })
  
  it("should render the element", () => {
    screen.debug();
  })

  it('should select the children that is being passed to the CustomInput component', () => {
    // screen.getByText("Input:"); //implicit assertion
    screen.getByText(/Input/); //Regular expressions

    /* Check Not in the Document
    let error;
    try {
      screen.getByText('Input')
    } catch (err) {
      error = err
    }
    expect(error).toBeDefined();
    */
  })

  it('should select the input element by its role', () => {
    screen.getByRole('textbox');
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  })

  it('should select the input element by its label text', () => {
    screen.getByLabelText('Input:');
    expect(screen.getByLabelText('Input:')).toBeInTheDocument();
  })

  it('should select the input element by its label text', () => {
    screen.getByPlaceholderText('Enter Text');
    expect(screen.getByPlaceholderText('Enter Text')).toBeInTheDocument();
  })

  it('should get the element by queryByRole', () => {
    // queryBy never throw any error rather make the value null
    expect(screen.queryByRole('kuchBhi')).toBeNull();
    // no need to wrap the code in trycatch block
    expect(screen.queryByRole('textbox')).not.toBeNull();
  })

  it('should get the element by getByPlaceholderText', () => {
    screen.getByPlaceholderText('Enter Text')
    expect(screen.getByPlaceholderText('Enter Text')).toBeInTheDocument();
  })
})

// findby... is used with async methods (with a await)

describe ("When component fetches the user successfully", () => {
  beforeEach(() => {
    // jest.clearAllMocks();
    mockGetUser.mockClear();
  });

  const someUser = {
    id: 'someId',
    name: 'someName'
  }

  it('should call getUser once', async () => {
    render(<App />);
    await waitFor(() => expect(mockGetUser).toHaveBeenCalledTimes(1))
  })

  it('should render the username passed', async() => {
    // mockGetUser.mockImplementationOnce(() => Promise.resolve(someUser))
    // OR 
    mockGetUser.mockResolvedValueOnce(someUser)
    render(<App />)
    expect(screen.queryByText(/Username/)).toBeNull()
    // screen.debug()
    expect(await screen.findByText(/Username/)).toBeInTheDocument()
    // screen.debug()
    expect(await screen.findByText(`Username: ${someUser.name}`)).toBeInTheDocument();
  })
})

describe ("When user enters some text in the imput element", () => {
  it("should display the text on the screen", async() => {
    render(<App />);
    await waitFor(() => expect(mockGetUser).toHaveBeenCalled());

    expect(screen.getByText(/You typed: .../))

    // fireEvent.change(screen.getByRole('textbox'), {
    //   target: { value: 'someName' }
    // });

    // OR

    userEvent.type(screen.getByRole('textbox'), 'someName')

    expect(screen.getByText(/You typed: someName/))
  })
})