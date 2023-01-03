import { render, screen } from '@testing-library/react';
import Signup from './signup';

describe('Signup test suite', () => {
    
    test('should, have the "h1 Sign-up" title', () => {
        // arrange
        render(<Signup />);
        
        //Act

        //Assert
        const headingElement = screen.getByText('Sign-up', { exact: true });
        expect(headingElement).toBeInTheDocument();
    })
});

