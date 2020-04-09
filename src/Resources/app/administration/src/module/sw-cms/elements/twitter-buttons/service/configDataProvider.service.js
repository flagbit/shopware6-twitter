const { Application } = Shopware;

Application.addServiceProvider('configDataProviderService', () => {
    return {
        setSyncData,
        getSyncData,
    };
});

let syncData = {};
function setSyncData(data) {
    syncData = data;
}

function getSyncData() {
    return syncData;
}
