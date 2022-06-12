const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '1b3c86162c27d40d6610e681f17c6d92',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export const localHost = {
    baseUrl : 'http://locahost:5000'
}

export default apiConfig;