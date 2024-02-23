export interface Address {
    city: string;
    street: string;
}
export interface Employee {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: Address;
}