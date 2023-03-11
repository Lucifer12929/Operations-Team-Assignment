import axios from 'axios'


// const API = axios.create({baseURL: 'http://localhost:4000'})



// export const getAllQuestions = () =>  API.get('/user/get');

const getData = async () => {
  try {
    const API = axios.create({baseURL: 'http://localhost:4000'})
    // const body = {location};

    const response = await API.get('/user/get');
    console.log(response);

    return [response, null];
  } catch (error) {
    console.log('🚀 ~ file: getProperty.js:13 ~ getProperty ~ error', error);
    return [null, { message: 'Internal Server Error' }];
  }
};

export default getData;
