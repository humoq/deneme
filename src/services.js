import axios from 'axios';
import data from './data/data.json';
import { convertToSlug, shuffle } from './utils/helper';
import { serializeData } from './utils/serializer';

class ApiService {
    async getCategories() {
        const categories = [];

        data?.map(val => {
            val?.Category.map(cat => {
                if(!categories?.includes(cat)) {
                    categories?.push(cat);
                }
            })
        })
        
        return categories;
    }

    async getSummary() {
        return serializeData(data);
    }

    async search(search) {
        const find = data?.filter(i => i?.Title?.toLowerCase()?.indexOf(search?.toLowerCase()) !== -1);
        
        return serializeData(find);
    }

    async getCategory(category) {
        const findCategoryData = data?.filter(i => i?.Category?.join('|')?.toLowerCase()?.replace(' ', '')?.split('|')?.includes(category?.toLowerCase()?.replace('-', '')) || i?.Tag?.join('|')?.toLowerCase()?.replace(' ', '')?.split('|')?.includes(category?.toLowerCase()?.replace('-', '')));

        return serializeData(findCategoryData);
    }

    async getDetail(slug) {
        const findData = data?.find(i => convertToSlug(i.Title) === slug);
    
        return {data: serializeData(findData), category: serializeData(shuffle(data?.slice(0, 120)))};
    }

    async updateData() {
        let counter = 1;
        let isGo = true;
        const newData = [];

        while (isGo) {
            try {
                const data = await axios.get(`https://catalog.api.gamedistribution.com/api/v1.0/rss/All/?collection=all&categories=All&subType=all&type=all&mobile=all&rewarded=all&amount=100&page=${counter}&format=json`);
                counter += 1;
                console.log(counter);

                if(data?.data?.length > 0) {
                    data.data.map(dat => {
                        filterData.map(filter => {
                            if(dat.Title === filter.title) {
                                newData.push(dat);
                            }
                        })
                    })
                } else {
                    isGo = false;
                }
            } catch(err) {
                console.log('Error', err);
                isGo = false;
            }
        }

        const unique = [];

        newData.map(dat => {
            const fil = unique.filter(i => i.Title === dat.Title);
            if(fil.length === 0) {
                unique.push(dat);
            }
        })

        return unique;
    }
}

module.exports = new ApiService();