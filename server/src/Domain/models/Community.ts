export class Community{
    public constructor(
        public id: number = 0,
        public name: string = "",
        public description: string = "",
        public iconPath: string = "",
        public memberCount: number = 1,
        public status: string = "public",
        public isMature: boolean = false,
        public createdAt: Date = new Date()
    ){}
}