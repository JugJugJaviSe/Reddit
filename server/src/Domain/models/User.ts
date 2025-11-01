export class User {
    public constructor(
        public id: number = 0,
        public username: string = "",
        public password: string = "",
        public fullName: string = "",
        public role: string = "user",
        public createdAt: Date = new Date()
    ){}
}