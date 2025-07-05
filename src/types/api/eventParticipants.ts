export type EventRegistration = {
  id: number;
  customerDTO: CustomerEvent;
  payId: number;
  answerCustomers: AnswerCustomer;
};

export type CustomerEvent = {
  id: number;
  name: string;
  dni: number;
  phoneNumber: number;
  altPhoneNumber: number;
  email: string;
  team: boolean;
  isPartner: boolean;
  debtor: boolean;
};

export type AnswerCustomer = {
  id: number;
  questionAsk: string;
  answers: string[];
};
