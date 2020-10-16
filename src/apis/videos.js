import { request } from './request';

export const getVideos = () => {
    return request({
        query: 'part=snippet&part=contentDetails&chart=mostPopular&maxResults=12&regionCode=TW'
    });
};