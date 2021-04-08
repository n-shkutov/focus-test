import fetchService from 'services/client';
import urls from 'services/urls';

export const getAllData = async () => fetchService.get(urls.all);
