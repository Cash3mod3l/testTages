import { defineStore } from 'pinia';
import { request } from '~/src/requests/request';

type Material = {
    id: number;
    name: string;
};

export const useMaterialProductStore = defineStore("materialProductStore", {
    state: () => ({
        materials: [] as Material[],
    }),
    actions: {
        fetchMaterials(): Promise<void> {
            return request<Material[]>({
                method: "GET",
                url: "/data/materials.json",
            })
                .then((data: Material[]): void => {
                    this.materials = data;
                })
                .catch((error): void => {
                    console.error('Ошибка при получении материалов:', error);
                });
        },
    },
});
