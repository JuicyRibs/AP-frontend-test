export interface User {
    id : string
    full_name : string
    phone_no : string
  }
  
  export interface ServiceRequest {
    requester: string
    type: string
    address_no: string
    developer: string
    note: string
  }
  
  export interface RepairDetails {
    category: string
    details: string
  }

  export interface RequestFormValue {
    detail: ServiceRequest
    repair?: RepairDetails
  }
  
  
export enum ServiceType {
    repair = "repair", 
    complain = "complain", 
    appeal = "appeal",
    enquire = "enquire",
  }