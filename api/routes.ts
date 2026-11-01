export const Routes = {

    // This file contains all the routes or API endpoints that are used in the application

    // PET MODULE Routes
    getPetByPetId: (id: string | number) => `/v2/pet/${id}`,
    deletePetById: (id: string | number) => `/v2/pet/${id}`,
    updatePetById: (id: string | number) => `/v2/pet`,
    addPetToStore: () => `/v2/pet`,
    uploadPetImage: (petId: string | number) => `/v2/pet/${petId}/uploadImage`,

    // STORE MODULE Routes
    getStoreInventory: () => `/v2/store/inventory`,
    placeOrder: () => `/v2/store/order`,
    getOrderById: (orderId: string | number) => `/v2/store/order/${orderId}`,
    deleteOrder: (orderId: string | number) => `/v2/store/order/${orderId}`

}