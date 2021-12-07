import { convertToSlug } from "./helper";

export const serializeData = (data) => {
    if(!Array.isArray(data)) {
        return { title: data?.Title, description: data?.Description, url: data?.Url, slug: convertToSlug(data?.Title), images: data?.Asset }
    }
    const newData = [];
    if(data?.length > 0) {
        data.map(val => {
            newData.push({ title: val?.Title, description: val?.Description, url: val?.Url, slug: convertToSlug(val?.Title), images: val?.Asset })
        })
    }
    return newData;
}
