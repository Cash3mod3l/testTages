import { defineStore } from 'pinia';
import { request } from '~/src/request/request';

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
                .then((data: Material[]) => {
                    console.log('Полученные данные:', data);
                    this.materials = data;
                    console.log('Обновленное состояние materials:', this.materials);
                })
                .catch((error) => {
                    console.error('Ошибка при получении материалов:', error);
                });
        },
    },
});
