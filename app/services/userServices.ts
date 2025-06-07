// src/services/userService.ts
import axios from 'axios';
import api from '../api/api';
import { CreateCustomerDto, LogInDetails } from '../models/user';

export const getUsers = () => {
  return api.get('/users');
};

export const createUser = (userData: any) => {
  return api.post('/users', userData);
};

export const logInUser = async (logInDetails: LogInDetails) => {
  
   try {

      const response = await api.post('/user/login', logInDetails);
      return response.data as ApiResponse;

    } catch (error)
    {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        
        const payload = error.response.data as ApiResponse;
        return payload;

      } else {
        return {
          data: null,
          error: 'An unexpected error occurred.',
          success: false,
        } as ApiResponse;
      }
    }
};

export const registerLandLord = (landLordData: any) => {
  return api.post('/landlords', landLordData);
};

export const registerCustomer = async (customer: CreateCustomerDto): Promise<ApiResponse> => {
    try 
    {
      const response = await api.post(`/customer`, customer);
      return response.data as ApiResponse;

    } 
    catch (error)
    {
                  
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        
        const payload = error.response.data as ApiResponse;
        return payload;

      } else {
        return {
          data: null,
          error: 'An unexpected error occurred.',
          success: false,
        } as ApiResponse;
      }
                    

    }
  
};

export const getTenants = (landLordId:number) => {
  return api.get(`/landlords/${landLordId}/tenant`);
};
