const ExchangeRateServices = {
    getExchangeRateUF: async () => {
        const response = await axios.get(
            `https://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey=b3c682f4e4e29811fa1fd8d3781a463b59181fb7&formato=json`
        );
        return response.data;
    },
};

export default ExchangeRateServices;  