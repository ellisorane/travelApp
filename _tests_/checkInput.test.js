import { checkPlaceInput } from './checkInput';

test("Check that city is is valid", () => {
    const pass = checkPlaceInput('Tokyo');
    //const fail = checkPlaceInput('32 Metz Rd'); 
    expect(pass);
})