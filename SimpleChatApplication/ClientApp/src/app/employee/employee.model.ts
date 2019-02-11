export interface Message {
  user: string;
  content: string;
}
export interface IEmployeeMessage {
  senderName: string,
  receiverName: string,
  receiverId: number,
  employeeId: number,
  message: string,
  connectionId: string,
  createdDate: string,
  isRead: boolean

}
