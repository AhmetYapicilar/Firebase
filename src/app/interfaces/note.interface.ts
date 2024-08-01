export interface Note {
    id: string;
    type: "Note" | "Trash";
    title:string;
    content:string;
    marked: boolean;
}
