import type { CategoryDto } from "../../models/CategoryDto"

export type CategoryAPIResponse = {
    message: string,
    success: boolean,
    data?: CategoryDto[]
}