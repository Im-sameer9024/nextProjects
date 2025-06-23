 export  interface LoginFormProps{
    email:string,
    password:string
}


export  interface SignupFormProps{
    name:string,
    email:string,
    password:string
}


export interface ProductTypesProps {
     id: string;
    title: string;
    description: string;
    img: string | null;
    price: number;
    isFeatured: boolean;
    options: [{key:string}];
    catSlug: string;
}
