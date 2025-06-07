 export interface User {
    id: number;
    userType: string; 
    firstName : string;
    lastName : string;
    email : string;
    phoneNumber : string;
};

export interface LogInDetails {
    email: string;
    passWord: string
}


export enum UserStatus {
    LoggedIn,
    LoggedOut,
}

export interface CreateCustomerDto
{
    firstName : string;
    lastName : string;
    phoneNumber : string;
    email : string;
    passWord: string;
}

export interface Tenant
{
    firstName : string;
    lastName : string;
    phoneNumber : string;
    email : string;
}

export interface TenantResponseDto
{
    id: number;
    firstName : string;
    lastName : string;
    phoneNumber : string;
    email : string;
}

export interface LandLordResponseDto
{
    id: number;
    firstName : string;
    lastName : string;
    phoneNumber : string;
    email : string;
}