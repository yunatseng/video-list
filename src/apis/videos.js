import { request } from './request';

export const getVideos = () => {
    return request({
        query: 'part=snippet&part=contentDetails&chart=mostPopular&maxResults=50&regionCode=TW'
    });
};

export const getNextVideos = (pageToken)=>{
    return request({
        query: `part=snippet&part=contentDetails&chart=mostPopular&maxResults=50&regionCode=TW&pageToken=${pageToken}`
    })
}

